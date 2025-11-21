# backend/app/routers/answer_analysis_router.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

from app.services.answer_analysis import analyze_answers

router = APIRouter(prefix="/api", tags=["answer-analysis"])


# 프론트의 AnswerItem 타입과 매칭되는 Pydantic 모델
class AnswerItem(BaseModel):
    questionNumber: int
    question: str
    answer: str
    score: Optional[float] = None
    duration: Optional[str] = None
    durationSeconds: Optional[float] = None
    videoUrl: Optional[str] = None


class AnalyzeAnswerRequest(BaseModel):
    items: List[AnswerItem]


@router.post("/analyze-answer")
def analyze_answer_endpoint(payload: AnalyzeAnswerRequest):
    """
    프론트에서 넘어온 AnswerItem[]을 받아,
    각 답변을 GPT로 분석한 결과 리스트를 반환하는 엔드포인트.
    """
    try:
        # Pydantic 모델 -> dict 리스트로 변환
        items_dict = [item.dict() for item in payload.items]
        result = analyze_answers(items_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 프론트에서 다루기 좋게 { items: [...] } 형태로 반환
    return {"items": result}
