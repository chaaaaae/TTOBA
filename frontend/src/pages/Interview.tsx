// src/pages/Interview.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewHUD from '../components/interview/InterviewHUD'
import CameraView from '../components/interview/CameraView'
import ChatPanel from '../components/interview/ChatPanel'
import ControlBar from '../components/interview/ControlBar'

// 🔥 STT 상태 타입
type SttState = 'idle' | 'starting' | 'recording' | 'transcribing'

export default function Interview() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true) // 카메라 온오프
  const [micEnabled, setMicEnabled] = useState(true) // 마이크 온오프
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(8)
  const [messages, setMessages] = useState([
    {
      type: 'ai' as const,
      content: '안녕하세요! 면접을 시작하겠습니다. 준비되셨나요?',
      timestamp: new Date()
    },
    {
      type: 'user' as const,
      content: '네, 준비됐습니다!',
      timestamp: new Date()
    },
    {
      type: 'ai' as const,
      content: '좋습니다. 첫 번째 질문입니다. 간단하게 자기소개를 해주세요.',
      timestamp: new Date()
    }
  ])

  // 🎤 STT 관련 상태
  const [voiceText, setVoiceText] = useState('')          // 인식 결과 텍스트
  const [sttState, setSttState] = useState<SttState>('idle') // STT 상태 관리

  const isVoiceRecording = sttState === 'recording'

  // Timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'user' as const,
        content: message,
        timestamp: new Date()
      }
    ])

    // AI 응답 시뮬레이션
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai' as const,
          content: '좋은 답변입니다. 다음 질문으로 넘어가겠습니다.',
          timestamp: new Date()
        }
      ])
      setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions))
    }, 1500)
  }

  const handleEndInterview = () => {
    if (window.confirm('면접을 종료하시겠습니까?')) {
      navigate('/report/1')
    }
  }

  const handleToggleCamera = () => {
    setCameraEnabled(prev => !prev)
  }

  const handleToggleMic = () => {
    setMicEnabled(prev => !prev)
  }

  // 🎤 "음성으로 답변하기 / 음성 답변 중지" 버튼 클릭 핸들러
  const handleVoiceClick = async () => {
    try {
      // 🔵 idle -> starting -> recording
      if (sttState === 'idle') {
        setVoiceText('') // 이전 인식 결과 초기화 (선택)
        setSttState('starting')

        // 백엔드 호출 + 최소 1초 대기 동시 진행
        const startRequest = fetch('http://localhost:8000/stt/start', {
          method: 'POST'
        })
        const delay = new Promise((resolve) => setTimeout(resolve, 1000))

        const [res] = await Promise.all([startRequest, delay])

        if (!res.ok) {
          throw new Error('녹음 시작 실패')
        }

        // 이제 사용자에게 "말해도 된다" 느낌의 상태
        setSttState('recording')
      }
      // 🔴 recording -> transcribing -> idle
      else if (sttState === 'recording') {
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
          // ChatPanel의 입력창에 들어가도록 상태에 저장
          setVoiceText(data.text)
        } else {
          alert('인식된 문장이 없습니다.')
        }

        setSttState('idle')
      }
      // starting / transcribing 상태에서는 클릭 무시
      else {
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
          currentQuestion={currentQuestion}
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

        {/* (선택) 음성 녹음 상태 표시 */}
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