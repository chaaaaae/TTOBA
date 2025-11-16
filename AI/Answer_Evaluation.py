import os
import json
from textwrap import dedent
from typing import Optional, List, Dict, Any
from pathlib import Path

from openai import OpenAI
from dotenv import load_dotenv

# --------------------------------------------------
# 0. 경로 & .env 로드
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

# .env 로드 (프로젝트 루트에 .env 있다고 가정)
load_dotenv(PROJECT_ROOT / ".env")

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY 가 .env 에 설정되어 있지 않습니다.")

client = OpenAI(api_key=api_key)
MODEL_NAME = "gpt-4.1-mini"

# JSON 데이터 파일 (프로젝트 루트 기준 상대 경로)
JSON_RELATIVE_PATH = "AI/data/Processed_Data/ICT/TL_05.ICT_Female_New.json"
JSON_PATH = (PROJECT_ROOT / JSON_RELATIVE_PATH).resolve()


# --------------------------------------------------
# 1. System Prompt (기법 선택 + 태깅 + 피드백)
# --------------------------------------------------
SYSTEM_INSTRUCTIONS = dedent(
    """
    당신은 면접 답변 구조를 분석하고 태깅하는 전문 AI 코치입니다.

    아래 5가지 답변 구조 기법 중에서, 면접 질문에 가장 적합한 하나를 선택하십시오.

    채용 면접 질문의 대부분은 다섯 기법 중 하나로 분석 가능하지만,
    위 다섯 기법 중 어떤 것으로도 구조화하기 어려운 자유로운 정보제공/잡담형 질문에는
    selected_framework 를 "none" 으로 설정하십시오.

    ------------------------------------------------------------
    [사용 가능한 답변 기법 목록]

    1) STAR 기법
     - Situation(상황) [S]
     - Task(과제/역할) [T]
     - Action(행동) [A]
     - Result(결과) [R]
     - 사용 시점: 경험 기반 질문, 행동 기반(BEI), 갈등 해결, 문제 해결, 실패/성공 사례 등

    2) SBI 기법
     - Situation(상황) [S]
     - Behavior(행동) [B]
     - Impact(영향) [I]
     - 사용 시점: 피드백, 소통, 갈등, 타인과 상호작용 중심 질문

    3) PREP 기법 (PEEL 포함, 통합)
     - Point(주장) [P]
     - Reason(이유) [R]
     - Example(사례) [E]
     - Point 재강조(optional) [P]
     - 사용 시점: 의견형 질문, 장단점, 가치관, 직무 스타일 등

    4) Why-What-How 기법
     - Why(계기/동기) [W]
     - What(목표) [H]
     - How(기여 방식/강점) [H2]
     - 사용 시점: 지원동기, 직무 선택 이유, 회사 선택 이유

    5) FAB 기법
     - Feature(특징) [F]
     - Advantage(강점/차별점) [A]  ← STAR 의 Action(A)와는 다른 개념입니다.
     - Benefit(조직/직무에 주는 이득) [B]
     - 사용 시점: 자기소개, 강점 PR, 직무 적합성 설명

    ※ 주의:
      - STAR 의 A 는 Action(행동)을 의미합니다.
      - FAB 의 A 는 Advantage(강점/차별점)을 의미합니다.
      - 같은 알파벳이더라도, 어떤 기법이 선택되었는지에 따라 의미가 달라집니다.

    ------------------------------------------------------------
    [분석 규칙]

    1. 질문을 읽고 위 5개 중 가장 적합한 하나를 selected_framework 에 선택합니다.
       - 예: "STAR", "SBI", "PREP", "WhyWhatHow", "FAB"

    2. 질문이 특정 기법 전체를 적용하기에 적합하지 않은 경우에는
       selected_framework 를 "none" 으로 설정합니다.
       - selected_framework = "none" 인 경우:
         • tagged_answer 의 모든 tag 는 null 로 설정합니다.
         • 구조 기반 태깅은 하지 않습니다.

    3. selected_framework 가 "none" 이 아닌 경우:
       - 사용자의 답변을 문장 단위로 나누어 tagged_answer 배열로 출력합니다.
       - 각 문장에 대해, 선택된 기법의 구성요소 중 해당되는 태그를 하나 부여합니다.
         예:
           • STAR 선택 시: "S","T","A","R" 만 사용
           • SBI 선택 시: "S","B","I" 만 사용
           • PREP 선택 시: "P","R","E" 만 사용
           • WhyWhatHow 선택 시: "W","H","H2" 만 사용
           • FAB 선택 시: "F","A","B" 만 사용
       - 선택된 기법에 속하지 않는 태그는 절대 사용하지 마십시오.
       - 특정 문장이 어디에도 해당하지 않으면 tag 를 null 로 둡니다.

    4. feedback 형식:
       - feedback 객체는 반드시 다음 4개의 key 를 포함해야 합니다.
         1) strengths: 리스트(배열) 형태, 잘한 점들 (1~2개 내외)
         2) weaknesses: 리스트 형태, 부족한 점들 (1~2개 내외)
            - 가능하다면 STAR 의 S/T/A/R, PREP 의 P/R/E 등
              구조 요소 이름을 직접 언급하여 어떤 부분이 부족한지 설명하십시오.
         3) tips: 리스트 형태, 개선을 위한 구체적인 조언
         4) rewriten_answer: 문자열, 사용자의 기존 답변을 기반으로
            선택된 기법에 맞게 재구성한 모범 답변
            - 새로운 사실을 지어내지 말고, 사용자가 준 정보 범위 안에서
              구조와 표현만 다듬으십시오.

    5. 출력은 반드시 JSON 형식만 사용하고,
       JSON 외의 설명 문장, 코드블록, 자연어 해설은 절대 출력하지 마십시오.

    ------------------------------------------------------------
    [최종 출력 JSON 형식 예시]

    {
      "selected_framework": "STAR" | "SBI" | "PREP" | "WhyWhatHow" | "FAB" | "none",
      "tagged_answer": [
        {
          "sentence": "문장 내용",
          "tag": "S" | "T" | "A" | "R" | "B" | "I" | "P" | "E" | "W" | "H" | "H2" | "F" | null
        }
      ],
      "feedback": {
        "strengths": ["..."],
        "weaknesses": ["..."],
        "tips": ["..."],
        "rewriten_answer": "..."
      }
    }

    위 규칙에 따라,
    제공되는 [질문] 과 [지원자의 답변] 에 대해
    가장 적합한 기법 또는 "none" 을 선택하고,
    해당 구조에 맞게 답변을 태깅하고 피드백을 JSON 으로 생성하십시오.
    """
).strip()


