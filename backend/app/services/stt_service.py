# backend\app\services\stt_service.py
import os
os.environ["HF_HUB_DISABLE_SYMLINKS"] = "1"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

import threading
import numpy as np
import sounddevice as sd
from faster_whisper import WhisperModel

MODEL_SIZE = "base"

print("[Whisper 모델 로드 중...]")
model = WhisperModel(
    MODEL_SIZE,
    device="cpu",
    compute_type="int8"
)
print("[Whisper 모델 로드 완료]\n")

SAMPLE_RATE = 16000
CHANNELS = 1
MIN_AUDIO_SECONDS = 1.0

buffer = np.zeros((0, CHANNELS), dtype=np.float32)
buffer_lock = threading.Lock()

stream: sd.InputStream | None = None  # Python 3.10 이상


def audio_callback(indata, frames, t, status):
    global buffer
    if status:
        print(f"[오디오 상태] {status}", flush=True)
    with buffer_lock:
        buffer = np.concatenate([buffer, indata.copy()], axis=0)


def transcribe_once(audio: np.ndarray) -> str:
    if audio.ndim > 1:
        audio = audio.reshape(-1)
    segments, info = model.transcribe(
        audio,
        language="ko",
        beam_size=5,
        vad_filter=True,
    )
    text = "".join(seg.text for seg in segments).strip()
    return text


def start_recording():
    """마이크 녹음 시작 (이미 녹음 중이면 무시)"""
    global buffer, stream

    if stream is not None:
        print("[STT] 이미 녹음 중입니다.")
        return

    buffer = np.zeros((0, CHANNELS), dtype=np.float32)

    print("🎙 녹음 시작")

    stream = sd.InputStream(
        samplerate=SAMPLE_RATE,
        channels=CHANNELS,
        callback=audio_callback,
        dtype="float32"
    )
    stream.start()


def stop_and_transcribe() -> str:
    """현재까지 녹음된 버퍼로 STT 수행 후 텍스트 반환"""
    global buffer, stream

    if stream is None:
        print("[STT] 녹음이 시작되지 않았습니다.")
        return ""

    stream.stop()
    stream.close()
    stream = None
    print("🛑 녹음 종료")

    with buffer_lock:
        audio = buffer.copy()
        buffer = np.zeros((0, CHANNELS), dtype=np.float32)

    num_samples = len(audio)
    if num_samples < MIN_AUDIO_SECONDS * SAMPLE_RATE:
        print("❗ 말한 길이가 너무 짧음")
        return ""

    print(f"[인식 중... 약 {num_samples / SAMPLE_RATE:.1f}초 분량]")
    text = transcribe_once(audio)
    print(f"📝 인식 결과: {text}")
    return text
