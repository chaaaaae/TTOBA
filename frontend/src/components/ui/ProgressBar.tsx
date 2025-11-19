// src\components\ui\ProgressBar.tsx
import type { CSSProperties } from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  height?: number
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
  style?: CSSProperties
}

export default function ProgressBar({
  value,
  max = 100,
  height = 8,
  showLabel = false,
  color = 'primary',
  style
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colorStyles: Record<string, string> = {
    primary: 'linear-gradient(90deg, var(--primary-bright), var(--accent-mint))',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  }

  return (
    <div style={{ width: '100%', ...style }}>
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          background: '#E5E7EB',
          borderRadius: `${height / 2}px`,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: colorStyles[color],
            borderRadius: `${height / 2}px`,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
      {showLabel && (
        <div
          style={{
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textAlign: 'right'
          }}
        >
          {value}/{max}
        </div>
      )}
    </div>
  )
}