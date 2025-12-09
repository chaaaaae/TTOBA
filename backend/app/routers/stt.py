# backend/app/routers/stt.py
from fastapi import APIRouter, HTTPException, File, UploadFile
from pydantic import BaseModel

from app.services.stt_service import start_recording, stop_and_transcribe

router = APIRouter(prefix="/stt", tags=["stt"])


class SttResponse(BaseModel):
    text: str


@router.post("/start")
def stt_start():
    """녹음 시작"""
    try:
        start_recording()
    except Exception as e:
        print("[STT start 에러]", e)
        raise HTTPException(status_code=500, detail="녹음 시작 실패")
    return {"status": "recording"}


@router.post("/stop", response_model=SttResponse)
async def stt_stop(audio: UploadFile = File(...)):
    """
    녹음 종료 + 텍스트 변환
    프론트엔드에서 오디오 파일을 받아서 처리
    """
    try:
        # 업로드된 파일 읽기
        audio_data = await audio.read()
        
        # Whisper API로 변환
        text = stop_and_transcribe(audio_data=audio_data)
        
    except Exception as e:
        print("[STT stop 에러]", e)
        raise HTTPException(status_code=500, detail=f"인식 실패: {str(e)}")

    return SttResponse(text=text or "")