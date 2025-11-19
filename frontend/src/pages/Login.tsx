// src\pages\Login.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    
    if (!formData.email || !formData.password) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }

    // 로그인 처리 (실제로는 API 호출)
    alert('로그인 성공!')
    navigate('/dashboard')
  }

  const isFormFilled = formData.email && formData.password

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
            <Link to="/" style={{ textDecoration: 'none' }}>
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
                marginBottom: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                🎯
              </div>
            </Link>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              다시 만나서<br />
              반가워요! 👋
            </h1>

            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.1rem',
              marginBottom: '3rem',
              lineHeight: '1.7'
            }}>
              계속해서 면접 실력을 향상시키고<br />
              목표를 달성해 나가세요
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '📈', title: '오늘의 목표', desc: '3회 모의면접 완료하기' },
                { icon: '🎯', title: '이번 주 진행률', desc: '12회 연습 완료 (목표: 15회)' },
                { icon: '⭐', title: '평균 점수', desc: '최근 5회 평균 85점' }
              ].map((stat, idx) => (
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
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.25rem' }}>
                      {stat.title}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                      {stat.desc}
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
              로그인
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              계정에 로그인하여 면접 연습을 시작하세요
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}>
                이메일
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
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-blue)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(44, 77, 247, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(31, 60, 136, 0.1)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}>
                  비밀번호
                </label>
                <a href="#" style={{
                  color: 'var(--primary-blue)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  비밀번호 찾기
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-blue)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(44, 77, 247, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(31, 60, 136, 0.1)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Remember Me */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                로그인 상태 유지
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormFilled}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                background: isFormFilled 
                  ? 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))' 
                  : '#E5E7EB',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isFormFilled ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: isFormFilled ? '0 4px 12px rgba(44, 77, 247, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (isFormFilled) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(44, 77, 247, 0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (isFormFilled) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 77, 247, 0.2)'
                }
              }}
            >
              로그인
            </button>

            {/* Divider */}
            <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(31, 60, 136, 0.1)'
              }} />
              <span style={{
                position: 'relative',
                background: 'white',
                padding: '0 1rem',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                또는
              </span>
            </div>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  background: 'white',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-light)'
                  e.currentTarget.style.borderColor = 'rgba(31, 60, 136, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = 'rgba(31, 60, 136, 0.1)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🔍</span>
                Google로 계속하기
              </button>

              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(31, 60, 136, 0.1)',
                  background: 'white',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-light)'
                  e.currentTarget.style.borderColor = 'rgba(31, 60, 136, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = 'rgba(31, 60, 136, 0.1)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>💬</span>
                카카오로 계속하기
              </button>
            </div>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              계정이 없으신가요?{' '}
              <Link 
                to="/signup" 
                style={{ 
                  color: 'var(--primary-blue)', 
                  fontWeight: '600', 
                  textDecoration: 'none' 
                }}
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}