import MenuItem from './MenuItem.jsx'

export default function MenuSection({ category, items, sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id={`cat-${category.id}`}
      className="scroll-mt-32 sm:scroll-mt-36"
    >
      <header className="flex items-center gap-2 mb-4">
        <span className="text-2xl" aria-hidden>{category.icon}</span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{category.name}</h2>
        <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800 ml-2" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
