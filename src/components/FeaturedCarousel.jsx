import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { formatPrice } from '../utils/format.js'

export default function FeaturedCarousel({ items, onSelect }) {
  if (!items?.length) return null

  return (
    <section className="mt-10 sm:mt-12" id="destaques">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
            DESTAQUES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Mais pedidos da semana
          </h2>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="snap-start shrink-0 w-64 sm:w-72 text-left bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/70 dark:border-stone-800 hover:shadow-xl hover:border-brand-200 dark:hover:border-brand-900 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shadow-md">
                  <Star size={11} fill="currentColor" /> Destaque
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base leading-snug line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <p className="mt-2 text-brand-600 dark:text-brand-400 font-bold">
                  {formatPrice(item.price)}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
