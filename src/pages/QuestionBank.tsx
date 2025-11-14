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
    }
  ]

  const practiceSets = [
    {
      title: '신입 개발자 필수',
      description: '신입 개발자가 꼭 준비해야 할 질문들',
      count: 15,
      difficulty: 'medium' as const,
      icon: '💻'
    },
    {
      title: '자기소개 마스터',
      description: '완벽한 자기소개를 위한 집중 연습',
      count: 10,
      difficulty: 'easy' as const,
      icon: '👋'
    },
    {
      title: '기술 면접 정복',
      description: '심화 기술 질문으로 실력 향상',
      count: 20,
      difficulty: 'hard' as const,
      icon: '🚀'
    }
  ]

  const handleSearch = () => {
    console.log('검색:', searchQuery)
    // 실제로는 여기서 검색 API 호출
  }

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
          {practiceSets.map((set, idx) => (
            <PracticeSetCard
              key={idx}
              {...set}
              onStart={() => alert(`${set.title} 시작!`)}
            />
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}
        >
          전체 질문 목록
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              {...q}
              onPractice={() => alert(`${q.question} 연습 시작!`)}
              onViewDetails={() => alert(`${q.question} 상세보기`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}