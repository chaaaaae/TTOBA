// src\pages\Interview.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewHUD from '../components/interview/InterviewHUD'
import CameraView from '../components/interview/CameraView'
import ChatPanel from '../components/interview/ChatPanel'
import ControlBar from '../components/interview/ControlBar'

export default function Interview() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(true)
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
        type: 'user',
        content: message,
        timestamp: new Date()
      }
    ])

    // AI 응답 시뮬레이션
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
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
          <CameraView isRecording={isRecording} />
        </div>

        {/* Bottom Control Bar */}
        <ControlBar
          isRecording={isRecording}
          onToggleRecording={() => setIsRecording(!isRecording)}
          onEndInterview={handleEndInterview}
        />
      </div>

      {/* Right Side - Chat Panel */}
      <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
    </div>
  )
}