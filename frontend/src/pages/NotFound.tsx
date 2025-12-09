// src\pages\NotFound.tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ background: 'var(--bg-light)' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--primary-blue)' }}>404</h1>
        <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
          페이지를 찾을 수 없습니다
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 rounded-lg text-white font-semibold"
          style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))' }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}