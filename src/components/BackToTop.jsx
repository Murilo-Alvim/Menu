import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const bottomClass = totalItems > 0 ? 'bottom-24 sm:bottom-6' : 'bottom-6'

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar ao topo"
          className={`fixed left-4 sm:left-6 ${bottomClass} z-40 w-11 h-11 rounded-full bg-stone-900/90 hover:bg-stone-900 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 shadow-lg flex items-center justify-center backdrop-blur-md transition-colors safe-bottom`}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
