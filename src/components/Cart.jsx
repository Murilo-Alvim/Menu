import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { buildWhatsAppMessage, formatPrice } from '../utils/format.js'

export default function Cart({ open, onClose, restaurant }) {
  const { items, totalItems, totalPrice, increment, decrement, remove, clear } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    const message = buildWhatsAppMessage({ restaurant, items, totalPrice })
    const url = `https://wa.me/${restaurant.phone}?text=${message}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white dark:bg-stone-950 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Carrinho de pedidos"
          >
            <header className="flex items-center justify-between px-5 h-16 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-500" />
                <h2 className="font-bold text-lg">Seu pedido</h2>
                {totalItems > 0 && (
                  <span className="text-xs text-stone-500">({totalItems} itens)</span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-stone-400" />
                  </div>
                  <p className="font-medium">Seu carrinho está vazio</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Adicione itens do cardápio para começar.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 items-center bg-stone-50 dark:bg-stone-900 rounded-xl p-3"
                      >
                        <img
                          src={item.image}
                          alt=""
                          onError={e => {
                            e.currentTarget.style.visibility = 'hidden'
                          }}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 bg-stone-200 dark:bg-stone-800"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-snug line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="inline-flex items-center bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-full">
                              <button
                                type="button"
                                onClick={() => decrement(item.id)}
                                aria-label="Diminuir"
                                className="p-1.5 hover:text-brand-500 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2 text-sm font-semibold min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => increment(item.id)}
                                aria-label="Aumentar"
                                className="p-1.5 hover:text-brand-500 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label="Remover item"
                              className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-stone-200 dark:border-stone-800 px-5 py-4 safe-bottom space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-stone-500 dark:text-stone-400">Total</span>
                  <span className="text-2xl font-extrabold tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <WhatsAppIcon />
                  Finalizar pelo WhatsApp
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-sm text-stone-500 hover:text-red-500 transition-colors py-1"
                >
                  Esvaziar carrinho
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
    </svg>
  )
}
