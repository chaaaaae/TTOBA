// src/pages/QuestionBank.tsx
import { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import QuestionCard from '../components/question-bank/QuestionCard'
import PracticeSetCard from '../components/question-bank/PracticeSetCard'
import CategoryFilter from '../components/question-bank/CategoryFilter'
import SearchBar from '../components/question-bank/SearchBar'
import { useNavigate } from 'react-router-dom'

import {
  ALL_QUESTIONS,
  CATEGORIES_WITH_COUNT,
  CATEGORY_LABEL_MAP,
  type QuestionCategoryId
} from '../data/questionBank'

import { PRACTICE_SETS } from '../data/practiceSets'

const PAGE_SIZE = 20

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<'all' | QuestionCategoryId>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // 🔥 어떤 연습 세트를 상세보기로 보고 있는지
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSearch = () => {
    console.log('검색:', searchQuery)
  }

  // ✅ 선택된 세트 정보
  const selectedSet = useMemo(
    () => PRACTICE_SETS.find((s) => s.id === selectedSetId) ?? null,
    [selectedSetId]
  )

  // 🔎 검색 + 카테고리 + 세트 필터 적용된 전체 질문 리스트
  const filteredQuestions = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()
    const setQuestionIdSet = selectedSet
      ? new Set(selectedSet.questions) // 세트에 포함된 질문 id들
      : null

    return ALL_QUESTIONS.filter((q) => {
      const matchCategory =
        selectedCategory === 'all' || q.categoryId === selectedCategory

      const matchSearch =
        keyword === '' || q.text.toLowerCase().includes(keyword)

      const matchSet =
        !setQuestionIdSet || setQuestionIdSet.has(q.id) // 세트 선택 시 그 세트에 포함된 질문만

      return matchCategory && matchSearch && matchSet
    })
  }, [searchQuery, selectedCategory, selectedSet])

  // 🔄 검색/카테고리/세트가 바뀌면 페이지를 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedSetId])

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

  // ⭐ 세트 상세보기 눌렀을 때: 세트 선택 + 질문 섹션으로 스크롤
  const handleViewSetDetails = (setId: string) => {
    setSelectedSetId(setId)
    const questionSection = document.getElementById('questions-section')
    if (questionSection) {
      questionSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClearSetFilter = () => {
    setSelectedSetId(null)
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
          {PRACTICE_SETS.map((set) => (
            <PracticeSetCard
              key={set.id}
              title={set.title}
              description={set.description}
              count={set.count}
              difficulty={set.difficulty}
              icon={set.icon}
              isSelected={selectedSetId === set.id}
              // 🔥 "시작하기" 눌렀을 때 인터뷰 페이지로 이동 + 세트 정보/질문 id 전달
              onStart={() =>
                navigate('/interview', {
                  state: {
                    mode: 'practice_set',
                    setId: set.id,
                    setTitle: set.title,
                    setIcon: set.icon,
                    questionIds: set.questions // ← 이 배열 순서대로 질문 진행
                  }
                })
              }
              onViewDetails={() => handleViewSetDetails(set.id)}
            />
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div id="questions-section">
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
            {selectedSet ? (
              <>
                {selectedSet.icon} {selectedSet.title} 질문 목록
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

        {/* 세트 설명 박스 */}
        {selectedSet && (
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              border: '2px solid rgba(44, 77, 247, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{selectedSet.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--primary-blue)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {selectedSet.title}
                </div>
                <div
                  style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}
                >
                  {selectedSet.description} • {filteredQuestions.length}개 질문
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 질문 카드 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {paginatedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q.text}
              category={CATEGORY_LABEL_MAP[q.categoryId]}
              difficulty={q.difficulty}
              practiced={q.practiced}
              avgScore={q.avgScore}
              // 🔥 상세보기 제거하고 연습하기만 남김
              onPractice={() => alert(`${q.text} 연습 시작!`)}
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
                background:
                  currentPage === totalPages ? '#f3f4f6' : 'white',
                color:
                  currentPage === totalPages
                    ? 'var(--text-secondary)'
                    : 'var(--primary-blue)',
                cursor:
                  currentPage === totalPages ? 'default' : 'pointer',
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
