// src/components/report/FeedbackSidebar.tsx

import React from 'react'
import FeedbackSection from './FeedbackSection'

const feedbacks = [
  {
    type: 'strength' as const,
    icon: '💪',
    title: '강점',
    items: ['명확한 전달력', '풍부한 예시', '자신감 있는 태도']
  },
  {
    type: 'improvement' as const,
    icon: '📈',
    title: '개선점',
    items: ['말하기 속도 조절', '필러 워드 줄이기', '시선 처리']
  },
  {
    type: 'suggestion' as const,
    icon: '💡',
    title: '제안사항',
    items: ['STAR 기법 활용', '구체적 수치 제시', '결론 먼저 말하기']
  }
]

export default function FeedbackSidebar() {
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
        개선 포인트 🎯
      </h2>

      <FeedbackSection feedbacks={feedbacks} />

      <button
        style={{
          width: '100%',
          padding: '1rem',
          marginTop: '1.5rem',
          background:
            'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
          transition: 'all 0.3s'
        }}
      >
        리포트 공유하기 📤
      </button>
    </div>
  )
}
