// src\components\interview\InterviewHUD.tsx
interface InterviewHUDProps {
    isRecording: boolean
    elapsedTime: number
    currentQuestion: number
    totalQuestions: number
  }
  
  export default function InterviewHUD({
    isRecording,
    elapsedTime,
    currentQuestion,
    totalQuestions
  }: InterviewHUDProps) {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          background: 'rgba(15, 24, 40, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Recording Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--danger)',
              borderRadius: '20px',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                background: 'var(--danger)',
                borderRadius: '50%',
                animation: isRecording ? 'pulse 1.5s ease-in-out infinite' : 'none'
              }}
            />
            REC
          </div>
  
          {/* Timer */}
          <div
            style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}
          >
            {formatTime(elapsedTime)}
          </div>
  
          {/* Question Progress */}
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(44, 77, 247, 0.1)',
              border: '1px solid var(--primary-bright)',
              borderRadius: '20px',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            질문 {currentQuestion}/{totalQuestions}
          </div>
        </div>
  
        {/* Settings Button */}
        <button
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s'
          }}
        >
          ⚙️ 설정
        </button>
  
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    )
  }