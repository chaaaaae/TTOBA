import { useState } from 'react'
import ChatMessage from './ChatMessage'

interface Message {
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatPanel({
  messages,
  onSendMessage,
  disabled = false
}: ChatPanelProps) {
  const [inputMessage, setInputMessage] = useState('')

  const handleSend = () => {
    if (inputMessage.trim() && !disabled) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderLeft: '1px solid rgba(31, 60, 136, 0.08)'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
          background: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}
          >
            🤖
          </div>
          <div>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}
            >
              AI 면접관
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--success)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                온라인
              </span>
            </div>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          실시간으로 답변을 입력하거나 음성으로 답변하세요
        </p>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'var(--bg-light)'
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <p>대화가 시작되면 여기에 표시됩니다</p>
          </div>
        ) : (
          messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(31, 60, 136, 0.08)',
          background: 'white'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? '면접이 종료되었습니다' : '답변을 입력하세요...'}
            disabled={disabled}
            style={{
              flex: 1,
              padding: '0.875rem 1rem',
              border: '2px solid rgba(31, 60, 136, 0.1)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              transition: 'all 0.3s',
              outline: 'none',
              background: disabled ? '#F3F4F6' : 'white',
              cursor: disabled ? 'not-allowed' : 'text'
            }}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !inputMessage.trim()}
            style={{
              padding: '0.875rem 1.5rem',
              background:
                disabled || !inputMessage.trim()
                  ? '#E5E7EB'
                  : 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
              color: disabled || !inputMessage.trim() ? '#9CA3AF' : 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: disabled || !inputMessage.trim() ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              boxShadow:
                disabled || !inputMessage.trim()
                  ? 'none'
                  : '0 4px 12px rgba(44, 77, 247, 0.2)',
              transition: 'all 0.3s'
            }}
          >
            전송
          </button>
        </div>

        <button
          disabled={disabled}
          style={{
            width: '100%',
            padding: '1rem',
            background: disabled
              ? '#F3F4F6'
              : 'rgba(44, 77, 247, 0.1)',
            color: disabled ? '#9CA3AF' : 'var(--primary-blue)',
            border: disabled
              ? '2px solid #E5E7EB'
              : '2px solid rgba(44, 77, 247, 0.2)',
            borderRadius: '10px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s'
          }}
        >
          🎤 음성으로 답변하기
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}