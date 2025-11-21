// src/pages/Interview.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import InterviewHUD from '../components/interview/InterviewHUD'
import CameraView from '../components/interview/CameraView'
import ChatPanel from '../components/interview/ChatPanel'
import ControlBar from '../components/interview/ControlBar'
import { ALL_QUESTIONS } from '../data/questionBank'

// 🔊 STT 상태 타입
type SttState = 'idle' | 'starting' | 'recording' | 'transcribing'

// QuestionBank에서 넘어오는 state 타입
type InterviewLocationState = {
  mode?: 'practice_set'
  setId?: string
  setTitle?: string
  setIcon?: string
  questionIds?: string[] // PRACTICE_SETS 안의 questions 배열
}

// 채팅 메시지 타입
type Message = {
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

export default function Interview() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state || {}) as InterviewLocationState

  // 🔹 넘어온 questionIds 기준으로 질문 배열 구성
  const questionsFromSet =
    state.questionIds && state.questionIds.length > 0
      ? ALL_QUESTIONS.filter((q) => state.questionIds!.includes(q.id))
      : ALL_QUESTIONS.slice(0, 8) // 혹시 없으면 기본 8개 사용

  // 실제 인터뷰에서 사용할 질문들
  const [questions] = useState(questionsFromSet)
  const [totalQuestions] = useState(questionsFromSet.length || 1)

  // 🔥 아직 질문 시작 전 → -1
  // 0부터는 Q1, Q2, ... 의미
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)

  const [isRecording, setIsRecording] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)

  // ✅ 모든 질문이 끝났는지 여부
  const [isFinished, setIsFinished] = useState(false)

  // 🔥 초기 메시지는 인사만
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: '안녕하세요! 면접을 시작하겠습니다. 준비되셨나요?',
      timestamp: new Date()
    }
  ])

  // 🎤 STT 관련 상태
  const [voiceText, setVoiceText] = useState('')
  const [sttState, setSttState] = useState<SttState>('idle')

  // Timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  // ✅ 모든 질문 끝나면 자동으로 리포트 페이지로 이동
  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        navigate('/report/1')
      }, 2000) // "모든 질문이 종료되었습니다." 멘트 보여줄 시간 조금 줌

      return () => clearTimeout(timer)
    }
  }, [isFinished, navigate])

  // 🔥 사용자가 텍스트로 답변 보냈을 때
  const handleSendMessage = (message: string) => {
    // 1) 사용자 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        content: message,
        timestamp: new Date()
      }
    ])

    // 2) AI 응답 + 질문 진행
    setTimeout(() => {
      setCurrentQuestionIndex((prevIdx) => {
        // ✅ 아직 질문 시작 전 (-1) → 첫 번째 질문만 던지기
        if (prevIdx < 0) {
          if (questions.length === 0) {
            const firstContent = '질문이 설정되지 않았습니다.'
            setMessages((prev) => {
              const last = prev[prev.length - 1]
              if (last && last.type === 'ai' && last.content === firstContent) {
                return prev
              }
              return [
                ...prev,
                {
                  type: 'ai',
                  content: firstContent,
                  timestamp: new Date()
                }
              ]
            })
            return -1
          }

          const firstContent = `좋습니다. 첫 번째 질문입니다.\n${questions[0].text}`

          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last && last.type === 'ai' && last.content === firstContent) {
              return prev
            }
            return [
              ...prev,
              {
                type: 'ai',
                content: firstContent,
                timestamp: new Date()
              }
            ]
          })

          // 이제부터는 0번 인덱스 = Q1
          return 0
        }

        // ✅ 이미 질문 진행 중 → 다음 질문 로직
        const isLastQuestion = prevIdx >= questions.length - 1
        const nextIdx = isLastQuestion ? prevIdx : prevIdx + 1

        const nextContent = isLastQuestion
          ? '좋은 답변 잘 들었습니다. 모든 질문이 종료되었습니다.'
          : `네, 다음 질문으로 넘어가겠습니다.\n${questions[nextIdx].text}`

        // 중복 AI 멘트 방지
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last && last.type === 'ai' && last.content === nextContent) {
            return prev
          }

          return [
            ...prev,
            {
              type: 'ai',
              content: nextContent,
              timestamp: new Date()
            }
          ]
        })

        // ✅ 마지막 질문이면 인터뷰 종료 플래그 ON
        if (isLastQuestion) {
          setIsFinished(true)
        }

        return nextIdx
      })
    }, 1500)
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      navigate('/report/1')
    }
  }

  const handleToggleCamera = () => {
    setCameraEnabled((prev) => !prev)
  }

  const handleToggleMic = () => {
    setMicEnabled((prev) => !prev)
  }

  // 🎤 "음성으로 답변하기 / 음성 답변 중지" 버튼 클릭 핸들러
  const handleVoiceClick = async () => {
    try {
      if (sttState === 'idle') {
        setVoiceText('')
        setSttState('starting')

        const startRequest = fetch('http://localhost:8000/stt/start', {
          method: 'POST'
        })
        const delay = new Promise((resolve) => setTimeout(resolve, 1000))

        const [res] = await Promise.all([startRequest, delay])

        if (!res.ok) {
          throw new Error('녹음 시작 실패')
        }

        setSttState('recording')
      } else if (sttState === 'recording') {
        setSttState('transcribing')

        const res = await fetch('http://localhost:8000/stt/stop', {
          method: 'POST'
        })

        if (!res.ok) {
          throw new Error('녹음/인식 실패')
        }

        const data = await res.json()
        console.log('STT result:', data)

        if (data.text) {
          setVoiceText(data.text)
        } else {
          alert('인식된 문장이 없습니다.')
        }

        setSttState('idle')
      } else {
        return
      }
    } catch (err) {
      console.error(err)
      alert('음성 인식 중 오류가 발생했습니다.')
      setSttState('idle')
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        background: 'var(--bg-dark)',
        overflow: 'hidden'
      }}
    >
      {/* Left Side - Camera */}
      <div
        style={{
          background: 'var(--bg-dark)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Bar */}
        <InterviewHUD
          isRecording={isRecording}
          elapsedTime={elapsedTime}
          // 🔥 아직 질문 전이면 0 / N 으로 보이게
          currentQuestion={
            currentQuestionIndex < 0
              ? 0
              : Math.min(currentQuestionIndex + 1, totalQuestions)
          }
          totalQuestions={totalQuestions}
        />

        {/* Camera View */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background:
              'linear-gradient(135deg, rgba(31, 60, 136, 0.3), rgba(44, 77, 247, 0.3))'
          }}
        >
          <CameraView
            isRecording={isRecording}
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
          />
        </div>

        {/* Bottom Control Bar */}
        <ControlBar
          isRecording={isRecording}
          cameraEnabled={cameraEnabled}
          micEnabled={micEnabled}
          onToggleRecording={() => setIsRecording(!isRecording)}
          onToggleCamera={handleToggleCamera}
          onToggleMic={handleToggleMic}
          onEndInterview={handleEndInterview}
        />

        {(sttState === 'starting' || sttState === 'recording') && (
          <div
            style={{
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '0.9rem'
            }}
          >
            {sttState === 'starting'
              ? '⏳ 마이크 준비 중입니다...'
              : '🎙 음성 답변 녹음 중...'}
          </div>
        )}
      </div>

      {/* Right Side - Chat Panel */}
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          disabled={false}
          onVoiceClick={handleVoiceClick}
          voiceText={voiceText}
          sttState={sttState}
        />
      </div>
    </div>
  )
}