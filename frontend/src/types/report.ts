// src/types/report.ts

export interface AnswerItem {
  questionNumber: number
  question: string
  answer: string
  score?: number
  duration?: string
  durationSeconds?: number
  videoUrl?: string

  // ✅ 단일 답변 AI 분석 결과
  aiScore?: number
  aiAnswerSummary?: string
  aiStrengths?: string[]
  aiImprovements?: string[]
  aiSuggestions?: string[]
  aiRewrittenAnswer?: string

  // 필요하면 구조도 보고 싶을 때를 위해 남겨두기 (any로 둬도 됨)
  aiStructure?: any
  aiRecommendedStructure?: any
}
