// src/components/report/FeedbackSidebar.tsx

import React, { useEffect, useMemo, useState } from 'react'
import FeedbackSection from './FeedbackSection'
import type { AnswerItem } from '../../types/report'

type OverallFeedback = {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

interface FeedbackSidebarProps {
  answers: AnswerItem[]
}

export default function FeedbackSidebar({ answers }: FeedbackSidebarProps) {
  const [overall, setOverall] = useState<OverallFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const validItems = answers.filter(
      (a) => a.aiAnswerSummary && (a.aiScore != null || a.score != null)
    )

    if (validItems.length === 0) {
      setOverall(null)
      return
    }

    const payload = {
      items: validItems.map((a) => ({
        question_id: a.questionNumber,
        answer_summary: a.aiAnswerSummary as string,
        score: a.aiScore ?? a.score ?? null
      }))
    }

    setLoading(true)
    setError(null)

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

    fetch(`${API_BASE_URL}/api/analyze-overall`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || '전체 피드백 요청 실패')
        }
        return res.json()
      })
      .then((data: OverallFeedback) => {
        setOverall(data)
      })
      .catch((err) => {
        console.error('analyze-overall error:', err)
        setError('전체 피드백 분석 중 오류가 발생했어요.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [answers])

  const feedbacks = useMemo(() => {
    if (!overall) return []

    return [
      {
        type: 'strength' as const,
        icon: '💪',
        title: '강점',
        items: overall.strengths ?? []
      },
      {
        type: 'improvement' as const,
        icon: '📈',
        title: '개선점',
        items: overall.weaknesses ?? []
      },
      {
        type: 'suggestion' as const,
        icon: '💡',
        title: '제안사항',
        items: overall.recommendations ?? []
      }
    ]
  }, [overall])

  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}
      >
        개선 포인트 🎯
      </h2>

      {loading && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          전체 답변을 분석해서 강점/개선 포인트를 정리하는 중이에요...
        </p>
      )}

      {error && (
        <p style={{ fontSize: '0.9rem', color: '#e11d48' }}>
          {error}
        </p>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <FeedbackSection feedbacks={feedbacks} />
      )}

      {!loading && !error && feedbacks.length === 0 && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          분석 가능한 요약/점수가 없어서 전체 피드백을 만들 수 없어요.
        </p>
      )}

      <button
        style={{
          width: '100%',
          padding: '1rem',
          marginTop: '1.5rem',
          background:
            'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
          transition: 'all 0.3s'
        }}
      >
        리포트 공유하기 📤
      </button>
    </div>
  )
}