// src/components/interview/CameraView.tsx
import { useEffect, useRef, useState } from 'react'

interface CameraViewProps {
  isRecording: boolean
  cameraEnabled: boolean
  micEnabled: boolean
  stats?: {
    volume: string
    expression: string
    eyeContact: string
  }
  // ✅ 추가: 부모(Interview)로 스트림을 넘겨주는 콜백
  onStreamReady?: (stream: MediaStream | null) => void
}

export default function CameraView({
  isRecording,
  cameraEnabled,
  micEnabled,
  stats,
  onStreamReady
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const defaultStats = {
    volume: '85%',
    expression: '자연스러움',
    eyeContact: '양호'
  }

  const displayStats = stats || defaultStats

  useEffect(() => {
    // 카메라와 마이크 접근
    const initMedia = async () => {
      try {
        setIsLoading(true)
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
          audio: true
        })

        setStream(mediaStream)
        setError('')

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        // 🔥 스트림 준비되면 부모로 올려보내기
        onStreamReady?.(mediaStream)
      } catch (err) {
        console.error('미디어 접근 오류:', err)
        onStreamReady?.(null)

        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError('카메라/마이크 권한이 거부되었습니다.')
          } else if (err.name === 'NotFoundError') {
            setError('카메라 또는 마이크를 찾을 수 없습니다.')
          } else {
            setError('미디어 장치에 접근할 수 없습니다.')
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    initMedia()

    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      onStreamReady?.(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 카메라/마이크 온오프 제어
  useEffect(() => {
    if (stream) {
      const videoTracks = stream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = cameraEnabled
      })

      const audioTracks = stream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = micEnabled
      })
    }
  }, [stream, cameraEnabled, micEnabled])

  return (
    <div
      style={{
        width: '80%',
        height: '80%',
        background: 'rgba(15, 24, 40, 0.8)',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 로딩 중 */}
      {isLoading && (
        <div
          style={{
            fontSize: '2rem',
            color: 'white',
            textAlign: 'center',
            zIndex: 20
          }}
        >
          📹
          <div style={{ fontSize: '1rem', marginTop: '1rem' }}>
            카메라 로딩 중...
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div
          style={{
            fontSize: '1rem',
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
            zIndex: 20
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div>{error}</div>
          <div
            style={{
              fontSize: '0.85rem',
              marginTop: '1rem',
              opacity: 0.7
            }}
          >
            브라우저 설정에서 카메라/마이크 권한을 허용해주세요
          </div>
        </div>
      )}

      {/* 카메라 꺼짐 상태 */}
      {!error && !isLoading && !cameraEnabled && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: 'white',
            zIndex: 20
          }}
        >
          <div style={{ fontSize: '4rem' }}>📹</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
            카메라가 꺼져 있습니다
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            하단 버튼을 눌러 카메라를 켜주세요
          </div>
        </div>
      )}

      {/* 실제 비디오 스트림 */}
      {!error && !isLoading && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)',
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: cameraEnabled ? 'visible' : 'hidden',
            zIndex: 1
          }}
        />
      )}

      {/* LIVE 뱃지 */}
      {isRecording && !error && !isLoading && cameraEnabled && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: 'white',
              borderRadius: '50%',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
          LIVE
        </div>
      )}

      {/* AI 분석 뱃지 */}
      {!error && !isLoading && cameraEnabled && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(72, 226, 179, 0.9)',
            color: 'var(--primary-blue)',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}
        >
          🤖 AI 분석 중
        </div>
      )}

      {/* Stats Overlay */}
      {!error && !isLoading && cameraEnabled && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            right: '2rem',
            display: 'flex',
            gap: '1rem',
            zIndex: 10
          }}
        >
          {[
            {
              label: '음량',
              value: micEnabled ? displayStats.volume : '음소거',
              icon: micEnabled ? '🔊' : '🔇'
            },
            { label: '표정', value: displayStats.expression, icon: '😊' },
            { label: '시선', value: displayStats.eyeContact, icon: '👁️' }
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '1rem',
                background: 'rgba(15, 24, 40, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                  marginBottom: '0.25rem'
                }}
              >
                {stat.icon} {stat.label}
              </div>
              <div
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid Overlay */}
      {!error && !isLoading && cameraEnabled && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
            opacity: 0.2,
            zIndex: 5
          }}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  )
}