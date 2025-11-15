// src\components\layout\TopNav.tsx
import { Link } from 'react-router-dom'

export default function TopNav() {
  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid rgba(31, 60, 136, 0.08)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px)'
    }}>
      <div style={{
        maxWidth: '1800px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.3rem',
            fontWeight: '700',
            color: 'var(--primary-blue)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
            }}>
              🎯
            </div>
            AI 면접 코치
          </div>
        </Link>

        {/* User Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {/* Notification */}
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(31, 60, 136, 0.1)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s'
          }}>
            🔔
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '10px',
              height: '10px',
              background: 'var(--danger)',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
          </button>

          {/* User Avatar */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            J
          </div>
        </div>
      </div>
    </div>
  )
}