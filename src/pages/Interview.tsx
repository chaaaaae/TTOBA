import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Interview() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(8)
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '안녕하세요! 면접을 시작하겠습니다. 준비되셨나요?',
      timestamp: new Date()
    },
    {
      type: 'user',
      content: '네, 준비됐습니다!',
      timestamp: new Date()
    },
    {
      type: 'ai',
      content: '좋습니다. 첫 번째 질문입니다. 간단하게 자기소개를 해주세요.',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  // Timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      }])
      setInputMessage('')
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: '좋은 답변입니다. 다음 질문으로 넘어가겠습니다.',
          timestamp: new Date()
        }])
      }, 1500)
    }
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      navigate('/report/1')
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      background: 'var(--bg-dark)',
      overflow: 'hidden'
    }}>
      {/* Left Side - Camera & HUD */}
      <div style={{
        background: 'var(--bg-dark)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          background: 'rgba(15, 24, 40, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Recording Indicator */}
            <div style={{
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
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                background: 'var(--danger)',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              REC
            </div>

            {/* Timer */}
            <div style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}>
              {formatTime(elapsedTime)}
            </div>

            {/* Question Progress */}
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(44, 77, 247, 0.1)',
              border: '1px solid var(--primary-bright)',
              borderRadius: '20px',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              질문 {currentQuestion}/{totalQuestions}
            </div>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s'
            }}>
              ⚙️ 설정
            </button>
          </div>
        </div>

        {/* Camera View */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.3), rgba(44, 77, 247, 0.3))'
        }}>
          {/* Placeholder for Camera */}
          <div style={{
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
          }}>
            {/* Camera Icon */}
            <div style={{
              fontSize: '5rem',
              opacity: 0.3
            }}>
              📹
            </div>

            {/* Live Indicator */}
            <div style={{
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
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              LIVE
            </div>

            {/* Stats Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              display: 'flex',
              gap: '1rem'
            }}>
              {[
                { label: '음량', value: '85%', icon: '🔊' },
                { label: '표정', value: '자연스러움', icon: '😊' },
                { label: '시선', value: '양호', icon: '👁️' }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'rgba(15, 24, 40, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.8rem',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.icon} {stat.label}
                  </div>
                  <div style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div style={{
          padding: '1.5rem 2rem',
          background: 'rgba(15, 24, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => setIsRecording(!isRecording)}
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

          <button style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            color: 'white'
          }}>
            🎤
          </button>

          <button style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            color: 'white'
          }}>
            📹
          </button>

          <button
            onClick={handleEndInterview}
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
      </div>

      {/* Right Side - Chat Panel */}
      <div style={{
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(31, 60, 136, 0.08)'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
          background: 'white'
        }}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            AI 면접관
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            실시간으로 답변을 입력하거나 음성으로 답변하세요
          </p>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.type === 'ai' ? 'flex-start' : 'flex-end'
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '1rem 1.25rem',
                borderRadius: msg.type === 'ai' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                background: msg.type === 'ai'
                  ? 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))'
                  : 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                color: msg.type === 'ai' ? 'var(--text-primary)' : 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '0.5rem'
                }}>
                  {msg.content}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.7
                }}>
                  {msg.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(31, 60, 136, 0.08)',
          background: 'white'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
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
                background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
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

          <button style={{
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
          }}>
            🎤 음성으로 답변하기
          </button>
        </div>
      </div>

      {/* Add pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}