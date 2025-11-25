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
            // 🔹 GPT가 반환한 aiScore 사용 (없으면 0점)
            score={answer.aiScore ?? 0}
            // 🔹 duration이 문자열로 안 들어왔을 수 있으니 방어 코드
            duration={answer.duration ?? ''}
            onViewFeedback={() => onSelectQuestion(idx)}
          />
        ))}
      </div>
    </div>
  )
}
