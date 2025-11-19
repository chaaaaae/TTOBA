// src/pages/QuestionBank.tsx
import { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import QuestionCard from '../components/question-bank/QuestionCard'
import PracticeSetCard from '../components/question-bank/PracticeSetCard'
import CategoryFilter from '../components/question-bank/CategoryFilter'
import SearchBar from '../components/question-bank/SearchBar'

import {
  ALL_QUESTIONS,
  CATEGORIES_WITH_COUNT,
  CATEGORY_LABEL_MAP,
  type QuestionCategoryId
} from '../data/questionBank'

const PAGE_SIZE = 20

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<'all' | QuestionCategoryId>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // 추천 세트는 일단 기존 더미 그대로 사용
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

  // 🔎 검색 + 카테고리 필터 적용된 전체 질문 리스트
  const filteredQuestions = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return ALL_QUESTIONS.filter((q) => {
      const matchCategory =
        selectedCategory === 'all' || q.categoryId === selectedCategory

      const matchSearch =
        keyword === '' || q.text.toLowerCase().includes(keyword)

      return matchCategory && matchSearch
    })
  }, [searchQuery, selectedCategory])

  // 🔄 검색어나 카테고리가 바뀌면 페이지를 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // 📄 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE))

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return filteredQuestions.slice(startIndex, endIndex)
  }, [filteredQuestions, currentPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
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
          { icon: '📝', label: '전체 질문', value: `${ALL_QUESTIONS.length}개` },
          { icon: '✅', label: '연습 완료', value: '53개' }, // 더미
          { icon: '⭐', label: '평균 점수', value: '84점' }, // 더미
          { icon: '🔥', label: '연속 기록', value: '7일' } // 더미
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
                background:
                  'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
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
              <div
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
              >
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
          categories={CATEGORIES_WITH_COUNT}
          selected={selectedCategory}
          onChange={(id) => setSelectedCategory(id as 'all' | QuestionCategoryId)}
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
          {paginatedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q.text}
              category={CATEGORY_LABEL_MAP[q.categoryId]}
              difficulty={q.difficulty}
              practiced={q.practiced}
              avgScore={q.avgScore}
              onPractice={() => alert(`${q.text} 연습 시작!`)}
              onViewDetails={() => alert(`${q.text} 상세보기`)}
            />
          ))}

          {filteredQuestions.length === 0 && (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              조건에 맞는 질문이 없습니다.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredQuestions.length > 0 && (
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--primary-blue)',
                background: currentPage === 1 ? '#f3f4f6' : 'white',
                color:
                  currentPage === 1
                    ? 'var(--text-secondary)'
                    : 'var(--primary-blue)',
                cursor: currentPage === 1 ? 'default' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              이전
            </button>

            <span
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
              }}
            >
              {currentPage} / {totalPages} 페이지
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--primary-blue)',
                background: currentPage === totalPages ? '#f3f4f6' : 'white',
                color:
                  currentPage === totalPages
                    ? 'var(--text-secondary)'
                    : 'var(--primary-blue)',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
