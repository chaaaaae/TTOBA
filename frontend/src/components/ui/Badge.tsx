// src\components\ui\Badge.tsx
import type { ReactNode, CSSProperties } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  style?: CSSProperties
}

export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'md',
  style 
}: BadgeProps) {
  const sizeStyles = {
    sm: { padding: '0.25rem 0.75rem', fontSize: '0.8rem' },
    md: { padding: '0.5rem 1rem', fontSize: '0.9rem' }
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'rgba(44, 77, 247, 0.1)',
      color: 'var(--primary-blue)'
    },
    success: {
      background: 'rgba(16, 185, 129, 0.1)',
      color: 'var(--success)'
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.1)',
      color: 'var(--warning)'
    },
    danger: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: 'var(--danger)'
    },
    info: {
      background: 'rgba(72, 226, 179, 0.1)',
      color: 'var(--accent-mint)'
    }
  }

  return (
    <span
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: '6px',
        fontWeight: '600',
        display: 'inline-block',
        ...style
      }}
    >
      {children}
    </span>
  )
}