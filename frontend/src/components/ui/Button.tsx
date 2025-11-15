// src\components\ui\Button.tsx
import type { ReactNode, CSSProperties } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: CSSProperties
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  style
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    borderRadius: '10px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    border: 'none',
    display: 'inline-block'
  }

  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.85rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.9rem' },
    lg: { padding: '1rem 2rem', fontSize: '1rem' }
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
      color: 'white',
      boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary-blue)',
      border: '2px solid var(--primary-blue)'
    },
    accent: {
      background: 'linear-gradient(135deg, var(--accent-mint), var(--accent-lime))',
      color: 'var(--primary-blue)',
      boxShadow: '0 4px 12px rgba(72, 226, 179, 0.2)'
    },
    danger: {
      background: 'var(--danger)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
    }
  }

  const disabledStyle: CSSProperties = disabled
    ? {
        background: '#E5E7EB',
        color: '#9CA3AF',
        boxShadow: 'none',
        cursor: 'not-allowed'
      }
    : {}

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...(disabled ? disabledStyle : variantStyles[variant]),
        ...style
      }}
    >
      {children}
    </button>
  )
}