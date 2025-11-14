import DashboardLayout from '../components/layout/DashboardLayout'
import StatsCard from '../components/dashboard/StatsCard'
import RecentInterviewCard from '../components/dashboard/RecentInterviewCard'
import WeeklyProgress from '../components/dashboard/WeeklyProgress'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const weeklyData = [
    { day: '월', count: 3, max: 5 },
    { day: '화', count: 2, max: 5 },
    { day: '수', count: 4, max: 5 },
    { day: '목', count: 1, max: 5 },
    { day: '금', count: 2, max: 5 },
    { day: '토', count: 0, max: 5 },
    { day: '일', count: 0, max: 5 }
  ]

  const recentInterviews = [
    {
      title: '신입 개발자 면접',
      date: '2024.03.15',
      score: 92,
      questions: 8
    },
    {
      title: '기술 면접 연습',
      date: '2024.03.12',
      score: 85,
      questions: 10
    },
    {
      title: '인성 면접 대비',
      date: '2024.03.10',
      score: 78,
      questions: 6
    }
  ]

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}
        >
          안녕하세요, 김지훈님! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          오늘도 면접 준비를 시작해볼까요?
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        <StatsCard icon="🎯" label="총 면접" value="24회" />
        <StatsCard icon="⭐" label="평균 점수" value="85점" />
        <StatsCard icon="📈" label="이번 주" value="+12%" />
        <StatsCard icon="⏱️" label="총 시간" value="8.5h" />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column - Recent Interviews */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: 'var(--text-primary)'
              }}
            >
              최근 면접 기록
            </h2>
            <button
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: 'var(--primary-blue)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              전체보기 →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentInterviews.map((interview, idx) => (
              <RecentInterviewCard
                key={idx}
                {...interview}
                onViewReport={() => navigate('/report/1')}
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Weekly Progress */}
          <WeeklyProgress data={weeklyData} />

          {/* Recommended Practice */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
              borderRadius: '20px',
              padding: '2rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)'
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💡</div>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  marginBottom: '0.75rem'
                }}
              >
                추천 연습 주제
              </h3>
              <p
                style={{
                  opacity: 0.9,
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}
              >
                자기소개 답변이 약한 편이에요.
                <br />
                오늘은 자기소개 연습을 해보는 건 어떨까요?
              </p>
              <button
                style={{
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
                }}
              >
                지금 연습하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}