import DashboardLayout from '../components/layout/DashboardLayout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          안녕하세요, 김지훈님! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          오늘도 면접 준비를 시작해볼까요?
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {[
          { icon: '🎯', label: '총 면접', value: '24회', color: 'var(--primary-bright)' },
          { icon: '⭐', label: '평균 점수', value: '85점', color: 'var(--accent-mint)' },
          { icon: '📈', label: '이번 주', value: '+12%', color: 'var(--success)' },
          { icon: '⏱️', label: '총 시간', value: '8.5h', color: 'var(--accent-orange)' }
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
            border: '1px solid rgba(31, 60, 136, 0.05)',
            transition: 'all 0.3s'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem'
            }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              {stat.value}
            </div>
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              {stat.label}
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
        {/* Left Column - Recent Interviews */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--text-primary)'
            }}>
              최근 면접 기록
            </h2>
            <button style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: 'var(--primary-blue)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              전체보기 →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { 
                title: '신입 개발자 면접', 
                date: '2024.03.15', 
                score: 92, 
                questions: 8,
                status: 'excellent'
              },
              { 
                title: '기술 면접 연습', 
                date: '2024.03.12', 
                score: 85, 
                questions: 10,
                status: 'good'
              },
              { 
                title: '인성 면접 대비', 
                date: '2024.03.10', 
                score: 78, 
                questions: 6,
                status: 'normal'
              }
            ].map((interview, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
                border: '1px solid rgba(31, 60, 136, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    {interview.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <span>📅 {interview.date}</span>
                    <span>💬 {interview.questions}개 질문</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: `conic-gradient(var(--primary-bright) ${interview.score * 3.6}deg, #E5E7EB 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--primary-blue)'
                    }}>
                      {interview.score}
                    </div>
                  </div>
                  <button style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
                  }}>
                    리포트 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Quick Actions & Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Progress Chart */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
            border: '1px solid rgba(31, 60, 136, 0.05)'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              주간 진행률
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {[
                { day: '월', count: 3, max: 5 },
                { day: '화', count: 2, max: 5 },
                { day: '수', count: 4, max: 5 },
                { day: '목', count: 1, max: 5 },
                { day: '금', count: 2, max: 5 },
                { day: '토', count: 0, max: 5 },
                { day: '일', count: 0, max: 5 }
              ].map((day, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '30px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    {day.day}
                  </div>
                  <div style={{
                    flex: 1,
                    height: '12px',
                    background: '#E5E7EB',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(day.count / day.max) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                      borderRadius: '6px',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{
                    width: '50px',
                    textAlign: 'right',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}>
                    {day.count}/{day.max}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Practice */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                💡
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                marginBottom: '0.75rem'
              }}>
                추천 연습 주제
              </h3>
              <p style={{
                opacity: 0.9,
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                자기소개 답변이 약한 편이에요.<br />
                오늘은 자기소개 연습을 해보는 건 어떨까요?
              </p>
              <button style={{
                padding: '0.875rem 1.5rem',
                background: 'white',
                color: 'var(--primary-blue)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.95rem',
                width: '100%',
                transition: 'all 0.3s'
              }}>
                지금 연습하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}