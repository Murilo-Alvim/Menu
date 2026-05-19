import { useEffect, useRef } from 'react'

export default function CategoryNav({ categories, activeId, onSelect }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!activeId || !containerRef.current) return
    const el = containerRef.current.querySelector(`[data-id="${activeId}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeId])

  return (
    <nav
      className="sticky top-16 z-30 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800"
      aria-label="Categorias do cardápio"
    >
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto no-scrollbar py-3"
      >
        {categories.map(cat => {
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              data-id={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={[
                'shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-500 text-white shadow-sm scale-[1.02]'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              ].join(' ')}
            >
              <span aria-hidden>{cat.icon}</span>
              {cat.name}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