# --------------------------------------------------
# 2. Prompt 생성 (질문/답변만 전달)
# --------------------------------------------------
def build_prompt(
    question: str,
    answer: str,
    job: Optional[str] = None,
    company: Optional[str] = None,
) -> str:
    """
    instructions 쪽에 전체 시스템 규칙이 들어가고,
    여기서는 실제 분석 대상인 질문/답변만 넘겨준다.
    """
    job_text = job or ""
    company_text = company or ""

    prompt = f"""
    [질문]
    {question}

    [지원 직무]
    {job_text}

    [지원 회사]
    {company_text}

    [지원자의 답변]
    {answer}

    위 질문과 답변에 대해, 시스템 지침에 따라
    적절한 답변 기법을 선택하고, JSON 형식으로 결과를 출력하십시오.
    """
    return dedent(prompt).strip()


# --------------------------------------------------
# 3. 모델 호출
# --------------------------------------------------
def review_answer(
    question: str,
    answer: str,
    job: Optional[str] = None,
    company: Optional[str] = None,
) -> Dict[str, Any]:
    prompt = build_prompt(question, answer, job, company)

    resp = client.responses.create(
        model=MODEL_NAME,
        instructions=SYSTEM_INSTRUCTIONS,
        input=prompt,
        temperature=0.2,
        max_output_tokens=1000,
    )

    # 최신 SDK 기준 응답에서 텍스트 추출
    raw_text = resp.output[0].content[0].text

    # JSON 파싱
    try:
        return json.loads(raw_text)
    except Exception:
        # 안전 fallback: 가장 바깥 { ... }만 다시 시도
        start = raw_text.find("{")
        end = raw_text.rfind("}")
        if start != -1 and end != -1 and start < end:
            try:
                return json.loads(raw_text[start : end + 1])
            except Exception:
                pass

    return {"error": "JSON parse failed", "raw": raw_text}


