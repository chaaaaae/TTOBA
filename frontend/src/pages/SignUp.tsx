// src\pages\SignUp.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 항목 체크
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관에 동의해주세요.')
      return
    }

    // 회원가입 처리
    alert('회원가입 성공!')
    // 실제로는 여기서 API 호출 후 대시보드로 이동
    // navigate('/dashboard')
  }

  const isRequiredFilled = formData.name && formData.email && formData.password && 
                           formData.passwordConfirm && formData.agreeTerms && formData.agreePrivacy

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '1100px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        animation: 'slideUp 0.6s ease-out'
      }}>
        {/* Left Side - Branding */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-30%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(72, 226, 179, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              marginBottom: '2rem'
            }}>
              🎯
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              AI 면접 코치와 함께<br />
              완벽한 면접 준비
            </h1>

            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.1rem',
              marginBottom: '3rem',
              lineHeight: '1.7'
            }}>
              실시간 피드백과 맞춤형 분석으로<br />
              면접 실력을 한 단계 업그레이드하세요
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '🎤', title: '실시간 음성 분석', desc: 'AI가 답변을 즉시 분석합니다' },
                { icon: '📊', title: '상세한 리포트', desc: '강점과 개선점을 한눈에' },
                { icon: '🎓', title: '맞춤형 학습', desc: '개인화된 질문 추천' }
              ].map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.25rem' }}>
                      {feature.title}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{ padding: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              회원가입
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              새로운 계정을 만들어보세요
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}>
                이름 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}>
                이메일 *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}>
                비밀번호 *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="8자 이상 입력하세요"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Password Confirm */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}>
                비밀번호 확인 *
              </label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Agreements */}
            <div style={{
              padding: '1.5rem',
              background: 'var(--bg-light)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  [필수] 서비스 이용약관에 동의합니다
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  [필수] 개인정보 처리방침에 동의합니다
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleInputChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  [선택] 마케팅 정보 수신에 동의합니다
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isRequiredFilled}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                background: isRequiredFilled 
                  ? 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))' 
                  : '#E5E7EB',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isRequiredFilled ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: isRequiredFilled ? '0 4px 12px rgba(44, 77, 247, 0.2)' : 'none'
              }}
            >
              회원가입
            </button>

            {/* Login Link */}
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              이미 계정이 있으신가요?{' '}
              <Link 
                to="/" 
                style={{ 
                  color: 'var(--primary-blue)', 
                  fontWeight: '600', 
                  textDecoration: 'none' 
                }}
              >
                로그인
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}