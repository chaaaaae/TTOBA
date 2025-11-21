# backend/app/services/answer_analysis.py

import json
import os
from pathlib import Path
from typing import List, Dict, Any

from openai import OpenAI
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[3]  # backend/
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_answers(items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    프론트에서 넘어온 AnswerItem[] (questionNumber, question, answer 등)를 받아
    각 답변을 GPT로 분석하고, 분석 결과 리스트를 반환한다.
    """

    # 1) 시스템 프롬프트 읽기
    prompt_path = BASE_DIR / "AI/prompt/prompt_answer_analysis.txt"
    system_prompt = prompt_path.read_text(encoding="utf-8")

    results: List[Dict[str, Any]] = []

    for item in items:
        question_number = item.get("questionNumber")
        question = item.get("question", "")
        answer = item.get("answer", "")

        # 2) GPT에 넘길 payload 구성 (기존 run_answer_analysis 형식 유지)
        user_payload = {
            "question_id": question_number,  # 숫자지만 어차피 프롬프트에서 id로만 사용
            "question": question,
            "answer": answer,
        }

        response = client.chat.completions.create(
            model="gpt-4.1",
            temperature=0.1,
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": json.dumps(user_payload, ensure_ascii=False),
                },
            ],
        )

        content = response.choices[0].message.content

        # 3) JSON 파싱 (프롬프트가 JSON 반환하게 되어 있다고 가정)
        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            # 파싱 실패 시 최소한 원본 content라도 담아서 보내기
            parsed = {
                "question_id": question_number,
                "parse_error": True,
                "raw": content,
            }

        results.append(parsed)

    return results
