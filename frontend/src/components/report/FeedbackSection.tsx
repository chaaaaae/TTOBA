// src\components\report\FeedbackSection.tsx
interface FeedbackItem {
    type: 'strength' | 'improvement' | 'suggestion'
    icon: string
    title: string
    items: string[]
  }
  
  interface FeedbackSectionProps {
    feedbacks: FeedbackItem[]
  }
  
  export default function FeedbackSection({ feedbacks }: FeedbackSectionProps) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {feedbacks.map((feedback, idx) => (
          <div
            key={idx}
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
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{feedback.icon}</span>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)'
                }}
              >
                {feedback.title}
              </h3>
            </div>
  
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {feedback.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--bg-light)',
                    borderRadius: '8px'
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      background: 'var(--primary-blue)',
                      borderRadius: '50%'
                    }}
                  />
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }