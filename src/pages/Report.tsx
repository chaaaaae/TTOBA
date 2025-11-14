import { useParams, useNavigate } from 'react-router-dom'

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: '600',
              background: 'transparent',
              border: 'none',
              fontSize: '1rem'
            }}
          >
            ← 뒤로가기
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'transparent',
              color: 'var(--primary-blue)',
              border: '2px solid var(--primary-blue)',
              fontSize: '0.9rem'
            }}>
              PDF 다운로드
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
              color: 'white',
              border: 'none',
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
            }}>
              다시 연습하기
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Report Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '0.75rem'
              }}>
                면접 리포트 #{id}
              </h1>
              <div style={{
                display: 'flex',
                gap: '2rem',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '1.05rem'
              }}>
                <span>📅 2024.03.15</span>
                <span>⏱️ 25분</span>
                <span>💬 8개 질문</span>
              </div>
            </div>

            <div style={{
              width: '160px',
              height: '160px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: '800',
                lineHeight: 1
              }}>
                92
              </div>
              <div style={{
                fontSize: '1rem',
                opacity: 0.9,
                marginTop: '0.5rem'
              }}>
                종합 점수
              </div>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {[
            { label: '내용', score: 90, icon: '📝' },
            { label: '전달력', score: 88, icon: '🎤' },
            { label: '자신감', score: 95, icon: '💪' },
            { label: '명확성', score: 92, icon: '💡' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
              border: '1px solid rgba(31, 60, 136, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {item.icon}
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--primary-blue)',
                marginBottom: '0.5rem'
              }}>
                {item.score}
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Key Insights */}
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                핵심 인사이트 💡
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    type: 'positive',
                    icon: '✅',
                    title: '명확한 답변 구조',
                    description: 'STAR 기법을 활용하여 체계적으로 답변하셨습니다.'
                  },
                  {
                    type: 'positive',
                    icon: '🎯',
                    title: '구체적인 사례 제시',
                    description: '실제 경험을 바탕으로 한 구체적인 답변이 돋보였습니다.'
                  },
                  {
                    type: 'neutral',
                    icon: '⚡',
                    title: '말하기 속도 조절',
                    description: '평소보다 15% 빠른 속도로 답변하셨어요.'
                  }
                ].map((insight, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
                    border: '1px solid rgba(31, 60, 136, 0.05)',
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: insight.type === 'positive' 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(251, 191, 36, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {insight.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                      }}>
                        {insight.title}
                      </h3>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        {insight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Answers */}
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                답변 내역 📝
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    question: '간단하게 자기소개를 해주세요.',
                    answer: '안녕하세요. 프론트엔드 개발자를 희망하는 김지훈입니다...',
                    score: 95,
                    duration: '2분 30초'
                  },
                  {
                    question: '우리 회사에 지원한 이유는 무엇인가요?',
                    answer: '귀사의 혁신적인 기술 문화와 사용자 중심의 개발 철학에...',
                    score: 88,
                    duration: '3분 10초'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
                    border: '1px solid rgba(31, 60, 136, 0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        flex: 1
                      }}>
                        Q{idx + 1}. {item.question}
                      </h3>
                      <div style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))',
                        borderRadius: '8px',
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: 'var(--primary-blue)'
                      }}>
                        {item.score}점
                      </div>
                    </div>

                    <p style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      marginBottom: '1rem'
                    }}>
                      {item.answer}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(31, 60, 136, 0.08)'
                    }}>
                      <span style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                      }}>
                        ⏱️ {item.duration}
                      </span>
                      <button style={{
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        color: 'var(--primary-blue)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        상세 피드백 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Feedback */}
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              개선 포인트 🎯
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  type: 'strength',
                  icon: '💪',
                  title: '강점',
                  items: ['명확한 전달력', '풍부한 예시', '자신감 있는 태도']
                },
                {
                  type: 'improvement',
                  icon: '📈',
                  title: '개선점',
                  items: ['말하기 속도 조절', '필러 워드 줄이기', '시선 처리']
                },
                {
                  type: 'suggestion',
                  icon: '💡',
                  title: '제안사항',
                  items: ['STAR 기법 활용', '구체적 수치 제시', '결론 먼저 말하기']
                }
              ].map((feedback, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
                  border: '1px solid rgba(31, 60, 136, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{feedback.icon}</span>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)'
                    }}>
                      {feedback.title}
                    </h3>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {feedback.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: 'var(--bg-light)',
                        borderRadius: '8px'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: 'var(--primary-blue)',
                          borderRadius: '50%'
                        }} />
                        <span style={{
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem'
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Share Button */}
            <button style={{
              width: '100%',
              padding: '1rem',
              marginTop: '1.5rem',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
              transition: 'all 0.3s'
            }}>
              리포트 공유하기 📤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}