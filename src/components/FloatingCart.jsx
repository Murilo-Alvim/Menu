import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function FloatingCart({ onOpen }) {
  const { totalItems, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-40 safe-bottom"
        >
          <button
            type="button"
            onClick={onOpen}
            className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white rounded-2xl shadow-xl shadow-brand-500/30 px-5 py-4 flex items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={22} />
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-brand-600 text-[10px] font-bold flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              </div>
              <span className="font-semibold">Ver pedido</span>
            </div>
            <span className="font-bold tracking-tight">{formatPrice(totalPrice)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
