import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToStartButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
        Chegou ao fim do cardápio
      </p>
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-3 bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold px-7 py-4 rounded-full shadow-xl shadow-brand-500/30 transition-colors overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.span>
        <span className="relative">Voltar ao início</span>
      </motion.button>
    </motion.div>
  )
}
