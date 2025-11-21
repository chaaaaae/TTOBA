// src/components/interview/ChatPanel.tsx
import { useState, useEffect, useRef } from 'react'
import type React from 'react'
import ChatMessage from './ChatMessage'

interface Message {
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

// 🔥 STT 상태 타입
type SttState = 'idle' | 'starting' | 'recording' | 'transcribing'

interface ChatPanelProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  disabled?: boolean
  // 🔽 음성 인식용 추가 props
  onVoiceClick?: () => void          // 버튼 눌렀을 때 호출
  voiceText?: string                 // 인식 결과 텍스트
  sttState?: SttState                // STT 상태
}

export default function ChatPanel({
  messages,
  onSendMessage,
  disabled = false,
  onVoiceClick,
  voiceText,
  sttState = 'idle'
}: ChatPanelProps) {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 메시지가 추가될 때마다 자동으로 스크롤을 맨 아래로
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // textarea 높이 자동 조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }

  const handleSend = () => {
    if (inputMessage.trim() && !disabled) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
      // 전송 후 높이 초기화
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }, 0)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    adjustTextareaHeight()
  }

  // 🔥 STT 결과가 들어오면 입력창에 채워 넣기
  useEffect(() => {
    if (voiceText && !disabled) {
      setInputMessage((prev) => (prev ? `${prev} ${voiceText}` : voiceText))
      // STT 결과로 텍스트가 추가되면 높이 조절
      setTimeout(() => adjustTextareaHeight(), 0)
    }
  }, [voiceText, disabled])

  // 🔥 STT 상태에 따른 버튼 텍스트
  const getVoiceButtonLabel = () => {
    if (disabled) return '🎤 음성으로 답변하기'

    switch (sttState) {
      case 'starting':
        return '⏳ 준비 중...'
      case 'recording':
        return '🛑 음성 답변 중지'
      case 'transcribing':
        return '🔄 음성 인식 중...'
      case 'idle':
      default:
        return '🎤 음성으로 답변하기'
    }
  }

  const isVoiceButtonDisabled =
    disabled || sttState === 'starting' || sttState === 'transcribing'

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
              background:
                'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
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
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'var(--bg-light)',
          scrollBehavior: 'smooth',
          minHeight: 0 // flexbox 스크롤 버그 수정
        }}
        className="chat-messages-container"
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
          <>
            {messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
            {/* 자동 스크롤을 위한 타겟 */}
            <div ref={messagesEndRef} />
          </>
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
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? '면접이 종료되었습니다' : '답변을 입력하세요...'}
            disabled={disabled}
            rows={1}
            style={{
              flex: 1,
              padding: '0.875rem 1rem',
              border: '2px solid rgba(31, 60, 136, 0.1)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              transition: 'all 0.3s',
              outline: 'none',
              background: disabled ? '#F3F4F6' : 'white',
              cursor: disabled ? 'not-allowed' : 'text',
              resize: 'none',
              minHeight: '45px',
              maxHeight: '150px',
              overflowY: 'auto',
              lineHeight: '1.5',
              fontFamily: 'inherit',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(31, 60, 136, 0.2) rgba(31, 60, 136, 0.05)'
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
          disabled={isVoiceButtonDisabled}
          onClick={onVoiceClick}
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
            cursor: isVoiceButtonDisabled ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s'
          }}
        >
          {getVoiceButtonLabel()}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* 커스텀 스크롤바 */
        .chat-messages-container::-webkit-scrollbar {
          width: 8px;
        }

        .chat-messages-container::-webkit-scrollbar-track {
          background: rgba(31, 60, 136, 0.05);
          border-radius: 10px;
        }

        .chat-messages-container::-webkit-scrollbar-thumb {
          background: rgba(31, 60, 136, 0.2);
          border-radius: 10px;
          transition: background 0.3s;
        }

        .chat-messages-container::-webkit-scrollbar-thumb:hover {
          background: rgba(31, 60, 136, 0.4);
        }

        /* Firefox 스크롤바 */
        .chat-messages-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(31, 60, 136, 0.2) rgba(31, 60, 136, 0.05);
        }

        /* Textarea 스크롤바 (Chrome, Safari, Edge) */
        textarea::-webkit-scrollbar {
          width: 6px;
        }

        textarea::-webkit-scrollbar-track {
          background: rgba(31, 60, 136, 0.05);
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: rgba(31, 60, 136, 0.2);
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(31, 60, 136, 0.3);
        }
      `}</style>
    </div>
  )
}