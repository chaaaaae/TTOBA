import os, json, pathlib, time
from typing import List, Dict, Literal, Optional
from dotenv import load_dotenv
from pathlib import Path

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter

BASE_DIR = Path(__file__).resolve().parent.parent  # app/의 상위 폴더
load_dotenv(BASE_DIR / ".env")

"""
시간 기반 자연스러운 마무리 면접 루프 (질문 개수 기준 제거)
- guides/{role}.txt 로드 → 경량 임베딩 검색기로 상위 k 조각만 주입
- 남은 시간(remaining_seconds)과 평균 턴 시간(avg_turn_seconds)을 프롬프트에 전달
- LLM이 NORMAL → WIND_DOWN → FINAL로 점진 전환
- grace_overage(유예시간) 없음: '마지막 질문'에 대한 사용자 답변을 받으면 즉시 종료
"""

SYSTEM_RULES = """당신은 공정하고 간결한 한국어 면접관입니다.
목표: 사용자의 역량·경험·협업·문제해결을 '한 번에 하나의 질문'으로 깊이 탐색합니다.

참고 컨텍스트(직무 가이드 발췌)는 '필수 제약'이 아니라 '질문 방향성 가이드'로 사용하세요.
컨텍스트가 빈약하거나 부적합할 경우 일반 상식과 대화 맥락을 우선합니다.

출력 형식은 'JSON 한 줄'만 허용합니다 (설명·마크다운 금지).
JSON 스키마:
{{
  "action": "ask" | "final",
  "utterance": "면접관이 사용자에게 말할 한 문장 질문(정중한 한국어, 1~2문장)"
}}

규칙:
- 매 턴 '하나의 질문'만 합니다. (복수 질문 금지)
- 사용자 답변을 바탕으로 다음 질문을 맥락 있게 파고듭니다.
- 불필요한 사족·인사말을 붙이지 않습니다.
- 시간 신호에 따른 톤 전환 가이드(호스트가 전달):
  - phase == "NORMAL": 일반·오픈형 질문으로 탐색/심화
  - phase == "WIND_DOWN": 짧게 답할 수 있는 좁은 질문(핵심 확인용)
  - phase == "FINAL": 'final'을 선택하고, utterance는 반드시 정확히 "마지막으로 하고 싶은 말이 있으신가요?" 여야 합니다.
"""

DECIDER_PROMPT = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_RULES),
        ("human",
         """직무/도메인: {job_role}
현재 턴(1부터 시작): {turn_index}

[남은 시간 신호]
- remaining_seconds: {remaining_seconds}
- avg_turn_seconds(추정): {avg_turn_seconds}
- phase: {phase}  # NORMAL | WIND_DOWN | FINAL

[참고 컨텍스트 - 직무 가이드 발췌]
{guide_context}

[대화 이력]
{history}

위 정보를 바탕으로 다음 액션과 한 문장 질문을 JSON 한 줄로만 출력하세요."""),
    ]
)

def make_llm(model="gpt-4o-mini", temperature=0.3) -> ChatOpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY 환경변수를 설정하세요.")
    return ChatOpenAI(model=model, temperature=temperature)

def render_history(history: List[Dict[str, str]]) -> str:
    lines = []
    for turn in history:
        role = "면접관" if turn["role"] == "interviewer" else "사용자"
        lines.append(f"{role}: {turn['content']}")
    return "\n".join(lines) if lines else "(대화 이력 없음)"

# --- 직무 가이드 로드 ---

def load_job_guide(role: str, base_dir: str = "guides") -> Optional[str]:
    path = pathlib.Path(base_dir) / f"{role}.txt"
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8", errors="ignore")

# --- 경량 임베딩 기반 검색기 (FAISS 없이 동작) ---

class SimpleRetriever:
    """OpenAI 임베딩만으로 동작하는 경량 검색기 (cosine similarity). 외부 벡터DB 불필요."""
    def __init__(self, chunks: List[str], embeddings: OpenAIEmbeddings, k: int = 4):
        self.k = k
        self.emb = embeddings
        self.chunks = chunks
        self.vecs = self.emb.embed_documents(chunks) if chunks else []

    @staticmethod
    def _cosine(a: List[float], b: List[float]) -> float:
        dot = sum(x*y for x, y in zip(a, b))
        na = (sum(x*x for x in a)) ** 0.5
        nb = (sum(y*y for y in b)) ** 0.5
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)

    def get_relevant_documents(self, query: str):
        if not self.chunks:
            return []
        q = self.emb.embed_query(query)
        sims = [(self._cosine(q, v), i) for i, v in enumerate(self.vecs)]
        sims.sort(reverse=True)
        top = [self.chunks[i] for _, i in sims[: self.k]]
        return [{"page_content": t} for t in top]

