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

  const state = location.state as { answers?: AnswerItem[] } | null
  const answersFromLoading = state?.answers ?? []

  // 혹시 직접 URL로 들어온 경우 대비용 fallback
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
    answersFromLoading.length > 0 ? answersFromLoading : fallbackAnswers

  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null)

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
      <ReportTopBar
        onBack={() => navigate(-1)}
        onDownloadPdf={() => {}}
        onRetry={() => {}}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <ReportHeader
          reportId={id}
          totalDurationLabel={totalDurationLabel}
          questionCount={answers.length}
          overallScore={72}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <ScoreCard label="집중도" level={'높음'} icon="🔍" />
          <ScoreCard label="흥미" level={'보통'} icon="💡" />
          <ScoreCard label="이해도" level={'낮음'} icon="🧠" />
          <ScoreCard label="안정감" level={'보통'} icon="🌿" />
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <InsightsSection />
            <AnswersSection
              answers={answers}
              onSelectQuestion={(idx) => setOpenQuestionIndex(idx)}
            />
          </div>

          <div>
            {/* ✅ 여기서 answers는 이미 분석이 끝난 상태 */}
            <FeedbackSidebar answers={answers} />
          </div>
        </div>
      </div>

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
