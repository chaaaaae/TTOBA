// src\components\question-bank\CategoryFilter.tsx
interface Category {
    id: string
    name: string
    count: number
  }
  
  interface CategoryFilterProps {
    categories: Category[]
    selected: string
    onChange: (id: string) => void
  }
  
  export default function CategoryFilter({
    categories,
    selected,
    onChange
  }: CategoryFilterProps) {
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background:
                selected === category.id
                  ? 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))'
                  : 'transparent',
              color: selected === category.id ? 'white' : 'var(--text-secondary)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.95rem'
            }}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    )
  }