def split_text_to_chunks(text: str) -> List[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=700, chunk_overlap=120, separators=["\n\n", "\n", " ", ""]
    )
    docs = splitter.create_documents([text])
    return [d.page_content for d in docs]

def build_retriever_from_text(text: str) -> Optional[SimpleRetriever]:
    if not text:
        return None
    chunks = split_text_to_chunks(text)
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    return SimpleRetriever(chunks, embeddings, k=4)

def make_query_for_retrieval(job_role: str, history: List[Dict[str, str]]) -> str:
    last_user = next((h["content"] for h in reversed(history) if h["role"] == "user"), "")
    last_interviewer = next((h["content"] for h in reversed(history) if h["role"] == "interviewer"), "")
    parts = [
        f"직무: {job_role}",
        f"직전 질문: {last_interviewer}",
        f"마지막 사용자 답변: {last_user}",
    ]
    return "\n".join([p for p in parts if p.strip()])

def get_guide_context(retriever: Optional[SimpleRetriever], job_role: str, history: List[Dict[str, str]]) -> str:
    if retriever is None:
        return "(직무 가이드 없음)"
    query = make_query_for_retrieval(job_role, history)
    try:
        docs = retriever.get_relevant_documents(query)  # 상위 k
        ctxs = [d["page_content"].strip() for d in docs if d and d.get("page_content")]
        merged = "\n---\n".join(ctxs)
        return merged[:2000] if len(merged) > 2000 else merged
    except Exception:
        return "(가이드 검색 실패)"

# --- 시간 기반 페이싱/결정 ---

def determine_phase(
    remaining_seconds: float,
    avg_turn_seconds: float,
    soft_final_window: int
) -> Literal["NORMAL", "WIND_DOWN", "FINAL"]:
    # 평균 한 턴 소화가 어렵거나(남은 시간 <= 평균턴*0.8, 하한 25초) FINAL
    if remaining_seconds <= max(30.0, 0.8 * max(avg_turn_seconds, 25.0)):
        return "FINAL"
    # 남은 시간이 완충 구간 이하면 WIND_DOWN
    if remaining_seconds <= float(soft_final_window):
        return "WIND_DOWN"
    return "NORMAL"

def decide_next(
    llm: ChatOpenAI,
    job_role: str,
    turn_index: int,
    history: List[Dict[str, str]],
    guide_retriever: Optional[SimpleRetriever],
    remaining_seconds: int,
    avg_turn_seconds: int,
    phase: Literal["NORMAL", "WIND_DOWN", "FINAL"],
) -> Dict[str, str]:
    guide_context = get_guide_context(guide_retriever, job_role, history)
    chain = DECIDER_PROMPT | llm | StrOutputParser()
    raw = chain.invoke({
        "job_role": job_role,
        "turn_index": turn_index,
        "history": render_history(history),
        "guide_context": guide_context or "(컨텍스트 없음)",
        "remaining_seconds": remaining_seconds,
        "avg_turn_seconds": avg_turn_seconds,
        "phase": phase,
    }).strip()

    # JSON 안정화
    try:
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError("JSON이 dict가 아님")
        action = data.get("action")
        utterance = data.get("utterance")
        if action not in ("ask", "final"):
            raise ValueError("action 값 오류")
        if not isinstance(utterance, str) or not utterance.strip():
            raise ValueError("utterance 누락")
        if action == "final":
            utterance = "마지막으로 하고 싶은 말이 있으신가요?"
        return {"action": action, "utterance": utterance.strip()}
    except Exception:
        # 안전 폴백: phase에 맞춰 보수적으로 마무리
        if phase == "FINAL":
            return {"action": "final", "utterance": "마지막으로 하고 싶은 말이 있으신가요?"}
        elif phase == "WIND_DOWN":
            return {"action": "ask", "utterance": "마무리 단계라 짧게 한 가지만 더 여쭤볼게요. 최근 경험에서 본인의 핵심 기여 한 가지를 말씀해 주시겠어요?"}
        else:
            return {"action": "ask", "utterance": "최근에 가장 몰입했던 프로젝트와 본인의 역할을 간단히 말씀해 주시겠어요?"}

# --- 메인 루프 (시간 기반만) ---

