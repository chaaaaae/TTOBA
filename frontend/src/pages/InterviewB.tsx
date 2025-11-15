// src\pages\InterviewB.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewHUD from '../components/interview/InterviewHUD'
import ChatMessage from '../components/interview/ChatMessage'
import ControlBar from '../components/interview/ControlBar'

export default function Interview() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(8)
  const [messages, setMessages] = useState([
    {
      type: 'ai' as const,
      content: '안녕하세요! 면접을 시작하겠습니다. 준비되셨나요?',
      timestamp: new Date()
    },
    {
      type: 'user' as const,
      content: '네, 준비됐습니다!',
      timestamp: new Date()
    },
    {
      type: 'ai' as const,
      content: '좋습니다. 첫 번째 질문입니다. 간단하게 자기소개를 해주세요.',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  // Timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          type: 'user',
          content: inputMessage,
          timestamp: new Date()
        }
      ])
      setInputMessage('')

      // AI 응답 시뮬레이션
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            content: '좋은 답변입니다. 다음 질문으로 넘어가겠습니다.',
            timestamp: new Date()
          }
        ])
      }, 1500)
    }
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      navigate('/report/1')
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        background: 'var(--bg-dark)',
        overflow: 'hidden'
      }}
    >
      {/* Left Side - Camera & HUD */}
      <div
        style={{
          background: 'var(--bg-dark)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Bar */}
        <InterviewHUD
          isRecording={isRecording}
          elapsedTime={elapsedTime}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        {/* Camera View */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background:
              'linear-gradient(135deg, rgba(31, 60, 136, 0.3), rgba(44, 77, 247, 0.3))'
          }}
        >
          {/* Placeholder for Camera */}
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
            {/* Camera Icon */}
            <div style={{ fontSize: '5rem', opacity: 0.3 }}>📹</div>

            {/* Live Indicator */}
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
                gap: '0.5rem'
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
                { label: '음량', value: '85%', icon: '🔊' },
                { label: '표정', value: '자연스러움', icon: '😊' },
                { label: '시선', value: '양호', icon: '👁️' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'rgba(15, 24, 40, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
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
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <ControlBar
          isRecording={isRecording}
          onToggleRecording={() => setIsRecording(!isRecording)}
          onEndInterview={handleEndInterview}
        />
      </div>

      {/* Right Side - Chat Panel */}
      <div
        style={{
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(31, 60, 136, 0.08)'
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
            background: 'white'
          }}
        >
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}
          >
            AI 면접관
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            실시간으로 답변을 입력하거나 음성으로 답변하세요
          </p>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
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
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="답변을 입력하세요..."
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                border: '2px solid rgba(31, 60, 136, 0.1)',
                borderRadius: '10px',
                fontSize: '0.95rem',
                transition: 'all 0.3s'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '0.875rem 1.5rem',
                background:
                  'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
                transition: 'all 0.3s'
              }}
            >
              전송
            </button>
          </div>

          <button
            style={{
              width: '100%',
              padding: '1rem',
              background: 'rgba(44, 77, 247, 0.1)',
              color: 'var(--primary-blue)',
              border: '2px solid rgba(44, 77, 247, 0.2)',
              borderRadius: '10px',
              cursor: 'pointer',
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
      </div>
    </div>
  )
}