// src/types/report.ts

export type AnswerItem = {
  questionNumber: number
  question: string
  answer: string
  score?: number
  duration?: string
  durationSeconds?: number
  videoUrl?: string
}
