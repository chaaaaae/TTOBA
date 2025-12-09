# AI\run_answer_analysis.py
import json
import os
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv

# 환경 변수 로드
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_answer(pair_id: str):
    # 1) 시스템 프롬프트 읽기
    prompt_path = Path("AI/prompt/prompt_answer_analysis.txt")
    system_prompt = prompt_path.read_text(encoding="utf-8")

    # 2) 질문/답변 JSON 로드
    data_path = Path("AI/data/Processed_Data/ICT/TL_05.ICT_Female_Experienced.json")
    qa_list = json.loads(data_path.read_text(encoding="utf-8"))

    # 3) pair_id 찾기
    target = next(
        (item for item in qa_list if str(item["pair_id"]) == str(pair_id)),
        None
    )

    if target is None:
        print(f"❌ pair_id '{pair_id}' not found!")
        return

    question = target.get("question", "")
    answer = target.get("answer", "")

    print(f"\n🔍 pair_id '{pair_id}' 분석 시작...\n")

    # 4) GPT 호출
    response = client.chat.completions.create(
        model="gpt-4.1",
        temperature=0.1,
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": json.dumps({
                    "question_id": pair_id,
                    "question": question,
                    "answer": answer
                }, ensure_ascii=False)
            }
        ]
    )

    content = response.choices[0].message.content

    # 5) JSON 파싱
    try:
        output_json = json.loads(content)
    except json.JSONDecodeError:
        print("❌ JSON 파싱 실패!")
        print("=== GPT 원본 응답 ===")
        print(content)
        return

    # 6) ❗ 파일 저장 대신 터미널에 출력
    print("\n================= 📌 분석 결과 =================\n")
    print(json.dumps(output_json, indent=2, ensure_ascii=False))
    print("\n================================================\n")


# 실행 예시
if __name__ == "__main__":
    analyze_answer("ckmk_q_ict_f_e_156001")
