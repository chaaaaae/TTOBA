// src/types/report.ts

// =============================
// 구조 분석 관련 타입
// =============================

export interface StructureSegment {
  label_en: string
  label_ko: string
  description: string
  text: string
}

export interface AIStructure {
  segments: StructureSegment[]
}

export interface RecommendedSequenceItem {
  label_en: string
  label_ko: string
  source: 'existing' | 'added'
}

export interface AddLabelItem {
  label_en: string
  label_ko: string
  description: string
  reason: string
  example: string
}

export interface RemoveLabelItem {
  label_en: string
  label_ko: string
  description: string
  reason: string
}

export interface AIRecommendedStructure {
  final_sequence: RecommendedSequenceItem[]
  add_labels: AddLabelItem[]
  remove_labels: RemoveLabelItem[]
}

// =============================
// 리포트에서 쓰는 단일 답변 타입
// =============================

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

  // ✅ 구조 분석
  aiStructure?: AIStructure
  aiRecommendedStructure?: AIRecommendedStructure
}
