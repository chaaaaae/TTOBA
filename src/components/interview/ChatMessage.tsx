// src\components\interview\ChatMessage.tsx
interface Message {
    type: 'ai' | 'user'
    content: string
    timestamp: Date
  }
  
  interface ChatMessageProps {
    message: Message
  }
  
  export default function ChatMessage({ message }: ChatMessageProps) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: message.type === 'ai' ? 'flex-start' : 'flex-end'
        }}
      >
        <div
          style={{
            maxWidth: '85%',
            padding: '1rem 1.25rem',
            borderRadius:
              message.type === 'ai'
                ? '4px 16px 16px 16px'
                : '16px 4px 16px 16px',
            background:
              message.type === 'ai'
                ? 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))'
                : 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
            color: message.type === 'ai' ? 'var(--text-primary)' : 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '0.5rem'
            }}
          >
            {message.content}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            {message.timestamp.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    )
  }