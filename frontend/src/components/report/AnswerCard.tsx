// src/components/report/AnswerCard.tsx

import React from 'react'

interface AnswerCardProps {
  questionNumber: number
  question: string
  answer: string
  score?: number
  duration?: string
  onViewFeedback?: () => void
}

export default function AnswerCard({
  questionNumber,
  question,
  answer,
  score = 0,
  duration = '',
  onViewFeedback
}: AnswerCardProps) {
  // ✅ 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981' // 초록색
    if (score >= 60) return '#f59e0b' // 주황색
    return '#ef4444' // 빨간색
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(31, 60, 136, 0.08)',
        transition: 'all 0.3s'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.5rem'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                background: 'var(--primary-blue)',
                color: 'white',
                borderRadius: '50%',
                fontSize: '0.85rem',
                fontWeight: '700'
              }}
            >
              {questionNumber}
            </span>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              {question}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginLeft: '1rem'
          }}
        >
          {duration && (
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap'
              }}
            >
              ⏱️ {duration}
            </span>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: `${getScoreColor(score)}15`,
              borderRadius: '10px'
            }}
          >
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: getScoreColor(score)
              }}
            >
              {score}
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontWeight: '600'
              }}
            >
              점
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {answer}
      </p>

      <button
        onClick={onViewFeedback}
        style={{
          padding: '0.6rem 1.2rem',
          background: 'var(--primary-blue)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        상세 피드백 보기 →
      </button>
    </div>
  )
}