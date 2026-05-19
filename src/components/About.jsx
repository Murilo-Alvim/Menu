import { motion } from 'framer-motion'
import { ChefHat } from 'lucide-react'

export default function About({ chef }) {
  if (!chef) return null

  return (
    <section id="sobre" className="mt-16 scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative order-2 md:order-1"
        >
          <div className="absolute -inset-3 bg-brand-500/20 rounded-3xl rotate-3 -z-10" aria-hidden />
          <img
            src={chef.photo}
            alt={chef.name}
            onError={e => { e.currentTarget.style.visibility = 'hidden' }}
            className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
            CONHEÇA NOSSA CHEF
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {chef.name}
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-2 text-sm text-stone-500 dark:text-stone-400">
            <ChefHat size={16} className="text-brand-500" />
            {chef.title}
          </div>
          <p className="mt-5 text-stone-600 dark:text-stone-400 leading-relaxed">
            {chef.bio}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
