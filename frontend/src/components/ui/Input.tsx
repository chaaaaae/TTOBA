// src\components\ui\Input.tsx
import type { CSSProperties, ChangeEvent } from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  name?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string
  icon?: string
  style?: CSSProperties
}

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  error,
  icon,
  style
}: InputProps) {
  return (
    <div style={{ width: '100%', ...style }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            fontSize: '0.9rem'
          }}
        >
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={{
            width: '100%',
            padding: icon ? '0.875rem 1rem 0.875rem 3rem' : '0.875rem 1rem',
            border: error
              ? '2px solid var(--danger)'
              : '2px solid rgba(31, 60, 136, 0.1)',
            borderRadius: '10px',
            fontSize: '1rem',
            transition: 'all 0.3s',
            outline: 'none',
            background: disabled ? '#F3F4F6' : 'white',
            color: disabled ? '#9CA3AF' : 'var(--text-primary)',
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = 'var(--primary-blue)'
              e.target.style.boxShadow = '0 0 0 3px rgba(44, 77, 247, 0.1)'
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error
              ? 'var(--danger)'
              : 'rgba(31, 60, 136, 0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {icon && (
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              pointerEvents: 'none'
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: '0.5rem',
            color: 'var(--danger)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <span>⚠️</span>
          {error}
        </div>
      )}
    </div>
  )
}