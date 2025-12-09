// src/components/question-bank/PracticeSetCard.tsx
interface PracticeSetCardProps {
  title: string
  description: string
  count: number
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
  onStart: () => void
  onViewDetails: () => void
  isSelected?: boolean
}

export default function PracticeSetCard({
  title,
  description,
  count,
  difficulty,
  icon,
  onStart,
  onViewDetails,
  isSelected
}: PracticeSetCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'var(--success)'
      case 'medium': return 'var(--warning)'
      case 'hard': return 'var(--danger)'
      default: return 'var(--text-secondary)'
    }
  }

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'easy': return '쉬움'
      case 'medium': return '보통'
      case 'hard': return '어려움'
      default: return ''
    }
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: isSelected
          ? '0 0 0 3px var(--primary-blue)'
          : '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: '1px solid rgba(31, 60, 136, 0.05)',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}
        >
          <span>📝 {count}개</span>
          <span style={{ color: getDifficultyColor(difficulty) }}>
            ⚡ {getDifficultyLabel(difficulty)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* 질문보기 버튼 (필터 기능 트리거!) */}
          <button
            onClick={onViewDetails}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: 'var(--primary-blue)',
              border: '2px solid var(--primary-blue)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            질문보기
          </button>

          {/* 연습하기 버튼 */}
          <button
            onClick={onStart}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
