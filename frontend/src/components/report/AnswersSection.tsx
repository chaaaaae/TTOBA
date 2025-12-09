// src/components/report/AnswersSection.tsx

import React from 'react'
import AnswerCard from './AnswerCard'
import type { AnswerItem } from '../../types/report'

interface AnswersSectionProps {
  answers: AnswerItem[]
  onSelectQuestion: (index: number) => void
}

export default function AnswersSection({
  answers,
  onSelectQuestion
}: AnswersSectionProps) {
  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}
      >
        답변 내역 📝
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {answers.map((answer, idx) => (
          <AnswerCard
            key={idx}
            questionNumber={answer.questionNumber}
            question={answer.question}
            answer={answer.answer}
            score={answer.aiScore ?? 0}
            duration={answer.duration ?? ''}
            onViewFeedback={() => onSelectQuestion(idx)}
          />
        ))}
      </div>
    </div>
  )
}