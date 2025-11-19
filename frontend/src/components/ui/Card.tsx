// src\components\ui\Card.tsx
import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
  onClick?: () => void
}

export default function Card({ 
  children, 
  hover = false, 
  padding = 'md',
  style,
  onClick 
}: CardProps) {
  const paddingStyles = {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem'
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: paddingStyles[padding],
        boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: '1px solid rgba(31, 60, 136, 0.05)',
        transition: 'all 0.3s',
        cursor: onClick ? 'pointer' : 'default',
        ...(hover && {
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(31, 60, 136, 0.12)'
          }
        }),
        ...style
      }}
    >
      {children}
    </div>
  )
}