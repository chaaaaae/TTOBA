# AI\stt.py
import os
os.environ["HF_HUB_DISABLE_SYMLINKS"] = "1"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

import threading
import numpy as np
import sounddevice as sd
from faster_whisper import WhisperModel

# ===========================
# 1) Whisper 모델 로드
# ===========================

MODEL_SIZE = "base"

print("[모델 로드 중...]")
model = WhisperModel(
    MODEL_SIZE,
    device="cpu",        # GPU 있으면 "cuda"
    compute_type="int8"  # CPU에서 속도/정확도 절충
)
print("[모델 로드 완료]\n")

# ===========================
# 2) 오디오 스트림 설정
# ===========================

SAMPLE_RATE = 16000
CHANNELS = 1
MIN_AUDIO_SECONDS = 1.0  # 최소 이 정도는 말해야 인식

# 마이크에서 들어오는 오디오를 쌓아둘 버퍼 & 락
buffer = np.zeros((0, CHANNELS), dtype=np.float32)
buffer_lock = threading.Lock()


def audio_callback(indata, frames, t, status):
    """마이크에서 들어오는 오디오를 계속 buffer에 쌓는 콜백"""
    global buffer
    if status:
        print(f"[오디오 상태] {status}", flush=True)
    with buffer_lock:
        buffer = np.concatenate([buffer, indata.copy()], axis=0)


# ===========================
# 3) 인식 함수
# ===========================

def transcribe_once(audio: np.ndarray) -> str:
    """전체 오디오를 한 번에 Whisper에 넣어서 텍스트로 변환"""
    if audio.ndim > 1:
        audio = audio.reshape(-1)  # (samples, 1) -> (samples,)
    segments, info = model.transcribe(
        audio,
        language="ko",   # 한국어
        beam_size=5,     # beam 늘릴수록 정확도↑, 속도↓
        vad_filter=True  # 앞뒤 묵음 제거
    )
    text = "".join(seg.text for seg in segments).strip()
    return text


# ===========================
# 4) 메인 (한 번 인식 후 종료)
# ===========================

def main():
    global buffer

    print("=== Whisper 녹음 모드 ===")

    # InputStream 안에서 input()으로 엔터를 기다리는 동안 계속 녹음됨
    with sd.InputStream(
        samplerate=SAMPLE_RATE,
        channels=CHANNELS,
        callback=audio_callback,
        dtype="float32"
    ):
        input("▶ 녹음 시작 (엔터 시 종료) : ")

        # 엔터 눌린 시점까지의 오디오를 복사
        with buffer_lock:
            audio = buffer.copy()

    # 여기 도달하면 InputStream 컨텍스트를 벗어났으므로 녹음은 이미 종료됨

    num_samples = len(audio)
    if num_samples < MIN_AUDIO_SECONDS * SAMPLE_RATE:
        print("\n❗ 인식할 만큼 충분히 말하지 않았거나, 녹음이 거의 비어 있습니다.")
        print("프로그램을 다시 실행해서 시도해 주세요.")
        return

    print(f"\n[인식 중... 약 {num_samples / SAMPLE_RATE:.1f}초 분량]\n")
    text = transcribe_once(audio)

    if text:
        print(f"📝 인식 결과: {text}\n")
    else:
        print("❗ 인식된 문장이 없습니다.\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n[강제 종료]")