# --------------------------------------------------
# 4. JSON 파일에서 Q/A 리스트 로드
# --------------------------------------------------
def load_pairs_from_json(path: Path | str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, list):
        raise ValueError("JSON 최상위 구조는 list여야 합니다.")

    return data


# --------------------------------------------------
# 5. pair_id 로 pair 한 개 찾기
# --------------------------------------------------
def find_pair_by_id(pairs: List[dict], pair_id: str) -> Optional[dict]:
    for p in pairs:
        if str(p.get("pair_id")) == str(pair_id):
            return p
    return None


# --------------------------------------------------
# 6. missing_elements 규칙 기반 계산
# --------------------------------------------------
def compute_missing_elements(
    selected_framework: Optional[str],
    tagged_answer: List[Dict[str, Any]],
) -> Dict[str, bool]:
    """
    모델이 준 tagged_answer를 기반으로
    각 기법별 필수 요소(S/T/A/R 등)가 등장했는지 여부를 계산한다.
    - selected_framework 가 "none" 이거나 지원하지 않는 값이면 빈 dict 반환.
    """
    if not selected_framework or selected_framework == "none":
        return {}

    framework_elements: Dict[str, List[str]] = {
        "STAR": ["S", "T", "A", "R"],
        "SBI": ["S", "B", "I"],
        "PREP": ["P", "R", "E"],
        "WhyWhatHow": ["W", "H", "H2"],
        "FAB": ["F", "A", "B"],
    }

    required = framework_elements.get(selected_framework)
    if not required:
        return {}

    # tagged_answer 에서 실제 등장한 태그 집합
    present_tags = {item.get("tag") for item in tagged_answer if item.get("tag")}

    missing: Dict[str, bool] = {}
    for elem in required:
        missing[elem] = elem not in present_tags

    return missing


# --------------------------------------------------
# 7. 메인 CLI: pair_id 하나만 분석
# --------------------------------------------------
def main():
    print("=== 면접 답변 구조 분석/태깅 AI (pair_id 기반 단일 Q/A 평가) ===\n")

    if not JSON_PATH.exists():
        print(f"[!] JSON 파일을 찾을 수 없습니다: {JSON_PATH}")
        return

    try:
        pairs = load_pairs_from_json(JSON_PATH)
    except Exception as e:
        print(f"[!] JSON 로드 실패: {e}\n")
        return

    target_id = input("분석할 pair_id 를 입력하세요: ").strip()
    if not target_id:
        print("[!] pair_id 가 입력되지 않았습니다.")
        return

    pair = find_pair_by_id(pairs, target_id)
    if pair is None:
        print(f"[!] pair_id={target_id} 인 항목을 찾지 못했습니다.")
        return

    print(f"\n=== pair_id: {pair.get('pair_id')} 분석 시작 ===\n")

    question = pair["question"]["text"]
    answer = pair["answer"]["text"]
    job = pair.get("occupation")
    company = pair.get("company", "")

    print(f"[질문]\n{question}\n")
    print(f"[답변]\n{answer}\n")

    print("=== 모델 분석 중... ===\n")
    result = review_answer(question, answer, job, company)

    if "error" in result:
        print("[⚠️ JSON 파싱 실패]")
        print(result.get("raw", ""))
        return

    # selected_framework
    framework = result.get("selected_framework")
    print(f"▶ selected_framework: {framework}\n")

    # tagged_answer
    tagged = result.get("tagged_answer", [])
    print("▶ tagged_answer")
    for item in tagged:
        sent = item.get("sentence", "")
        tag = item.get("tag")
        print(f"  - ({tag}) {sent}")
    print()

    # feedback
    fb = result.get("feedback", {})
    strengths = fb.get("strengths", [])
    weaknesses = fb.get("weaknesses", [])
    tips = fb.get("tips", [])
    rewriten = fb.get("rewriten_answer", "")

    print("▶ strengths")
    for s in strengths:
        print("  •", s)
    if not strengths:
        print("  (none)")
    print()

    print("▶ weaknesses")
    for w in weaknesses:
        print("  •", w)
    if not weaknesses:
        print("  (none)")
    print()

    print("▶ tips")
    for t in tips:
        print("  •", t)
    if not tips:
        print("  (none)")
    print()

    print("▶ rewriten_answer\n")
    print(rewriten or "(empty)")
    print("\n" + "=" * 70 + "\n")


if __name__ == "__main__":
    main()
