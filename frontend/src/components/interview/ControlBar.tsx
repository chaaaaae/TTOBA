// src\components\interview\ControlBar.tsx
interface ControlBarProps {
  isRecording: boolean
  cameraEnabled: boolean
  micEnabled: boolean
  onToggleRecording: () => void
  onToggleCamera: () => void
  onToggleMic: () => void
  onEndInterview: () => void
}

export default function ControlBar({
  isRecording,
  cameraEnabled,
  micEnabled,
  onToggleRecording,
  onToggleCamera,
  onToggleMic,
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
      {/* 녹화 시작/일시정지 버튼 */}
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
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        title={isRecording ? '일시정지' : '녹화 시작'}
      >
        {isRecording ? '⏸️' : '▶️'}
      </button>

      {/* 마이크 온오프 버튼 */}
      <button
        onClick={onToggleMic}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: micEnabled 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(239, 68, 68, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          fontSize: '1.5rem',
          transition: 'all 0.3s',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        title={micEnabled ? '마이크 끄기' : '마이크 켜기'}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {micEnabled ? '🎤' : '🔇'}
      </button>

      {/* 카메라 온오프 버튼 */}
      <button
        onClick={onToggleCamera}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: cameraEnabled 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(239, 68, 68, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          fontSize: '1.5rem',
          transition: 'all 0.3s',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        title={cameraEnabled ? '카메라 끄기' : '카메라 켜기'}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {cameraEnabled ? '📹' : '📷'}
      </button>

      {/* 면접 종료 버튼 */}
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
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
        }}
        title="면접 종료"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)'
        }}
      >
        ⏹️
      </button>
    </div>
  )
}