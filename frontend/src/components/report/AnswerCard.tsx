// src\components\report\AnswerCard.tsx
interface AnswerCardProps {
    questionNumber: number
    question: string
    answer: string
    score: number
    duration: string
    onViewFeedback: () => void
  }
  
  export default function AnswerCard({
    questionNumber,
    question,
    answer,
    score,
    duration,
    onViewFeedback
  }: AnswerCardProps) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
          border: '1px solid rgba(31, 60, 136, 0.05)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem'
          }}
        >
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              flex: 1
            }}
          >
            Q{questionNumber}. {question}
          </h3>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--primary-blue)'
            }}
          >
            {score}점
          </div>
        </div>
  
        <p
          style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            marginBottom: '1rem'
          }}
        >
          {answer}
        </p>
  
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(31, 60, 136, 0.08)'
          }}
        >
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            ⏱️ {duration}
          </span>
          <button
            data-feedback-trigger
            onClick={onViewFeedback}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: 'var(--primary-blue)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            상세 피드백 →
          </button>
        </div>
      </div>
    )
  }