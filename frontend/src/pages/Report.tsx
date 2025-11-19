// src/pages/Report.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ScoreCard from '../components/report/ScoreCard'
import InsightCard from '../components/report/InsightCard'
import AnswerCard from '../components/report/AnswerCard'
import FeedbackSection from '../components/report/FeedbackSection'
import RightDrawer from '../components/report/RightDrawer'

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const answers = [
    {
      questionNumber: 1,
      question: '간단하게 자기소개를 해주세요.',
      answer: '안녕하세요. 프론트엔드 개발자를 희망하는 김지훈입니다...',
      score: 95,
      duration: '2분 30초'
    },
    {
      questionNumber: 2,
      question: '우리 회사에 지원한 이유는 무엇인가요?',
      answer: '귀사의 혁신적인 기술 문화와 사용자 중심의 개발 철학에...',
      score: 88,
      duration: '3분 10초'
    }
  ]

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
            background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
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
                <span>⏱️ 25분</span>
                <span>💬 8개 질문</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
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
                    {...answer}
                    // 🔽 여기서 상세 피드백 버튼 → 오른쪽 패널 열기
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

      {/* 🔽 오른쪽 흰 패널 (지금은 내용 비워둠) */}
      <RightDrawer
        isOpen={openQuestionIndex !== null}
        onClose={() => setOpenQuestionIndex(null)}
      >
        {/* 여기부터 패널 안 내용 (대충 예쁜 틀만) */}
        <div className="flex h-full flex-col">
          {/* 상단 헤더 */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400">
                상세 피드백
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Q{openQuestionIndex !== null ? answers[openQuestionIndex].questionNumber : ''}
              </span>
            </div>
            <button
              onClick={() => setOpenQuestionIndex(null)}
              className="text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          {/* 내용 영역 (지금은 빈 상태여도 OK) */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* 나중에 여기다가 실제 상세 결과 넣으면 됨 */}
          </div>
        </div>
      </RightDrawer>

    </div>
  )
}
