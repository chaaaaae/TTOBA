// src\components\dashboard\RecentInterviewCard.tsx
interface RecentInterviewCardProps {
    title: string
    date: string
    score: number
    questions: number
    onViewReport: () => void
  }
  
  export default function RecentInterviewCard({
    title,
    date,
    score,
    questions,
    onViewReport
  }: RecentInterviewCardProps) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
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
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}
          >
            <span>📅 {date}</span>
            <span>💬 {questions}개 질문</span>
          </div>
        </div>
  
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Circular Score */}
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: `conic-gradient(var(--primary-bright) ${score * 3.6}deg, #E5E7EB 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'var(--primary-blue)'
              }}
            >
              {score}
            </div>
          </div>
  
          <button
            onClick={onViewReport}
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
            리포트 보기
          </button>
        </div>
      </div>
    )
  }