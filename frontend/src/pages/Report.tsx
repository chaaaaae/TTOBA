// src/pages/Report.tsx
import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import ScoreCard from '../components/report/ScoreCard'
import RightDrawer from '../components/report/RightDrawer'

import ReportTopBar from '../components/report/ReportTopBar'
import ReportHeader from '../components/report/ReportHeader'
import InsightsSection from '../components/report/InsightsSection'
import AnswersSection from '../components/report/AnswersSection'
import FeedbackSidebar from '../components/report/FeedbackSidebar'
import RightDrawerContent from '../components/report/RightDrawerContent'

import { formatDurationKo } from '../utils/formatDuration'
import type { AnswerItem } from '../types/report'

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Interview에서 navigate로 넘긴 state
  const state = location.state as { answers?: AnswerItem[] } | null
  const answersFromInterview = state?.answers ?? []

  // 어떤 질문의 상세피드백을 보고 있는지 (인덱스)
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  )

  // Interview에서 넘어온 답변이 있으면 그것을 사용, 없으면 더미 데이터 사용
  const fallbackAnswers: AnswerItem[] = [
    {
      questionNumber: 1,
      question: '간단하게 자기소개를 해주세요.',
      answer: '안녕하세요. 프론트엔드 개발자를 희망하는 김지훈입니다...',
      score: 95,
      duration: '2분 30초',
      durationSeconds: 150
    },
    {
      questionNumber: 2,
      question: '우리 회사에 지원한 이유는 무엇인가요?',
      answer: '귀사의 혁신적인 기술 문화와 사용자 중심의 개발 철학에...',
      score: 88,
      duration: '3분 10초',
      durationSeconds: 190
    }
  ]

  const answers: AnswerItem[] =
    answersFromInterview.length > 0 ? answersFromInterview : fallbackAnswers

  // 전체 면접 시간 (모든 질문 durationSeconds 합산)
  const totalDurationSeconds = answers.reduce(
    (sum, a) => sum + (a.durationSeconds ?? 0),
    0
  )
  const totalDurationLabel =
    totalDurationSeconds > 0 ? formatDurationKo(totalDurationSeconds) : '—분'

  const currentAnswer =
    openQuestionIndex !== null ? answers[openQuestionIndex] : null

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
      <ReportTopBar
        onBack={() => navigate(-1)}
        // TODO: 필요하면 나중에 핸들러 연결
        onDownloadPdf={() => {
          /* 구현 예정 */
        }}
        onRetry={() => {
          /* 구현 예정 */
        }}
      />

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Report Header */}
        <ReportHeader
          reportId={id}
          totalDurationLabel={totalDurationLabel}
          questionCount={answers.length}
          overallScore={92}
        />

        {/* Score Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <ScoreCard label="내용" score={90} icon="📝" />
          <ScoreCard label="전달력" score={88} icon="🎤" />
          <ScoreCard label="자신감" score={95} icon="💪" />
          <ScoreCard label="명확성" score={92} icon="💡" />
        </div>

        {/* Main Content Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <InsightsSection />
            <AnswersSection
              answers={answers}
              onSelectQuestion={(idx) => setOpenQuestionIndex(idx)}
            />
          </div>

          {/* Right Column */}
          <div>
            <FeedbackSidebar />
          </div>
        </div>
      </div>

      {/* 오른쪽 상세 피드백 패널 */}
      <RightDrawer
        isOpen={openQuestionIndex !== null}
        onClose={() => setOpenQuestionIndex(null)}
      >
        <RightDrawerContent
          currentAnswer={currentAnswer}
          onClose={() => setOpenQuestionIndex(null)}
        />
      </RightDrawer>
    </div>
  )
}
