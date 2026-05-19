import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FAQ({ faqs }) {
  const [openId, setOpenId] = useState(null)

  if (!faqs?.length) return null

  return (
    <section id="faq" className="mt-16 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
          DÚVIDAS FREQUENTES
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Antes de pedir
        </h2>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openId === idx
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-brand-500"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
