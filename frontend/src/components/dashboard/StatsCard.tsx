// src\components\dashboard\StatsCard.tsx
interface StatsCardProps {
  icon: string
  label: string
  value: string
  color?: string
}

export default function StatsCard({ icon, label, value, color }: StatsCardProps) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
        border: '1px solid rgba(31, 60, 136, 0.05)',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        {icon}
      </div>
      <div
        style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}
      >
        {value}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {label}
      </div>
    </div>
  )
}