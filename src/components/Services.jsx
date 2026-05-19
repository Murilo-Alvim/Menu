import { motion } from 'framer-motion'
import { Smartphone, Bike, ChefHat } from 'lucide-react'

const services = [
  {
    icon: Smartphone,
    title: 'Fácil de pedir',
    description: 'Você só precisa de alguns toques para montar o pedido direto pelo cardápio.',
    accent: 'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
  },
  {
    icon: Bike,
    title: 'Entrega rápida',
    description: 'Nossa entrega é sempre pontual, rápida e segura, com motoboys parceiros.',
    accent: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
  },
  {
    icon: ChefHat,
    title: 'Melhor qualidade',
    description: 'Não só a rapidez na preparação, a qualidade também é o nosso forte.',
    accent: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
  }
]

export default function Services() {
  return (
    <section
      id="servicos"
      className="relative -mx-4 sm:-mx-6 mt-16 px-4 sm:px-6 py-16 sm:py-20 bg-stone-100/70 dark:bg-stone-900/40 rounded-3xl scroll-mt-32"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
            SERVIÇOS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Como são os nossos?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${s.accent}`}>
                  <Icon size={36} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
                  {s.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
