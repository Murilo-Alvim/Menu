import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIContext.jsx'

export default function Header({ restaurant, onOpenCart }) {
  const { theme, toggleTheme } = useTheme()
  const { totalItems } = useCart()
  const { registerCartTarget } = useUI()
  const cartBtnRef = useRef(null)

  useEffect(() => {
    registerCartTarget(cartBtnRef.current)
  }, [registerCartTarget])

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-stone-950/85 border-b border-stone-200/60 dark:border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
            {restaurant.name}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
            {restaurant.hours}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-amber-400" />
            ) : (
              <Moon size={20} className="text-stone-700" />
            )}
          </button>

          <motion.button
            ref={cartBtnRef}
            type="button"
            onClick={onOpenCart}
            aria-label="Abrir carrinho"
            animate={totalItems > 0 ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="relative p-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white transition-colors shadow-lg shadow-brand-500/30"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[11px] font-bold border-2 border-white dark:border-stone-950"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  )
}
