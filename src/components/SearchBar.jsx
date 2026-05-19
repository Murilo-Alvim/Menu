import { Search, X } from 'lucide-react'

const allTags = ['vegetariano', 'vegano', 'sem glúten', 'chef recomenda']

export default function SearchBar({ query, onQueryChange, activeTags, onToggleTag, onClear }) {
  const hasFilters = query || activeTags.length > 0

  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Buscar prato..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 focus:border-brand-500 focus:outline-none text-sm transition-colors"
        />
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpar busca e filtros"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => {
          const active = activeTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={[
                'text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full transition-colors',
                active
                  ? 'bg-brand-500 text-white'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              ].join(' ')}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
