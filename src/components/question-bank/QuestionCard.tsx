import Badge from '../ui/Badge'

interface QuestionCardProps {
  id: number
  question: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  practiced: number
  avgScore?: number
  onPractice: () => void
  onViewDetails: () => void
}

export default function QuestionCard({
  question,
  category,
  difficulty,
  practiced,
  avgScore,
  onPractice,
  onViewDetails
}: QuestionCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'danger'
      default: return 'info'
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
        borderRadius: '16px',
        padding: '1.5rem 2rem',
        boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: '1px solid rgba(31, 60, 136, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.75rem'
          }}
        >
          <Badge variant="primary">{category}</Badge>
          <Badge variant={getDifficultyColor(difficulty)}>
            {getDifficultyLabel(difficulty)}
          </Badge>
        </div>

        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}
        >
          {question}
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}
        >
          <span>📝 {practiced}회 연습</span>
          {avgScore && <span>⭐ 평균 {avgScore}점</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onViewDetails}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: 'var(--primary-blue)',
            border: '2px solid var(--primary-blue)',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s'
          }}
        >
          상세보기
        </button>
        <button
          onClick={onPractice}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
          }}
        >
          연습하기
        </button>
      </div>
    </div>
  )
}