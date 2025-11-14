// src\components\layout\DashboardLayout.tsx
import type { ReactNode } from 'react'
import TopNav from './TopNav'
import Sidebar from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem', maxWidth: '1600px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}