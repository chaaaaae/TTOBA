// src\pages\QuestionBank.tsx
import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import QuestionCard from '../components/question-bank/QuestionCard'
import PracticeSetCard from '../components/question-bank/PracticeSetCard'
import CategoryFilter from '../components/question-bank/CategoryFilter'
import SearchBar from '../components/question-bank/SearchBar'

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSet, setSelectedSet] = useState<string | null>(null)

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
      category: '자기소개',
      difficulty: 'easy' as const,
      practiced: 12,
      avgScore: 88
    },
    {
      id: 2,
      question: '우리 회사에 지원한 이유는 무엇인가요?',
      category: '지원동기',
      difficulty: 'medium' as const,
      practiced: 8,
      avgScore: 85
    },
    {
      id: 3,
      question: '본인의 가장 큰 강점과 약점은 무엇인가요?',
      category: '강점/약점',
      difficulty: 'medium' as const,
      practiced: 15,
      avgScore: 82
    },
    {
      id: 4,
      question: '팀 프로젝트에서 갈등이 생겼을 때 어떻게 해결했나요?',
      category: '경험',
      difficulty: 'hard' as const,
      practiced: 5,
      avgScore: 78
    },
    {
      id: 5,
      question: 'React의 생명주기에 대해 설명해주세요.',
      category: '기술면접',
      difficulty: 'hard' as const,
      practiced: 3,
      avgScore: 75
    },
    {
      id: 6,
      question: '5년 후 자신의 모습은 어떨 것 같나요?',
      category: '지원동기',
      difficulty: 'medium' as const,
      practiced: 10,
      avgScore: 86
    },
    {
      id: 7,
      question: '가장 자신있는 기술 스택은 무엇인가요?',
      category: '기술면접',
      difficulty: 'medium' as const,
      practiced: 7,
      avgScore: 80
    },
    {
      id: 8,
      question: '지금까지 진행한 프로젝트 중 가장 기억에 남는 것은?',
      category: '경험',
      difficulty: 'medium' as const,
      practiced: 9,
      avgScore: 83
    },
    {
      id: 9,
      question: 'TypeScript를 사용하는 이유는 무엇인가요?',
      category: '기술면접',
      difficulty: 'hard' as const,
      practiced: 4,
      avgScore: 77
    },
    {
      id: 10,
      question: '협업 시 가장 중요하게 생각하는 가치는?',
      category: '경험',
      difficulty: 'easy' as const,
      practiced: 11,
      avgScore: 87
    },
    {
      id: 11,
      question: '본인만의 학습 방법이 있나요?',
      category: '강점/약점',
      difficulty: 'easy' as const,
      practiced: 8,
      avgScore: 85
    },
    {
      id: 12,
      question: '스트레스 상황에서 어떻게 대처하시나요?',
      category: '강점/약점',
      difficulty: 'medium' as const,
      practiced: 6,
      avgScore: 79
    },
    {
      id: 13,
      question: '본인의 커리어 목표는 무엇인가요?',
      category: '지원동기',
      difficulty: 'medium' as const,
      practiced: 9,
      avgScore: 84
    },
    {
      id: 14,
      question: '가장 최근에 배운 기술은 무엇인가요?',
      category: '기술면접',
      difficulty: 'easy' as const,
      practiced: 13,
      avgScore: 88
    },
    {
      id: 15,
      question: '본인의 성격을 한 단어로 표현한다면?',
      category: '자기소개',
      difficulty: 'easy' as const,
      practiced: 14,
      avgScore: 86
    }
  ]

  const practiceSets = [
    {
      id: 'junior-dev',
      title: '신입 개발자 필수',
      description: '신입 개발자가 꼭 준비해야 할 질문들',
      count: 15,
      difficulty: 'medium' as const,
      icon: '💻',
      questionIds: [1, 2, 3, 7, 8, 10, 11, 13, 14, 15, 4, 5, 6, 9, 12]
    },
    {
      id: 'self-intro',
      title: '자기소개 마스터',
      description: '완벽한 자기소개를 위한 집중 연습',
      count: 10,
      difficulty: 'easy' as const,
      icon: '👋',
      questionIds: [1, 15, 3, 11, 12, 2, 13, 6, 10, 8]
    },
    {
      id: 'technical',
      title: '기술 면접 정복',
      description: '심화 기술 질문으로 실력 향상',
      count: 20,
      difficulty: 'hard' as const,
      icon: '🚀',
      questionIds: [5, 7, 9, 14, 4, 8, 10, 3, 11, 12, 1, 2, 6, 13, 15]
    }
  ]

  const handleSearch = () => {
    console.log('검색:', searchQuery)
    // 실제로는 여기서 검색 API 호출
  }

  const handleViewSetDetails = (setId: string) => {
    setSelectedSet(setId)
    // 질문 목록 섹션으로 스크롤
    const questionSection = document.getElementById('questions-section')
    if (questionSection) {
      questionSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClearSetFilter = () => {
    setSelectedSet(null)
  }

  // 선택된 세트에 따라 질문 필터링
  const getFilteredQuestions = () => {
    if (!selectedSet) {
      return questions
    }
    
    const set = practiceSets.find(s => s.id === selectedSet)
    if (!set) {
      return questions
    }
    
    return questions.filter(q => set.questionIds.includes(q.id))
  }

  const filteredQuestions = getFilteredQuestions()
  const selectedSetInfo = practiceSets.find(s => s.id === selectedSet)

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
          질문 뱅크 💬
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          다양한 면접 질문을 연습하고 실력을 향상시키세요
        </p>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {[
          { icon: '📝', label: '전체 질문', value: '156개' },
          { icon: '✅', label: '연습 완료', value: '53개' },
          { icon: '⭐', label: '평균 점수', value: '84점' },
          { icon: '🔥', label: '연속 기록', value: '7일' }
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
              border: '1px solid rgba(31, 60, 136, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem'
              }}
            >
              {stat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)'
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Section */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
          border: '1px solid rgba(31, 60, 136, 0.05)'
        }}
      >
        {/* Search Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="질문을 검색하세요..."
            onSearch={handleSearch}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Practice Sets */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}
        >
          추천 연습 세트 🎯
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}
        >
          {practiceSets.map((set) => (
            <PracticeSetCard
              key={set.id}
              {...set}
              isSelected={selectedSet === set.id}
              onStart={() => alert(`${set.title} 시작!`)}
              onViewDetails={() => handleViewSetDetails(set.id)}
            />
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div id="questions-section">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--text-primary)'
            }}
          >
            {selectedSet ? (
              <>
                {selectedSetInfo?.icon} {selectedSetInfo?.title} 질문 목록
              </>
            ) : (
              '전체 질문 목록'
            )}
          </h2>

          {selectedSet && (
            <button
              onClick={handleClearSetFilter}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: 'var(--primary-blue)',
                border: '2px solid var(--primary-blue)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary-blue)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--primary-blue)'
              }}
            >
              ← 전체 목록 보기
            </button>
          )}
        </div>

        {selectedSet && selectedSetInfo && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid rgba(44, 77, 247, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{selectedSetInfo.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  color: 'var(--primary-blue)',
                  marginBottom: '0.25rem'
                }}>
                  {selectedSetInfo.title}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)' 
                }}>
                  {selectedSetInfo.description} • {filteredQuestions.length}개 질문
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              {...q}
              onPractice={() => alert(`${q.question} 연습 시작!`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}