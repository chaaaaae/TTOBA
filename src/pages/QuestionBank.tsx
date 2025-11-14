import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = [
    { id: 'all', name: '전체', count: 156 },
    { id: 'introduce', name: '자기소개', count: 28 },
    { id: 'motivation', name: '지원동기', count: 32 },
    { id: 'strength', name: '강점/약점', count: 24 },
    { id: 'experience', name: '경험', count: 36 },
    { id: 'technical', name: '기술면접', count: 36 }
  ]

  const questions = [
    {
      id: 1,
      question: '간단하게 자기소개를 해주세요.',
      category: 'introduce',
      difficulty: 'easy',
      practiced: 12,
      avgScore: 88
    },
    {
      id: 2,
      question: '우리 회사에 지원한 이유는 무엇인가요?',
      category: 'motivation',
      difficulty: 'medium',
      practiced: 8,
      avgScore: 85
    },
    {
      id: 3,
      question: '본인의 가장 큰 강점과 약점은 무엇인가요?',
      category: 'strength',
      difficulty: 'medium',
      practiced: 15,
      avgScore: 82
    },
    {
      id: 4,
      question: '팀 프로젝트에서 갈등이 생겼을 때 어떻게 해결했나요?',
      category: 'experience',
      difficulty: 'hard',
      practiced: 5,
      avgScore: 78
    },
    {
      id: 5,
      question: 'React의 생명주기에 대해 설명해주세요.',
      category: 'technical',
      difficulty: 'hard',
      practiced: 3,
      avgScore: 75
    },
    {
      id: 6,
      question: '5년 후 자신의 모습은 어떨 것 같나요?',
      category: 'motivation',
      difficulty: 'medium',
      practiced: 10,
      avgScore: 86
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'var(--success)'
      case 'medium': return 'var(--warning)'
      case 'hard': return 'var(--danger)'
      default: return 'var(--text-secondary)'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움'
      case 'medium': return '보통'
      case 'hard': return '어려움'
      default: return ''
    }
  }

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
          질문 뱅크 💬
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          다양한 면접 질문을 연습하고 실력을 향상시키세요
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          { icon: '📝', label: '전체 질문', value: '156개' },
          { icon: '✅', label: '연습 완료', value: '53개' },
          { icon: '⭐', label: '평균 점수', value: '84점' },
          { icon: '🔥', label: '연속 기록', value: '7일' }
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
            border: '1px solid rgba(31, 60, 136, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem'
            }}>
              {stat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--text-primary)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Section */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: '1px solid rgba(31, 60, 136, 0.05)'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="질문을 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem 1rem 3.5rem',
              border: '2px solid rgba(31, 60, 136, 0.1)',
              borderRadius: '12px',
              fontSize: '1rem',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'/%3E%3Cpath d=\'m21 21-4.35-4.35\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '1.25rem center',
              transition: 'all 0.3s'
            }}
          />
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                background: selectedCategory === category.id
                  ? 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))'
                  : 'transparent',
                color: selectedCategory === category.id
                  ? 'white'
                  : 'var(--text-secondary)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.95rem'
              }}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Practice Sets */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}>
          추천 연습 세트 🎯
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {[
            {
              title: '신입 개발자 필수',
              description: '신입 개발자가 꼭 준비해야 할 질문들',
              count: 15,
              difficulty: 'medium',
              icon: '💻'
            },
            {
              title: '자기소개 마스터',
              description: '완벽한 자기소개를 위한 집중 연습',
              count: 10,
              difficulty: 'easy',
              icon: '👋'
            },
            {
              title: '기술 면접 정복',
              description: '심화 기술 질문으로 실력 향상',
              count: 20,
              difficulty: 'hard',
              icon: '🚀'
            }
          ].map((set, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
              border: '1px solid rgba(31, 60, 136, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {set.icon}
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                {set.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {set.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  <span>📝 {set.count}개</span>
                  <span style={{ color: getDifficultyColor(set.difficulty) }}>
                    ⚡ {getDifficultyLabel(set.difficulty)}
                  </span>
                </div>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}>
                  시작하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}>
          전체 질문 목록
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {questions.map((q) => (
            <div key={q.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
              border: '1px solid rgba(31, 60, 136, 0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(44, 77, 247, 0.1)',
                    color: 'var(--primary-blue)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {categories.find(c => c.id === q.category)?.name}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: `${getDifficultyColor(q.difficulty)}20`,
                    color: getDifficultyColor(q.difficulty),
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {getDifficultyLabel(q.difficulty)}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {q.question}
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem'
                }}>
                  <span>📝 {q.practiced}회 연습</span>
                  <span>⭐ 평균 {q.avgScore}점</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--primary-blue)',
                  border: '2px solid var(--primary-blue)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}>
                  상세보기
                </button>
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
                  연습하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}