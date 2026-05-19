import { AnimatePresence, motion } from 'framer-motion'
import { useUI } from '../context/UIContext.jsx'

export default function FlyToCartLayer() {
  const { flights } = useUI()

  return (
    <div className="fixed inset-0 pointer-events-none z-[55]">
      <AnimatePresence>
        {flights.map(f => (
          <motion.img
            key={f.id}
            src={f.src}
            alt=""
            initial={{
              x: f.from.x,
              y: f.from.y,
              width: f.from.w,
              height: f.from.h,
              borderRadius: 16,
              opacity: 1
            }}
            animate={{
              x: f.to.x,
              y: f.to.y,
              width: 28,
              height: 28,
              borderRadius: 999,
              opacity: 0.4
            }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.75, ease: [0.55, 0.06, 0.68, 0.19] }}
            className="absolute object-cover shadow-2xl"
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
