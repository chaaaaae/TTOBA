import json
import zipfile
from pathlib import Path


def extract_pair_id(obj, fallback: str = "") -> str:
    """
    pair_id를 위한 간단한 생성 함수.
    - rawDataInfo.question.audioPath의 파일명을 우선 사용
      예: "/.../ckmk_q_bm_f_e_47109.wav" -> "ckmk_q_bm_f_e_47109"
    - 없으면 fallback (json 파일 이름) 사용
    """
    audio_info = obj.get("rawDataInfo", {}).get("question", {})
    audio_path = audio_info.get("audioPath")
    if isinstance(audio_path, str) and audio_path:
        name = audio_path.strip().split("/")[-1]   # 파일명.wav
        return name.rsplit(".", 1)[0]              # 확장자 제거
    return fallback


def clean_intent(intent_list):
    """
    intent 배열에서 text는 제거하고
    expression / category만 남긴 새 배열을 반환.
    """
    cleaned = []
    for it in (intent_list or []):
        cleaned.append({
            "expression": it.get("expression", ""),
            "category": it.get("category", ""),
        })
    return cleaned


def process_json_object(obj, json_path_for_id: str):
    """공통: json 객체 하나에서 pair dict, occupation, pair_id 추출"""
    ds = obj.get("dataSet", {})
    info = ds.get("info", {})
    occupation = info.get("occupation") or "UNKNOWN"

    q = ds.get("question", {})
    a = ds.get("answer", {})

    q_text = q.get("raw", {}).get("text", "")
    a_text = a.get("raw", {}).get("text", "")

    q_intent = clean_intent(q.get("intent", []))
    a_intent = clean_intent(a.get("intent", []))

    pair_id = extract_pair_id(obj, fallback=json_path_for_id)

    pair = {
        "pair_id": pair_id,
        "occupation": occupation,
        "question": {
            "text": q_text,
            "intent": q_intent,
        },
        "answer": {
            "text": a_text,
            "intent": a_intent,
        },
    }
    return pair, occupation


def build_files_by_folder_and_occupation(root_dir: str, out_dir: str):
    root = Path(root_dir)
    out_root = Path(out_dir)
    out_root.mkdir(parents=True, exist_ok=True)

    print("🚀 폴더 단위 + 직무별 JSON 생성 시작 (폴더 + zip 모두 지원)")
    print(f"   📂 입력 루트: {root}")
    print(f"   📂 출력 루트: {out_root}\n")

    # 1) TL_* 형식의 라벨링 폴더들 (재귀 탐색)
    label_folders = [p for p in root.rglob("*") if p.is_dir() and p.name.startswith("TL_")]
    print(f"   🔎 라벨링 폴더 수: {len(label_folders)}")

    # 2) TL_*.zip 형식의 zip 파일들 (재귀 탐색)
    zip_files = list(root.rglob("TL_*.zip"))
    print(f"   🔎 라벨링 ZIP 수: {len(zip_files)}\n")

    grand_total_pairs = 0

    # ---------- A. 폴더 기반 처리 ----------
    for folder in label_folders:
        print(f"🗂 [DIR] 폴더 처리 시작: {folder}")

        pairs = []
        occ_codes = set()
        json_files = list(folder.rglob("*.json"))
        print(f"   - 폴더 내 JSON 파일 수: {len(json_files)}")

        parsed = 0

        for json_path in json_files:
            try:
                with open(json_path, "r", encoding="utf-8") as f:
                    obj = json.load(f)
                parsed += 1
            except Exception as e:
                print(f"     ❌ JSON 읽기 실패: {json_path} ({e})")
                continue

            if parsed % 100 == 0:
                print(f"     ✅ 파싱 진행 상황: {parsed} / {len(json_files)}")

            pair, occ = process_json_object(obj, json_path.stem)
            occ_codes.add(occ)
            pairs.append(pair)

        if not pairs:
            print("   ⚠ 이 폴더에서 유효한 pair가 없어서 스킵\n")
            continue

        valid_codes = [c for c in occ_codes if c != "UNKNOWN"]
        if len(valid_codes) == 1:
            occ_code = valid_codes[0]
        elif len(valid_codes) == 0:
            occ_code = "UNKNOWN"
        else:
            occ_code = "MIXED"

        occ_dir = out_root / occ_code
        occ_dir.mkdir(parents=True, exist_ok=True)

        out_path = occ_dir / f"{folder.name}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(pairs, f, ensure_ascii=False, indent=2)

        print(f"   💾 저장 완료: {out_path} (pair {len(pairs)}개, 직무코드: {occ_code})\n")
        grand_total_pairs += len(pairs)

    # ---------- B. ZIP 기반 처리 ----------
    print("📦 이제 압축(zip) 파일 처리 시작\n")

    for zip_path in zip_files:
        # 같은 이름의 폴더가 있으면 zip은 스킵
        folder_candidate = zip_path.with_suffix("")  # .zip 제거
        if folder_candidate.is_dir():
            print(f"↷ [ZIP SKIP] 이미 같은 이름의 폴더가 있어 스킵: {zip_path}")
            continue

        print(f"🗂 [ZIP] 파일 처리 시작: {zip_path}")

        pairs = []
        occ_codes = set()

        try:
            with zipfile.ZipFile(zip_path, "r") as zf:
                json_names = [n for n in zf.namelist() if n.lower().endswith(".json")]
                print(f"   - ZIP 내 JSON 파일 수: {len(json_names)}")

                parsed = 0

                for name in json_names:
                    try:
                        raw = zf.read(name).decode("utf-8")
                        obj = json.loads(raw)
                        parsed += 1
                    except Exception as e:
                        print(f"     ❌ ZIP 내 JSON 읽기 실패: {name} ({e})")
                        continue

                    if parsed % 100 == 0:
                        print(f"     ✅ ZIP 파싱 진행: {parsed} / {len(json_names)}")

                    pair, occ = process_json_object(obj, Path(name).stem)
                    occ_codes.add(occ)
                    pairs.append(pair)
        except Exception as e:
            print(f"   ❌ ZIP 열기 실패: {zip_path} ({e})\n")
            continue

        if not pairs:
            print("   ⚠ 이 ZIP에서 유효한 pair가 없어서 스킵\n")
            continue

        valid_codes = [c for c in occ_codes if c != "UNKNOWN"]
        if len(valid_codes) == 1:
            occ_code = valid_codes[0]
        elif len(valid_codes) == 0:
            occ_code = "UNKNOWN"
        else:
            occ_code = "MIXED"

        occ_dir = out_root / occ_code
        occ_dir.mkdir(parents=True, exist_ok=True)

        out_path = occ_dir / f"{zip_path.stem}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(pairs, f, ensure_ascii=False, indent=2)

        print(f"   💾 저장 완료: {out_path} (pair {len(pairs)}개, 직무코드: {occ_code})\n")
        grand_total_pairs += len(pairs)

    print("🎉 모든 폴더 + ZIP 처리 완료!")
    print(f"   📊 전체 pair 수: {grand_total_pairs}")


if __name__ == "__main__":
    ROOT_DIR = r"E:\129.채용면접 인터뷰 데이터\01-1.정식개방데이터"
    OUT_DIR  = r"C:\dev\TTOBA\AI\Processed_Data"

    build_files_by_folder_and_occupation(ROOT_DIR, OUT_DIR)