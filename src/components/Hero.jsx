import { MapPin, Clock, UtensilsCrossed, Sparkles, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const shortcuts = [
  { href: '#cardapio', label: 'Cardápio', icon: UtensilsCrossed },
  { href: '#servicos', label: 'Serviços', icon: Sparkles },
  { href: '#contato', label: 'Contato', icon: MessageCircle }
]

export default function Hero({ restaurant }) {
  return (
    <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        src={restaurant.coverImage}
        alt={restaurant.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
      <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {restaurant.name}
          </h2>
          <p className="text-sm sm:text-base text-stone-200 mt-1">
            {restaurant.tagline}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs sm:text-sm text-stone-100">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {restaurant.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {restaurant.hours}
            </span>
          </div>

          <nav aria-label="Atalhos" className="mt-4 flex flex-wrap gap-2">
            {shortcuts.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-white/20 transition-colors"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </section>
  )
}
