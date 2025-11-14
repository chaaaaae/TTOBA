// src\components\report\ScoreCard.tsx
interface ScoreCardProps {
    label: string
    score: number
    icon: string
  }
  
  export default function ScoreCard({ label, score, icon }: ScoreCardProps) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
          border: '1px solid rgba(31, 60, 136, 0.05)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
        <div
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'var(--primary-blue)',
            marginBottom: '0.5rem'
          }}
        >
          {score}
        </div>
        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          {label}
        </div>
      </div>
    )
  }