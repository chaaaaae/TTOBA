// src/pages/ReportLoading.tsx
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import type { AnswerItem } from '../types/report'
import { API_BASE_URL } from '../lib/utils'

export default function ReportLoading() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as { answers?: AnswerItem[] } | null
  const baseAnswers = state?.answers ?? []

  useEffect(() => {
    // 답변이 없으면 그냥 리포트로 보내거나, 에러 페이지로 보내도 됨
    if (!baseAnswers || baseAnswers.length === 0) {
      // 일단은 fallback으로 그냥 리포트로 이동
      navigate(`/report/${id}`, { replace: true })
      return
    }

    const controller = new AbortController()

    const run = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/analyze-answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: baseAnswers }),
          signal: controller.signal
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

        // ✅ 분석 완료 → Report 페이지로 이동 + 결과 전달
        navigate(`/report/${id}`, {
          replace: true,
          state: { answers: merged }
        })
        } catch (err: any) {
        // ⛔ 이건 React StrictMode나 페이지 이동 등으로 인한 정상적인 abort
        if (err.name === 'AbortError') {
            console.log('⛔ analyze fetch aborted (정상 상황):', err)
            return
        }

        console.error('🔥 analyze exception:', err)
        alert('답변 분석 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
        navigate('/', { replace: true })
        }
    }

    run()

    return () => {
      controller.abort()
    }
  }, [baseAnswers, id, navigate])

  // ✅ 화면에는 "로딩 중" 페이지 예쁘게 띄워주기
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: 'var(--bg-light)',
        color: 'var(--text-primary)'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI가 리포트를 분석 중이에요 🔍</div>
      <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '360px', textAlign: 'center' }}>
        방금 진행한 면접 답변들을 정리하고, 요약과 강점/개선 포인트를 계산하고 있어요.
        잠시만 기다려 주세요.
      </div>
      {/* 필요하면 로딩 스피너 SVG나 애니메이션도 넣어도 됨 */}
    </div>
  )
}