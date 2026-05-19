import { useEffect, useMemo, useRef, useState } from 'react'
import menu from './data/menu.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryNav from './components/CategoryNav.jsx'
import MenuSection from './components/MenuSection.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Cart from './components/Cart.jsx'
import FloatingCart from './components/FloatingCart.jsx'
import BackToTop from './components/BackToTop.jsx'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.id)
  const sectionRefs = useRef({})

  const itemsByCategory = useMemo(() => {
    return menu.categories.map(cat => ({
      category: cat,
      items: menu.items.filter(it => it.categoryId === cat.id)
    }))
  }, [])

  useEffect(() => {
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
  }, [])

  const handleSelectCategory = id => {
    const el = sectionRefs.current[id]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      <Header restaurant={menu.restaurant} onOpenCart={() => setCartOpen(true)} />
      <Hero restaurant={menu.restaurant} />
      <CategoryNav
        categories={menu.categories}
        activeId={activeCategory}
        onSelect={handleSelectCategory}
      />

      <main id="cardapio" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12 pb-32 scroll-mt-20">
        {itemsByCategory.map(({ category, items }) => (
          <MenuSection
            key={category.id}
            category={category}
            items={items}
            sectionRef={el => (sectionRefs.current[category.id] = el)}
          />
        ))}

        <Services />

        <Contact restaurant={menu.restaurant} />

        <footer className="pt-8 mt-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400">
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
    </div>
  )
}
