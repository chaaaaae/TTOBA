import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: '대시보드' },
    { path: '/questions', icon: '💬', label: '질문 뱅크' },
    { path: '/interview', icon: '🎤', label: '면접 시작' },
    { path: '/reports', icon: '📝', label: '내 리포트' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div style={{
      width: '280px',
      background: 'white',
      borderRight: '1px solid rgba(31, 60, 136, 0.08)',
      height: 'calc(100vh - 73px)',
      position: 'sticky',
      top: '73px',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem'
    }}>
      {/* Quick Start Button */}
      <Link to="/interview" style={{ textDecoration: 'none', marginBottom: '2rem' }}>
        <button style={{
          width: '100%',
          padding: '1rem',
          background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span>🎯</span>
          <span>면접 시작하기</span>
        </button>
      </Link>

      {/* Menu Items */}
      <nav style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '1rem'
        }}>
          메뉴
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1rem',
                borderRadius: '10px',
                background: isActive(item.path) 
                  ? 'linear-gradient(135deg, rgba(44, 77, 247, 0.1), rgba(72, 226, 179, 0.1))' 
                  : 'transparent',
                color: isActive(item.path) ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive(item.path) ? '700' : '500',
                transition: 'all 0.3s',
                position: 'relative'
              }}
            >
              {isActive(item.path) && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '70%',
                  background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                  borderRadius: '0 4px 4px 0'
                }} />
              )}
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Stats */}
      <div style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
        borderRadius: '16px',
        color: 'white'
      }}>
        <div style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.5rem' }}>
          이번 주 연습
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          12회
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '60%',
            height: '100%',
            background: 'var(--accent-mint)',
            borderRadius: '3px'
          }} />
        </div>
      </div>
    </div>
  )
}