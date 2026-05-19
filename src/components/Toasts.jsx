import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useUI } from '../context/UIContext.jsx'

export default function Toasts() {
  const { toasts } = useUI()

  return (
    <div className="fixed top-4 inset-x-0 z-[60] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ y: -30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="bg-stone-900/95 dark:bg-white text-white dark:text-stone-900 px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium pointer-events-auto"
          >
            <CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-500" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
