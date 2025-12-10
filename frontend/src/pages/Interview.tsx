// src/pages/Interview.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import InterviewHUD from '../components/interview/InterviewHUD'
import CameraView from '../components/interview/CameraView'
import ChatPanel from '../components/interview/ChatPanel'
import ControlBar from '../components/interview/ControlBar'
import { ALL_QUESTIONS } from '../data/questionBank'
import { API_BASE_URL } from '../lib/api'

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

// 📌 Report로 넘길 답변 아이템 타입
type AnswerForReport = {
  questionNumber: number
  question: string
  answer: string
  score?: number

  // 🔥 영상 관련
  duration?: string          // "2분 30초" 같은 표시용
  durationSeconds?: number   // 초 단위 (합산용)
  videoUrl?: string
  videoBlob?: Blob
}

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

  // ✅ 항상 최신 인덱스를 참조하기 위한 ref
  const currentQuestionRef = useRef(-1)
  useEffect(() => {
    currentQuestionRef.current = currentQuestionIndex
  }, [currentQuestionIndex])

  const [isRecording, setIsRecording] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)

  // ✅ 모든 질문이 끝났는지 여부
  const [isFinished, setIsFinished] = useState(false)

  // ✅ Report로 넘길 "질문 + 답변" 목록
  const [answersForReport, setAnswersForReport] = useState<AnswerForReport[]>([])

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

  // ✅ 카메라 스트림 & MediaRecorder 관리
  const streamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // CameraView에서 스트림 전달
  const handleStreamReady = (stream: MediaStream | null) => {
    streamRef.current = stream
  }

  // 🔥 질문별 영상 녹화 시작
  const startRecordingForQuestion = (questionNumber: number) => {
    const stream = streamRef.current
    if (!stream) {
      console.warn('카메라 스트림 없음, 녹화 시작 불가')
      return
    }

    // 혹시 이전 녹화가 살아있으면 정리
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }

    const chunks: BlobPart[] = []
    const recorder = new MediaRecorder(stream)

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    recorder.onstop = () => {
      if (chunks.length === 0) return

      const blob = new Blob(chunks, { type: 'video/webm' })
      const videoUrl = URL.createObjectURL(blob)

      // 🔥 비디오 메타데이터 읽어서 길이 계산
      const tempVideo = document.createElement('video')
      tempVideo.preload = 'metadata'
      tempVideo.src = videoUrl

      tempVideo.onloadedmetadata = () => {
        const durationSec = tempVideo.duration || 0
        const durationLabel = formatDurationKo(durationSec)

        setAnswersForReport((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.questionNumber === questionNumber
          )

          if (existingIndex >= 0) {
            const updated = [...prev]
            updated[existingIndex] = {
              ...updated[existingIndex],
              videoUrl,
              videoBlob: blob,
              duration: durationLabel,
              durationSeconds: durationSec
            }
            return updated
          }

          const q = questions[questionNumber - 1]
          return [
            ...prev,
            {
              questionNumber,
              question: q?.text ?? '',
              answer: '',
              videoUrl,
              videoBlob: blob,
              duration: durationLabel,
              durationSeconds: durationSec
            }
          ]
        })
      }
    }

    mediaRecorderRef.current = recorder
    recorder.start()
    console.log(`▶️ Q${questionNumber} 녹화 시작`)
  }

  // 🔥 현재 질문에 대한 녹화 종료
  const stopRecordingForCurrentQuestion = () => {
    const recorder = mediaRecorderRef.current
    if (recorder && recorder.state === 'recording') {
      recorder.stop()
      console.log('⏹ 녹화 종료')
    }
  }

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
        navigate('/report/1/loading', {
          state: {
            answers: answersForReport
          }
        })
      }, 2000) // "모든 질문이 종료되었습니다." 멘트 보여줄 시간

      return () => clearTimeout(timer)
    }
  }, [isFinished, navigate, answersForReport])

  // 🔥 사용자가 텍스트로 답변 보냈을 때
  const handleSendMessage = (message: string) => {
    // 1) 채팅에 사용자 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        content: message,
        timestamp: new Date()
      }
    ])

    // ✅ 항상 최신 질문 인덱스를 사용
    const idx = currentQuestionRef.current

    // 2) 현재 진행 중인 질문에 대한 "답변 기록" 저장
    if (idx >= 0 && idx < questions.length) {
      const q = questions[idx]

      setAnswersForReport((prev) => {
        const questionNumber = idx + 1
        const existingIndex = prev.findIndex(
          (item) => item.questionNumber === questionNumber
        )

        // 같은 질문에 여러 번 답하면 → 답변을 이어붙이기
        if (existingIndex >= 0) {
          const updated = [...prev]
          const prevAnswer = updated[existingIndex].answer
          updated[existingIndex] = {
            ...updated[existingIndex],
            answer: prevAnswer ? `${prevAnswer}\n${message}` : message
          }
          return updated
        }

        // 처음 답하는 질문이면 새로 추가
        return [
          ...prev,
          {
            questionNumber,
            question: q.text,
            answer: message,
            score: undefined,
            duration: undefined,
            durationSeconds: undefined
          }
        ]
      })
    }

    // 3) AI 응답 + 질문 진행 (+ 녹화 제어)
    setTimeout(() => {
      setCurrentQuestionIndex((prevIdx) => {
        // ✅ 아직 질문 시작 전 (-1) → 첫 번째 질문 던지기
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

          // 🔥 Q1 영상 녹화 시작
          startRecordingForQuestion(1)

          // 이제부터는 0번 인덱스 = Q1
          return 0
        }

        // ✅ 이미 질문 진행 중 → 다음 질문 로직
        const isLastQuestion = prevIdx >= questions.length - 1

        // 🔥 현재 질문 녹화 종료
        stopRecordingForCurrentQuestion()

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

        // ✅ 마지막 질문이면 인터뷰 종료 플래그 ON → 리포트로 이동
        if (isLastQuestion) {
          setIsFinished(true)
          return prevIdx
        }

        // 🔥 다음 질문(Q{nextIdx+1})부터 새로 녹화 시작
        const nextQuestionNumber = nextIdx + 1
        startRecordingForQuestion(nextQuestionNumber)

        return nextIdx
      })
    }, 1500)
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      // 진행 중인 질문 녹화 종료
      stopRecordingForCurrentQuestion()
      navigate('/report/1/loading', {
        state: {
          answers: answersForReport
        }
      })
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

        const startRequest = fetch(`${API_BASE_URL}/stt/start`, {
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

        const res = await fetch(`${API_BASE_URL}/stt/stop`, {
          method: 'POST'
        })

        if (!res.ok) {
          throw new Error('녹음/인식 실패')
        }

        const data = await res.json()
        console.log('STT result:', data)

        if (data.text) {
          // 입력창에 뿌리는 건 그대로 유지
          setVoiceText(data.text)
          // 필요하면 여기서 handleSendMessage(data.text)도 호출 가능
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
            onStreamReady={handleStreamReady}
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