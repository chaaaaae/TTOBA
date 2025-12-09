# backend\app\routers\answer_analysis_router.py

from fastapi import APIRouter, HTTPException

from app.schemas.answer_analysis_schema import (
    AnalyzeAnswerRequest,
    OverallFeedbackRequest,
)
from app.services.answer_analysis import (
    analyze_answers,
    analyze_overall_feedback,
)

router = APIRouter(prefix="/api", tags=["answer-analysis"])


@router.post("/analyze-answer")
def analyze_answer_endpoint(payload: AnalyzeAnswerRequest):
    """
    1차 분석 엔드포인트
    - 입력: AnswerItem[] (questionNumber, question, answer, ...)
    - 처리: 각 답변에 대해 GPT로 질문별 피드백/요약/점수 생성
    - 출력: { items: [...] } (각 질문별 분석 결과 리스트)
    """
    try:
        # Pydantic 모델 → dict 리스트로 변환
        items_dict = [item.dict() for item in payload.items]

        # 서비스 레이어 호출 (실제 GPT 호출 로직은 여기서 처리)
        result = analyze_answers(items_dict)
    except Exception as e:
        # 어떤 예외든 500으로 래핑해서 프론트에 전달
        raise HTTPException(status_code=500, detail=str(e))

    # 프론트에서 다루기 편하게 { items: [...] } 형태로 반환
    return {"items": result}


@router.post("/analyze-overall")
def analyze_overall_endpoint(payload: OverallFeedbackRequest):
    """
    2차 분석 엔드포인트
    - 입력: [{ question_id, answer_summary, score }, ...]
    - 처리: 모든 질문의 answer_summary/score를 기반으로
            전체 strengths/weaknesses/recommendations 생성
    - 출력: {
        "strengths": [...],
        "weaknesses": [...],
        "recommendations": [...]
      }
    """
    try:
        summaries = [item.dict() for item in payload.items]

        # 서비스 레이어 호출 (2차 GPT 한 번 더)
        result = analyze_overall_feedback(summaries)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 서비스에서 만든 dict 그대로 반환
    return result
