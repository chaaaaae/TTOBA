// src/components/report/InsightsSection.tsx

import React from 'react'
import InsightCard from './InsightCard'

const insights = [
  {
    type: 'positive' as const,
    icon: '⏱️',
    title: '말하기 속도 안정성',
    description: '인터뷰에 적합한 일정한 속도를 유지하셨습니다.'
  },
  {
    type: 'positive' as const,
    icon: '🤫',
    title: '침묵 비율 관리',
    description: '답변 중 불필요한 침묵 없이 자연스러운 호흡 간격을 유지하셨습니다.'
  },
  {
    type: 'neutral' as const,
    icon: '🗣️',
    title: '말버릇 및 문장 마무리',
    description: '문장 끝을 흐리지 않고 명확하게 마무리하는 안정적인 말투가 관찰되었습니다.'
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
