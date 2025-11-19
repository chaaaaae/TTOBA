import json
from pathlib import Path

def build_question_txt(processed_root: str, out_dir: str):
    processed_root = Path(processed_root)
    out_root = Path(out_dir)

    print("🚀 파일별 Question TXT 생성 시작")
    print(f"📂 입력 폴더: {processed_root}")
    print(f"📂 출력 폴더: {out_root}\n")

    # 모든 JSON 파일 탐색
    json_files = list(processed_root.rglob("*.json"))
    print(f"🔎 발견된 전처리 JSON 수: {len(json_files)}\n")

    for json_path in json_files:
        # *_questions.json 파일은 스킵
        if json_path.name.endswith("_questions.json"):
            continue

        # JSON 로드
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"❌ JSON 로드 실패: {json_path} ({e})")
            continue

        if not isinstance(data, list):
            print(f"⚠ 리스트 형태 JSON이 아님 → 스킵: {json_path}")
            continue

        # 질문 추출
        questions = []
        for pair in data:
            q = pair.get("question", {})
            text = q.get("text")
            if isinstance(text, str) and text.strip():
                questions.append(text.strip())

        # 질문 없는 경우 스킵
        if not questions:
            print(f"⚠ 질문 없음 → 스킵: {json_path}")
            continue

        # JSON 의 상대 경로를 그대로 따라 txt 생성
        relative_path = json_path.relative_to(processed_root)
        txt_path = out_root / relative_path.with_suffix(".txt")

        txt_path.parent.mkdir(parents=True, exist_ok=True)

        # txt 저장
        with open(txt_path, "w", encoding="utf-8") as f:
            for q in questions:
                f.write(q + "\n")

        print(f"💾 저장 완료: {txt_path} (질문 {len(questions)}개)")

    print("\n🎉 TXT 생성 완료!")


if __name__ == "__main__":
    PROCESSED_ROOT = r"C:\dev\TTOBA\AI\Processed_Data"
    OUT_DIR = r"C:\dev\TTOBA\AI\question_list"

    build_question_txt(PROCESSED_ROOT, OUT_DIR)