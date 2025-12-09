// src\components\report\InsightCard.tsx
interface InsightCardProps {
    type: 'positive' | 'neutral' | 'negative'
    icon: string
    title: string
    description: string
  }
  
  export default function InsightCard({
    type,
    icon,
    title,
    description
  }: InsightCardProps) {
    const getBackgroundColor = () => {
      switch (type) {
        case 'positive':
          return 'rgba(16, 185, 129, 0.1)'
        case 'negative':
          return 'rgba(239, 68, 68, 0.1)'
        default:
          return 'rgba(251, 191, 36, 0.1)'
      }
    }
  
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
          border: '1px solid rgba(31, 60, 136, 0.05)',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            background: getBackgroundColor(),
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}
          >
            {description}
          </p>
        </div>
      </div>
    )
  }