// src/pages/Report.tsx
import { useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const totalDurationSeconds = answers.reduce(
    (sum, a) => sum + (a.durationSeconds ?? 0),
    0
  )
  const totalDurationLabel =
    totalDurationSeconds > 0 ? formatDurationKo(totalDurationSeconds) : '—분'

  // ✅ 동적 종합 점수 계산: 각 답변의 aiScore 평균을 반올림하여 정수로 표시
  const overallScore = (() => {
    const validScores = answers
      .map(a => a.aiScore)
      .filter((s): s is number => typeof s === 'number' && !isNaN(s))
    
    if (validScores.length === 0) return 0
    
    const sum = validScores.reduce((acc, s) => acc + s, 0)
    const average = sum / validScores.length
    
    // 소수 첫째자리에서 반올림하여 정수로 반환
    return Math.round(average)
  })()

  const currentAnswer =
    openQuestionIndex !== null ? answers[openQuestionIndex] : null

  // ✅ PDF 다운로드 함수
  const handleDownloadPdf = async () => {
    if (!reportRef.current) return

    try {
      setIsGeneratingPdf(true)

      // 잠시 대기하여 로딩 상태가 UI에 반영되도록 함
      await new Promise(resolve => setTimeout(resolve, 100))

      // HTML을 캔버스로 캡처
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // 고해상도
        useCORS: true,
        logging: false,
        backgroundColor: '#f8f9fc'
      })

      // PDF 생성
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // 여러 페이지로 분할
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297 // A4 height in mm

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      // 파일명 생성 (날짜 + reportId)
      const date = new Date().toISOString().split('T')[0]
      const fileName = `TTOBA_면접리포트_${id || 'report'}_${date}.pdf`

      // PDF 다운로드
      pdf.save(fileName)
    } catch (error) {
      console.error('PDF 생성 중 오류:', error)
      alert('PDF 생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      <ReportTopBar
        onBack={() => navigate(-1)}
        onDownloadPdf={handleDownloadPdf}
        onRetry={() => navigate('/questions')}
      />

      <div ref={reportRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <ReportHeader
          reportId={id}
          totalDurationLabel={totalDurationLabel}
          questionCount={answers.length}
          overallScore={overallScore}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <ScoreCard label="집중도" level={'높음'} icon="🔥" />
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
            <FeedbackSidebar answers={answers} />
          </div>
        </div>
      </div>

      {/* PDF 생성 중 로딩 오버레이 */}
      {isGeneratingPdf && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem 3rem',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid var(--primary-blue)',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 1s linear infinite'
              }}
            />
            <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              PDF를 생성하고 있습니다...
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              잠시만 기다려주세요
            </p>
          </div>
        </div>
      )}

      <RightDrawer
        isOpen={openQuestionIndex !== null}
        onClose={() => setOpenQuestionIndex(null)}
      >
        <RightDrawerContent
          currentAnswer={currentAnswer}
          onClose={() => setOpenQuestionIndex(null)}
        />
      </RightDrawer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}