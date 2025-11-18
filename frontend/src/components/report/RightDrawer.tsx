// src/components/RightDrawer.tsx
import React from 'react'

interface RightDrawerProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
    className={`fixed inset-0 z-[2000] flex justify-end transition-none ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
    }`}
    onClick={isOpen ? onClose : undefined}
    >

      <div
        // 오른쪽 패널: 흰색 + 그림자 + 둥근 모서리 + 슬라이드 애니메이션
        className={`h-full w-[38vw] max-w-none bg-white shadow-2xl border-l border-slate-100
        transform transition-transform duration-300 ease-out
        rounded-none md:rounded-l-3xl
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children ?? <div />}
      </div>
    </div>
  )
}

export default RightDrawer
