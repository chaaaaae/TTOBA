// src/components/report/ScoreCard.tsx

interface ScoreCardProps {
  label: string        // 집중도, 흥미 등 (← 이제 큰 글씨!)
  level: string        // "높음", "보통", "낮음" (← 이제 작은 글씨!)
  icon: string
}

export default function ScoreCard({ label, level, icon }: ScoreCardProps) {
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

      {/* label을 강조 스타일로 변경 */}
      <div
        style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: 'var(--primary-blue)',
          marginBottom: '0.5rem'
        }}
      >
        {label}
      </div>

      {/* level을 작고 서브텍스트 스타일로 변경 */}
      <div
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          fontWeight: '600'
        }}
      >
        {level}
      </div>
    </div>
  )
}
