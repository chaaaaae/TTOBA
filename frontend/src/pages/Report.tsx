// src/pages/Report.tsx
import { useState, useEffect } from 'react'
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
  const answersFromInterview = state?.answers ?? []

  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null)

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

  const baseAnswers: AnswerItem[] =
    answersFromInterview.length > 0 ? answersFromInterview : fallbackAnswers

  const [answersWithAnalysis, setAnswersWithAnalysis] =
    useState<AnswerItem[]>(baseAnswers)

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  // ✅ 처음 마운트될 때 한 번만 실행
  useEffect(() => {
    if (!baseAnswers || baseAnswers.length === 0) return

    const controller = new AbortController()

    const run = async () => {
      try {
        setIsAnalyzing(true)
        setAnalyzeError(null)

        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

        const res = await fetch(`${API_BASE_URL}/api/analyze-answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: baseAnswers })
        })

        console.log('📡 /api/analyze-answer status:', res.status)

        if (!res.ok) {
          let message = '분석 요청에 실패했습니다.'
          try {
            const errBody = await res.json()
            console.log('❌ analyze-error body:', errBody)
            if (errBody?.detail) {
              message = `분석 요청 실패: ${errBody.detail}`
            }
          } catch {
            // ignore
          }
          throw new Error(message)
        }

        const data = await res.json()
        console.log('✅ analyze response:', data)

        const items = (data.items ?? []) as any[]

        const byQuestionId: Record<number, any> = {}
        for (const item of items) {
          if (typeof item.question_id === 'number') {
            byQuestionId[item.question_id] = item
          }
        }

        const merged = baseAnswers.map((ans) => {
          const analysis = byQuestionId[ans.questionNumber]
          if (!analysis || analysis.parse_error) return ans

          return {
            ...ans,
            aiScore: analysis.score,
            aiAnswerSummary: analysis.answer_summary,
            aiStrengths: analysis.strengths,
            aiImprovements: analysis.improvements,
            aiSuggestions: analysis.suggestions,
            aiRewrittenAnswer: analysis.rewritten_answer,
            aiStructure: analysis.structure,
            aiRecommendedStructure: analysis.recommended_structure
          } as AnswerItem
        })

        console.log('🧩 merged answers:', merged)
        setAnswersWithAnalysis(merged)
      } catch (err: any) {
        console.error('🔥 analyze exception:', err)
        setAnalyzeError(err.message ?? '알 수 없는 오류가 발생했습니다.')
      } finally {
        setIsAnalyzing(false)
      }
    }

    run()

    return () => {
      controller.abort()
    }
    // ⛔ 의존성에 baseAnswers 넣지 말 것! 무한루프 남
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ← 빈 배열

  const totalDurationSeconds = answersWithAnalysis.reduce(
    (sum, a) => sum + (a.durationSeconds ?? 0),
    0
  )
  const totalDurationLabel =
    totalDurationSeconds > 0 ? formatDurationKo(totalDurationSeconds) : '—분'

  const currentAnswer =
    openQuestionIndex !== null ? answersWithAnalysis[openQuestionIndex] : null

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      <ReportTopBar
        onBack={() => navigate(-1)}
        onDownloadPdf={() => {}}
        onRetry={() => {}}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* 🔍 분석 로딩/에러 상태 표시 */}
        {isAnalyzing && (
          <div className="mb-3 text-sm text-slate-500">
            이 답변들에 대한 AI 분석을 생성 중입니다...
          </div>
        )}
        {analyzeError && (
          <div className="mb-3 text-sm text-red-500">{analyzeError}</div>
        )}

        <ReportHeader
          reportId={id}
          totalDurationLabel={totalDurationLabel}
          questionCount={answersWithAnalysis.length}
          overallScore={92}
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
              answers={answersWithAnalysis}
              onSelectQuestion={(idx) => setOpenQuestionIndex(idx)}
            />
          </div>

          <div>
            {/* ✅ 여기만 변경! 전체 분석용 answers 전달 */}
            <FeedbackSidebar answers={answersWithAnalysis} />
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
