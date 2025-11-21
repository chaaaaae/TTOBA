// src/pages/Report.tsx
import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import ScoreCard from '../components/report/ScoreCard'
import InsightCard from '../components/report/InsightCard'
import AnswerCard from '../components/report/AnswerCard'
import FeedbackSection from '../components/report/FeedbackSection'
import RightDrawer from '../components/report/RightDrawer'

// 초 → "X분 Y초" 포맷
const formatDurationKo = (seconds: number): string => {
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60

  if (m > 0) {
    return s > 0 ? `${m}분 ${s}초` : `${m}분`
  }
  return `${s}초`
}

// 📌 Interview에서 넘어오는 답변 타입
type AnswerItem = {
  questionNumber: number
  question: string
  answer: string
  score?: number
  duration?: string
  durationSeconds?: number
  videoUrl?: string
}

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // 🔹 Interview에서 navigate로 넘긴 state
  const state = location.state as { answers?: AnswerItem[] } | null
  const answersFromInterview = state?.answers ?? []

  // 어떤 질문의 상세피드백을 보고 있는지 (인덱스)
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null)

  const insights = [
    {
      type: 'positive' as const,
      icon: '✅',
      title: '명확한 답변 구조',
      description: 'STAR 기법을 활용하여 체계적으로 답변하셨습니다.'
    },
    {
      type: 'positive' as const,
      icon: '🎯',
      title: '구체적인 사례 제시',
      description: '실제 경험을 바탕으로 한 구체적인 답변이 돋보였습니다.'
    },
    {
      type: 'neutral' as const,
      icon: '⚡',
      title: '말하기 속도 조절',
      description: '평소보다 15% 빠른 속도로 답변하셨어요.'
    }
  ]

  // ✅ Interview에서 넘어온 답변이 있으면 그것을 사용
  //    없으면 기존 더미 데이터를 fallback으로 사용
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

  // 🔥 전체 면접 시간 (모든 질문 durationSeconds 합산)
  const totalDurationSeconds = answers.reduce(
    (sum, a) => sum + (a.durationSeconds ?? 0),
    0
  )
  const totalDurationLabel =
    totalDurationSeconds > 0 ? formatDurationKo(totalDurationSeconds) : '—분'

  const feedbacks = [
    {
      type: 'strength' as const,
      icon: '💪',
      title: '강점',
      items: ['명확한 전달력', '풍부한 예시', '자신감 있는 태도']
    },
    {
      type: 'improvement' as const,
      icon: '📈',
      title: '개선점',
      items: ['말하기 속도 조절', '필러 워드 줄이기', '시선 처리']
    },
    {
      type: 'suggestion' as const,
      icon: '💡',
      title: '제안사항',
      items: ['STAR 기법 활용', '구체적 수치 제시', '결론 먼저 말하기']
    }
  ]

  const currentAnswer =
    openQuestionIndex !== null ? answers[openQuestionIndex] : null

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(20px)'
        }}
      >
        <div
          style={{
            maxWidth: '1800px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: '600',
              background: 'transparent',
              border: 'none',
              fontSize: '1rem'
            }}
          >
            ← 뒤로가기
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'transparent',
                color: 'var(--primary-blue)',
                border: '2px solid var(--primary-blue)',
                fontSize: '0.9rem'
              }}
            >
              PDF 다운로드
            </button>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background:
                  'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                color: 'white',
                border: 'none',
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
              }}
            >
              다시 연습하기
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Report Header */}
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '500px',
              height: '500px',
              background:
                'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '0.75rem'
                }}
              >
                면접 리포트 #{id}
              </h1>
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1.05rem'
                }}
              >
                <span>📅 2024.03.15</span>
                {/* 🔥 전체 면접 시간 */}
                <span>⏱️ {totalDurationLabel}</span>
                <span>💬 {answers.length}개 질문</span>
              </div>
            </div>

            <div
              style={{
                width: '160px',
                height: '160px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1 }}>
                92
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9, marginTop: '0.5rem' }}>
                종합 점수
              </div>
            </div>
          </div>
        </div>

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
            {/* Key Insights */}
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem'
                }}
              >
                핵심 인사이트 💡
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {insights.map((insight, idx) => (
                  <InsightCard key={idx} {...insight} />
                ))}
              </div>
            </div>

            {/* Answers */}
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem'
                }}
              >
                답변 내역 📝
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {answers.map((answer, idx) => (
                  <AnswerCard
                    key={idx}
                    questionNumber={answer.questionNumber}
                    question={answer.question}
                    answer={answer.answer}
                    score={answer.score ?? 0}
                    duration={answer.duration ?? ''}
                    onViewFeedback={() => setOpenQuestionIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Feedback */}
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

            <FeedbackSection feedbacks={feedbacks} />

            {/* Share Button */}
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
        </div>
      </div>

      {/* 🔽 오른쪽 상세 피드백 패널 */}
      <RightDrawer
        isOpen={openQuestionIndex !== null}
        onClose={() => setOpenQuestionIndex(null)}
      >
        <div className="flex h-full flex-col">
          {/* 상단 헤더 */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400">
                상세 피드백
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Q{currentAnswer?.questionNumber ?? ''}
              </span>
            </div>
            <button
              onClick={() => setOpenQuestionIndex(null)}
              className="text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          {/* 내용 영역 */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {currentAnswer && (
              <div className="flex flex-col gap-4">
                {/* 질문 & 텍스트 답변 */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400">질문</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {currentAnswer.question}
                  </div>

                  <div className="mt-4 text-xs font-semibold text-slate-400">
                    나의 답변
                  </div>
                  <div className="whitespace-pre-wrap text-sm text-slate-800">
                    {currentAnswer.answer || '답변 내용이 없습니다.'}
                  </div>
                </div>

                {/* 🔥 질문별 답변 영상 */}
                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-400">
                    답변 영상
                  </div>
                  {currentAnswer.videoUrl ? (
                    <video
                      src={currentAnswer.videoUrl}
                      controls
                      className="mt-2 w-full rounded-lg border border-slate-200"
                    />
                  ) : (
                    <div className="mt-2 text-xs text-slate-400">
                      이 질문에 대해 저장된 영상이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </RightDrawer>
    </div>
  )
}
