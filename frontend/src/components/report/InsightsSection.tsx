// src/components/report/InsightsSection.tsx

import React from 'react'
import InsightCard from './InsightCard'

const insights = [
  {
    type: 'positive' as const,
    icon: '✅',
    title: '명확한 답변 구조',
    description: 'STAR 기법을 활용하여 체계적으로 답변하셨습니다.'
  },
  {
    type: 'positive' as const,
    icon: '🎯',
    title: '구체적인 사례 제시',
    description: '실제 경험을 바탕으로 한 구체적인 답변이 돋보였습니다.'
  },
  {
    type: 'neutral' as const,
    icon: '⚡',
    title: '말하기 속도 조절',
    description: '평소보다 15% 빠른 속도로 답변하셨어요.'
  }
]

export default function InsightsSection() {
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
        답변 통계 📊
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {insights.map((insight, idx) => (
          <InsightCard key={idx} {...insight} />
        ))}
      </div>
    </div>
  )
}
