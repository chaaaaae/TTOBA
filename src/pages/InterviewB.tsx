import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Interview() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(222)
  const [questionTime, setQuestionTime] = useState(83)
  const [currentQuestion, setCurrentQuestion] = useState(3)
  const [totalQuestions] = useState(8)

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
        setQuestionTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = (seconds: number) => {
    if (seconds > 180) return 'var(--danger)'
    if (seconds > 120) return 'var(--warning)'
    return 'var(--text-primary)'
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      navigate('/report/1')
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1)
      setQuestionTime(0)
    } else {
      handleEndInterview()
    }
  }

  const handleSkipQuestion = () => {
    if (window.confirm('이 질문을 건너뛰시겠습니까?')) {
      handleNextQuestion()
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

            <div style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}>
              {formatTime(elapsedTime)}
            </div>

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

        {/* Camera View */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(31, 60, 136, 0.3), rgba(44, 77, 247, 0.3))'
        }}>
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
            <div style={{ fontSize: '5rem', opacity: 0.3 }}>📹</div>

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
              transition: 'all 0.3s'
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
              transition: 'all 0.3s'
            }}
          >
            ⏹️
          </button>
        </div>
      </div>

      {/* Right Side - Question Panel */}
      <div style={{
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Panel Header */}
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
          color: 'white',
          flexShrink: 0
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            면접 진행 중
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.9rem',
            opacity: 0.9
          }}>
            <span>📝 질문 {currentQuestion}/{totalQuestions}</span>
            <span>•</span>
            <span>⏱️ {formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          padding: '1.5rem 2rem',
          background: 'var(--bg-light)',
          borderBottom: '1px solid rgba(31, 60, 136, 0.1)',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              position: 'absolute',
              top: '15px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(31, 60, 136, 0.1)',
              zIndex: 0
            }}>
              <div style={{
                height: '100%',
                width: `${(currentQuestion / totalQuestions) * 100}%`,
                background: 'linear-gradient(90deg, var(--primary-bright), var(--accent-mint))',
                transition: 'width 0.5s ease'
              }} />
            </div>

            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: step < currentQuestion
                    ? 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))'
                    : 'white',
                  border: step === currentQuestion
                    ? '3px solid var(--accent-mint)'
                    : step < currentQuestion
                    ? 'none'
                    : '3px solid rgba(31, 60, 136, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  color: step <= currentQuestion ? (step < currentQuestion ? 'white' : 'var(--primary-blue)') : 'var(--text-secondary)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.3s',
                  transform: step === currentQuestion ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: step === currentQuestion ? '0 0 0 4px rgba(72, 226, 179, 0.2)' : 'none'
                }}
              >
                {step < currentQuestion ? '✓' : step}
              </div>
            ))}
          </div>
        </div>

        {/* Current Question - 스크롤 가능 */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
            color: 'white',
            borderRadius: '20px',
            fontWeight: '700',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            질문 {currentQuestion}
          </div>

          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            마케팅 캠페인에서 데이터 분석을 통해 ROI를 개선한 경험을 설명해주세요.
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            background: 'var(--bg-light)',
            borderRadius: '16px',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              ⏱️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                답변 시간
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: getTimerColor(questionTime)
              }}>
                {formatTime(questionTime)}
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(44, 77, 247, 0.05), rgba(72, 226, 179, 0.05))',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontWeight: '700',
              color: 'var(--primary-blue)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              💡 답변 팁
            </div>
            {[
              'STAR 기법으로 답변하세요 (상황-과제-행동-결과)',
              '구체적인 수치와 데이터를 언급하세요',
              '카메라를 보며 자신감 있게 답변하세요'
            ].map((tip, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: idx < 2 ? '0.75rem' : 0,
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                <span>✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'white',
            border: '2px solid var(--accent-mint)',
            borderRadius: '16px'
          }}>
            <div style={{
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎯 추천 키워드
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {['데이터 분석', 'ROI', '타게팅', '전환율', '고객 페르소나'].map((keyword, idx) => (
                <div key={idx} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(44, 77, 247, 0.1)',
                  color: 'var(--primary-blue)',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          background: 'var(--bg-light)',
          borderTop: '1px solid rgba(31, 60, 136, 0.1)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleSkipQuestion}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'white',
                color: 'var(--primary-blue)',
                border: '2px solid var(--primary-blue)',
                fontSize: '0.95rem'
              }}
            >
              질문 건너뛰기
            </button>
            <button
              onClick={handleNextQuestion}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                color: 'white',
                border: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
              }}
            >
              다음 질문 →
            </button>
          </div>
        </div>
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