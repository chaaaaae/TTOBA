// src\components\interview\ControlBar.tsx
interface ControlBarProps {
    isRecording: boolean
    onToggleRecording: () => void
    onEndInterview: () => void
  }
  
  export default function ControlBar({
    isRecording,
    onToggleRecording,
    onEndInterview
  }: ControlBarProps) {
    return (
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'rgba(15, 24, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        <button
          onClick={onToggleRecording}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isRecording ? 'var(--warning)' : 'var(--success)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isRecording ? '⏸️' : '▶️'}
        </button>
  
        <button
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            color: 'white'
          }}
        >
          🎤
        </button>
  
        <button
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            color: 'white'
          }}
        >
          📹
        </button>
  
        <button
          onClick={onEndInterview}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--danger)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ⏹️
        </button>
      </div>
    )
  }