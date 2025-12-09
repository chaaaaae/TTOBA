# backend\app\schemas\answer_analysis_schema.py

from pydantic import BaseModel
from typing import List, Optional


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


class AnswerSummary(BaseModel):
    question_id: int
    answer_summary: str
    score: float


class OverallFeedbackRequest(BaseModel):
    items: List[AnswerSummary]