def interview_loop(
    job_role: str = "behavioral_interview_guide",  # guides/{job_role}.txt
    target_minutes: int = 1,                      # 총 면접 목표 시간(분)
    soft_final_window: int = 90,                   # 마무리 전환 완충 구간(초)
    model: str = "gpt-4o-mini",
    temperature: float = 0.3,
):
    """
    진행 방식(시간 기반):
    - guides/{job_role}.txt 로 인메모리 검색기 구성(없으면 컨텍스트 없이 진행)
    - 시작: 1분 자기소개 요청
    - 각 턴: 남은 시간/평균 턴시간 계산 → phase 결정 → LLM에 전달 → 질문 생성
    - phase == FINAL 또는 LLM action == final 시, 고정 멘트 출력 → 사용자 마지막 답변 → 종료
    """
    llm = make_llm(model=model, temperature=temperature)

    guide_text = load_job_guide(job_role)
    guide_retriever = build_retriever_from_text(guide_text) if guide_text else None

    history: List[Dict[str, str]] = []
    turn_index = 1

    # 시간 추적
    t0 = time.monotonic()
    def now(): return time.monotonic()
    def elapsed(): return now() - t0
    def remaining(): return target_minutes * 60 - elapsed()

    # 평균 턴 시간(초) EMA 파라미터
    avg_turn_seconds = 70.0
    EMA_ALPHA = 0.3
    MIN_TURN = 25.0
    MAX_TURN = 180.0

    print("\n[면접 시작]\n")

    # ✅ Step 0: 자기소개
    intro_question = "안녕하세요. 먼저 자기소개 부탁드립니다."
    print(f"면접관: {intro_question}")
    turn_start = now()
    user_intro = input("사용자: ").strip()
    turn_dur = now() - turn_start

    history.append({"role": "interviewer", "content": intro_question})
    history.append({"role": "user", "content": user_intro})

    # 평균 턴 시간 갱신
    turn_dur = max(MIN_TURN, min(MAX_TURN, turn_dur))
    avg_turn_seconds = (1 - EMA_ALPHA) * avg_turn_seconds + EMA_ALPHA * turn_dur

    # ✅ 본 인터뷰 루프
    while True:
        rem = remaining()

        # 페이싱 단계 결정
        phase = determine_phase(
            remaining_seconds=rem,
            avg_turn_seconds=avg_turn_seconds,
            soft_final_window=soft_final_window
        )

        # LLM 결정(질문 후보)
        decision = decide_next(
            llm=llm,
            job_role=job_role,
            turn_index=turn_index,
            history=history,
            guide_retriever=guide_retriever,
            remaining_seconds=int(rem),
            avg_turn_seconds=int(avg_turn_seconds),
            phase=phase,
        )

        # ✅ 종료 여부를 "출력 전에" 먼저 확정
        should_wrap = (phase == "FINAL") or (decision["action"] == "final")

        if should_wrap:
            final_utt = "마지막으로 하고 싶은 말이 있으신가요?"
            print(f"면접관: {final_utt}")

            turn_start = now()
            user_final = input("사용자: ").strip()
            _ = now() - turn_start  # 평균 반영 불필요

            history.append({"role": "interviewer", "content": final_utt})
            history.append({"role": "user", "content": user_final})

            print("\n면접이 끝났습니다.")
            print("\n[면접 종료]\n")
            break

        # ✅ wrap이 아니면 일반 질문을 출력
        print(f"면접관: {decision['utterance']}")

        # 일반 질문 턴 진행
        turn_start = now()
        user_answer = input("사용자: ").strip()
        turn_dur = now() - turn_start

        history.append({"role": "interviewer", "content": decision["utterance"]})
        history.append({"role": "user", "content": user_answer})
        turn_index += 1

        # 평균 턴 시간 갱신(클램프 후 EMA)
        turn_dur = max(MIN_TURN, min(MAX_TURN, turn_dur))
        avg_turn_seconds = (1 - EMA_ALPHA) * avg_turn_seconds + EMA_ALPHA * turn_dur


if __name__ == "__main__":
    # 예시 실행: guides/behavioral_interview_guide.txt 파일이 있으면 자동 참조
    interview_loop(
        job_role="behavioral_interview_guide",  # guides/{role}.txt
        target_minutes=3,    # 총 면접 시간(분)
        soft_final_window=90, # 남은 90초부터 WIND_DOWN
        model="gpt-4o-mini",
        temperature=0.3,
    )
