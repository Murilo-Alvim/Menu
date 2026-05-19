import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Testimonials({ testimonials }) {
  if (!testimonials?.length) return null

  return (
    <section id="depoimentos" className="mt-16 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
          DEPOIMENTOS
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          O que dizem nossos clientes
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 rounded-2xl p-5"
          >
            <Quote
              size={32}
              className="absolute top-4 right-4 text-stone-200 dark:text-stone-800"
              aria-hidden
            />
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover bg-stone-200 dark:bg-stone-800"
                onError={e => { e.currentTarget.style.visibility = 'hidden' }}
              />
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <div className="flex gap-0.5 mt-0.5" aria-label={`${t.rating} estrelas`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={12}
                      className={
                        idx < t.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-stone-300 dark:text-stone-700'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.comment}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
