import { useEffect, useMemo, useRef, useState } from 'react'
import menu from './data/menu.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryNav from './components/CategoryNav.jsx'
import MenuSection from './components/MenuSection.jsx'
import MenuItem from './components/MenuItem.jsx'
import SearchBar from './components/SearchBar.jsx'
import FeaturedCarousel from './components/FeaturedCarousel.jsx'
import About from './components/About.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Cart from './components/Cart.jsx'
import FloatingCart from './components/FloatingCart.jsx'
import BackToTop from './components/BackToTop.jsx'
import BackToStartButton from './components/BackToStartButton.jsx'
import ItemDetailModal from './components/ItemDetailModal.jsx'
import Toasts from './components/Toasts.jsx'
import FlyToCartLayer from './components/FlyToCartLayer.jsx'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.id)
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const [detailItem, setDetailItem] = useState(null)
  const sectionRefs = useRef({})

  const featuredItems = useMemo(
    () => menu.items.filter(it => it.featured),
    []
  )

  const itemsByCategory = useMemo(() => {
    return menu.categories.map(cat => ({
      category: cat,
      items: menu.items.filter(it => it.categoryId === cat.id)
    }))
  }, [])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q && activeTags.length === 0) return null
    return menu.items.filter(it => {
      const matchesQuery =
        !q ||
        it.name.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q)
      const matchesTags =
        activeTags.length === 0 || activeTags.every(t => it.tags?.includes(t))
      return matchesQuery && matchesTags
    })
  }, [query, activeTags])

  useEffect(() => {
    if (filteredItems) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = visible.target.id.replace('cat-', '')
          setActiveCategory(id)
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [filteredItems])

  const handleSelectCategory = id => {
    const el = sectionRefs.current[id]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleTag = tag => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setQuery('')
    setActiveTags([])
  }

  return (
    <div className="min-h-screen">
      <Header restaurant={menu.restaurant} onOpenCart={() => setCartOpen(true)} />
      <Hero restaurant={menu.restaurant} />

      {!filteredItems && (
        <CategoryNav
          categories={menu.categories}
          activeId={activeCategory}
          onSelect={handleSelectCategory}
        />
      )}

      <main id="cardapio" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12 pb-32 scroll-mt-20">
        {!filteredItems && featuredItems.length > 0 && (
          <FeaturedCarousel items={featuredItems} onSelect={setDetailItem} />
        )}

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          activeTags={activeTags}
          onToggleTag={toggleTag}
          onClear={clearFilters}
        />

        {filteredItems ? (
          <section>
            <h2 className="text-lg font-bold mb-4">
              {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'}
            </h2>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-stone-500 dark:text-stone-400">
                <p>Nenhum prato encontrado.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 text-sm text-brand-500 hover:underline font-medium"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredItems.map(it => (
                  <MenuItem key={it.id} item={it} onOpenDetail={setDetailItem} />
                ))}
              </div>
            )}
          </section>
        ) : (
          itemsByCategory.map(({ category, items }) => (
            <MenuSection
              key={category.id}
              category={category}
              items={items}
              sectionRef={el => (sectionRefs.current[category.id] = el)}
              onOpenDetail={setDetailItem}
            />
          ))
        )}

        <About chef={menu.chef} />

        <Testimonials testimonials={menu.testimonials} />

        <Services />

        <FAQ faqs={menu.faqs} />

        <Contact restaurant={menu.restaurant} />

        <BackToStartButton />

        <footer className="pt-8 mt-4 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400">
          <p className="font-semibold text-stone-700 dark:text-stone-200">{menu.restaurant.name}</p>
          <p className="mt-1">{menu.restaurant.address}</p>
          <p className="mt-1">{menu.restaurant.hours}</p>
        </footer>
      </main>

      <FloatingCart onOpen={() => setCartOpen(true)} />
      <BackToTop />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        restaurant={menu.restaurant}
      />
      <ItemDetailModal
        item={detailItem}
        open={!!detailItem}
        onClose={() => setDetailItem(null)}
      />
      <Toasts />
      <FlyToCartLayer />
    </div>
  )
}
