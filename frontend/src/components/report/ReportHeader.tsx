// src/components/report/ReportHeader.tsx

import React from 'react'

interface ReportHeaderProps {
  reportId?: string
  totalDurationLabel: string
  questionCount: number
  overallScore?: number
}

export default function ReportHeader({
  reportId,
  totalDurationLabel,
  questionCount,
  overallScore = 92
}: ReportHeaderProps) {
  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
        borderRadius: '24px',
        padding: '3rem',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)'
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '0.75rem'
            }}
          >
            면접 리포트 #{reportId}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.05rem'
            }}
          >
            {/* TODO: 날짜는 나중에 실제 데이터로 치환 */}
            <span>📅 2024.03.15</span>
            <span>⏱️ {totalDurationLabel}</span>
            <span>💬 {questionCount}개 질문</span>
          </div>
        </div>

        <div
          style={{
            width: '160px',
            height: '160px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <div style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1 }}>
            {overallScore}
          </div>
          <div style={{ fontSize: '1rem', opacity: 0.9, marginTop: '0.5rem' }}>
            종합 점수
          </div>
        </div>
      </div>
    </div>
  )
}
