// src\components\question-bank\PracticeSetCard.tsx
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
  isSelected = false
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
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))' 
          : 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: isSelected 
          ? '0 8px 30px rgba(44, 77, 247, 0.2)' 
          : '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: isSelected 
          ? '2px solid var(--primary-bright)' 
          : '1px solid rgba(31, 60, 136, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative'
      }}
    >
      {/* 선택됨 표시 배지 */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            background: 'var(--primary-bright)',
            color: 'white',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ✓ 선택됨
        </div>
      )}

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

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onViewDetails}
            style={{
              padding: '0.5rem 1rem',
              background: isSelected ? 'var(--primary-blue)' : 'transparent',
              color: isSelected ? 'white' : 'var(--primary-blue)',
              border: isSelected ? 'none' : '2px solid var(--primary-blue)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'rgba(44, 77, 247, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            상세보기
          </button>
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
              fontSize: '0.85rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 77, 247, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  )
}