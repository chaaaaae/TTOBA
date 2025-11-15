// src\components\question-bank\SearchBar.tsx
import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSearch?: () => void
}

export default function SearchBar({
  value,
  onChange,
  placeholder = '검색어를 입력하세요...',
  onSearch
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch()
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        transition: 'all 0.3s'
      }}
    >
      {/* Search Icon */}
      <div
        style={{
          position: 'absolute',
          left: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.2rem',
          color: isFocused ? 'var(--primary-blue)' : 'var(--text-secondary)',
          transition: 'all 0.3s',
          pointerEvents: 'none'
        }}
      >
        🔍
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '1rem 3.5rem 1rem 3.5rem',
          border: isFocused
            ? '2px solid var(--primary-blue)'
            : '2px solid rgba(31, 60, 136, 0.1)',
          borderRadius: '12px',
          fontSize: '1rem',
          transition: 'all 0.3s',
          outline: 'none',
          background: 'white',
          boxShadow: isFocused ? '0 0 0 3px rgba(44, 77, 247, 0.1)' : 'none'
        }}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(31, 60, 136, 0.1)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(31, 60, 136, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(31, 60, 136, 0.1)'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}