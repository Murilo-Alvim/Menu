import {
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Star,
  Truck,
  UtensilsCrossed
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TITLE_CHARS = 'Sabor & Arte'.split('')

const stats = [
  { icon: Star, label: '4.9', sub: '+200 avaliações' },
  { icon: Truck, label: '40-55 min', sub: 'tempo médio' },
  { icon: Clock, label: 'Ter–Dom', sub: '18h às 23h' }
]

export default function Hero({ restaurant }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const whatsappHref = `https://wa.me/${restaurant.phone}?text=${encodeURIComponent(
    `Olá! Vim pelo cardápio digital do ${restaurant.name}.`
  )}`

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] max-h-[920px] overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/75 to-stone-950/95" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(0,0,0,0.55),transparent_70%)]"
      />

      <FloatingBlob className="bg-brand-500/30" style={{ top: '15%', left: '8%' }} duration={22} />
      <FloatingBlob className="bg-amber-400/20" style={{ top: '55%', right: '10%' }} duration={28} delay={2} />
      <FloatingBlob className="bg-emerald-500/15" style={{ bottom: '20%', left: '40%' }} duration={26} delay={4} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center pt-20 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm px-4 py-1.5 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Aberto agora · {restaurant.deliveryTime ?? 'entrega em ~50min'}
        </motion.div>

        <h1
          aria-label={restaurant.name}
          className="font-extrabold text-white tracking-tight text-5xl sm:text-7xl md:text-8xl leading-[1.05] [text-shadow:0_4px_28px_rgba(0,0,0,0.65),0_0_50px_rgba(0,0,0,0.45)]"
        >
          {TITLE_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.55, ease: 'easeOut' }}
              className="inline-block"
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-5 text-base sm:text-xl text-stone-200 max-w-xl [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
        >
          {restaurant.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs sm:text-sm text-stone-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {restaurant.address}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="#cardapio"
            className="group inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3.5 rounded-full shadow-xl shadow-brand-500/30 transition-colors"
          >
            <UtensilsCrossed size={18} />
            Ver Cardápio
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full transition-colors"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.6 }}
          className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-md w-full"
        >
          {stats.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-2 py-3 sm:p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
            >
              <Icon size={18} className="text-brand-300" />
              <p className="mt-1 text-white font-bold text-sm sm:text-base">{label}</p>
              <p className="text-[10px] sm:text-xs text-stone-300 leading-tight">{sub}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#cardapio"
        aria-label="Rolar para o cardápio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/80 hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Role</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md bg-white/5"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  )
}

function FloatingBlob({ className, style, duration, delay = 0 }) {
  return (
    <motion.div
      aria-hidden
      style={style}
      animate={{
        x: [0, 40, -30, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.1, 0.95, 1]
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none ${className}`}
    />
  )
}
