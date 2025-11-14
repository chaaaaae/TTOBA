// src\components\dashboard\WeeklyProgress.tsx
interface WeeklyProgressProps {
    data: Array<{
      day: string
      count: number
      max: number
    }>
  }
  
  export default function WeeklyProgress({ data }: WeeklyProgressProps) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
          border: '1px solid rgba(31, 60, 136, 0.05)'
        }}
      >
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}
        >
          주간 진행률
        </h3>
  
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.map((day, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '30px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}
              >
                {day.day}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '12px',
                  background: '#E5E7EB',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${(day.count / day.max) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                    borderRadius: '6px',
                    transition: 'width 0.3s'
                  }}
                />
              </div>
              <div
                style={{
                  width: '50px',
                  textAlign: 'right',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              >
                {day.count}/{day.max}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }