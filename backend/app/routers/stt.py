# backend\app\routers\stt.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.stt_service import start_recording, stop_and_transcribe

router = APIRouter(prefix="/stt", tags=["stt"])


class SttResponse(BaseModel):
    text: str


@router.post("/start")
def stt_start():
    """
    녹음 시작 (버튼: '음성으로 답변하기')
    """
    try:
        start_recording()
    except Exception as e:
        print("[STT start 에러]", e)
        raise HTTPException(status_code=500, detail="녹음 시작 실패")
    return {"status": "recording"}


@router.post("/stop", response_model=SttResponse)
def stt_stop():
    """
    녹음 종료 + 인식 (버튼: '음성 답변 중지')
    """
    try:
        text = stop_and_transcribe()
    except Exception as e:
        print("[STT stop 에러]", e)
        raise HTTPException(status_code=500, detail="녹음/인식 실패")

    return SttResponse(text=text or "")
