# backend/app/services/stt_service.py
"""
OpenAI Whisper API를 사용한 음성-텍스트 변환 서비스
"""
import os
import tempfile
from openai import OpenAI

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 녹음 상태 관리
is_recording = False


def start_recording():
    """녹음 시작 (상태만 관리)"""
    global is_recording
    is_recording = True
    print("[STT] 녹음 시작됨")


def stop_and_transcribe(audio_data: bytes = None) -> str:
    """
    녹음 중지 및 음성을 텍스트로 변환
    
    Args:
        audio_data: 오디오 바이트 데이터
    
    Returns:
        str: 변환된 텍스트
    """
    global is_recording
    is_recording = False
    
    try:
        if not audio_data:
            print("[STT] 오디오 데이터가 없습니다")
            return ""
        
        # 임시 파일로 저장
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_file:
            temp_file.write(audio_data)
            temp_file_path = temp_file.name
        
        # Whisper API 호출
        with open(temp_file_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                language="ko"  # 한국어
            )
        
        # 임시 파일 삭제
        os.unlink(temp_file_path)
        
        result_text = transcript.text
        print(f"[STT] 변환 완료: {result_text[:50]}...")
        return result_text
        
    except Exception as e:
        print(f"[STT] 오류 발생: {str(e)}")
        return ""


def is_recording_active() -> bool:
    """녹음 중인지 확인"""
    return is_recording