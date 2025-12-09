// src/components/report/ReportTopBar.tsx

import React from 'react'

interface ReportTopBarProps {
  onBack: () => void
  onDownloadPdf?: () => void
  onRetry?: () => void
}

export default function ReportTopBar({
  onBack,
  onDownloadPdf,
  onRetry
}: ReportTopBarProps) {
  return (
    <div
      style={{
        background: 'white',
        borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)'
      }}
    >
      <div
        style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontWeight: '600',
            background: 'transparent',
            border: 'none',
            fontSize: '1rem'
          }}
        >
          ← 뒤로가기
        </button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onDownloadPdf}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'transparent',
              color: 'var(--primary-blue)',
              border: '2px solid var(--primary-blue)',
              fontSize: '0.9rem'
            }}
          >
            PDF 다운로드
          </button>
          <button
            onClick={onRetry}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background:
                'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
              color: 'white',
              border: 'none',
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
            }}
          >
            다시 연습하기
          </button>
        </div>
      </div>
    </div>
  )
}