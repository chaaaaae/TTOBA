// src\components\interview\CameraView.tsx
interface CameraViewProps {
    isRecording: boolean
    stats?: {
      volume: string
      expression: string
      eyeContact: string
    }
  }
  
  export default function CameraView({ isRecording, stats }: CameraViewProps) {
    const defaultStats = {
      volume: '85%',
      expression: '자연스러움',
      eyeContact: '양호'
    }
  
    const displayStats = stats || defaultStats
  
    return (
      <div
        style={{
          width: '80%',
          height: '80%',
          background: 'rgba(15, 24, 40, 0.8)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Camera Placeholder */}
        <div
          style={{
            fontSize: '5rem',
            opacity: 0.3
          }}
        >
          📹
        </div>
  
        {/* Live Indicator */}
        {isRecording && (
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              padding: '0.75rem 1.25rem',
              background: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            LIVE
          </div>
        )}
  
        {/* AI Analysis Badge */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(72, 226, 179, 0.9)',
            color: 'var(--primary-blue)',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          🤖 AI 분석 중
        </div>
  
        {/* Stats Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            right: '2rem',
            display: 'flex',
            gap: '1rem'
          }}
        >
          {[
            { label: '음량', value: displayStats.volume, icon: '🔊' },
            { label: '표정', value: displayStats.expression, icon: '😊' },
            { label: '시선', value: displayStats.eyeContact, icon: '👁️' }
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '1rem',
                background: 'rgba(15, 24, 40, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                  marginBottom: '0.25rem'
                }}
              >
                {stat.icon} {stat.label}
              </div>
              <div
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
  
        {/* Grid Overlay (for alignment) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
            opacity: 0.3
          }}
        />
  
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        `}</style>
      </div>
    )
  }