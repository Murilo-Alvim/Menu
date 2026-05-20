import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import { buildWhatsAppMessage, formatPrice } from '../utils/format.js'
import CheckoutForm from './CheckoutForm.jsx'

export default function Cart({ open, onClose, restaurant }) {
  const { items, totalItems, totalPrice, increment, decrement, remove, clear } = useCart()
  const { showToast } = useUI()
  const [step, setStep] = useState('cart')

  useEffect(() => {
    if (!open) setStep('cart')
  }, [open])

  const totals = {
    subtotal: totalPrice,
    deliveryFee: restaurant.deliveryFee ?? 0,
    total: totalPrice + (restaurant.deliveryFee ?? 0)
  }

  const handleSubmit = customer => {
    const finalTotal =
      customer.mode === 'delivery' ? totals.total : totals.subtotal
    const message = buildWhatsAppMessage({
      restaurant,
      items,
      customer,
      totals: {
        subtotal: totals.subtotal,
        deliveryFee: customer.mode === 'delivery' ? totals.deliveryFee : 0,
        total: finalTotal
      }
    })
    const url = `https://wa.me/${restaurant.phone}?text=${message}`
    window.open(url, '_blank', 'noopener,noreferrer')
    showToast('Pedido enviado para o WhatsApp!')
    clear()
    onClose()
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
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-white dark:bg-stone-950 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Carrinho de pedidos"
          >
            {step === 'cart' ? (
              <CartList
                items={items}
                totalItems={totalItems}
                totals={totals}
                restaurant={restaurant}
                increment={increment}
                decrement={decrement}
                remove={remove}
                clear={clear}
                onClose={onClose}
                onCheckout={() => setStep('form')}
              />
            ) : (
              <CheckoutForm
                totals={totals}
                onBack={() => setStep('cart')}
                onSubmit={handleSubmit}
              />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CartList({ items, totalItems, totals, restaurant, increment, decrement, remove, clear, onClose, onCheckout }) {
  return (
    <>
      <header className="flex items-center justify-between px-5 h-16 border-b border-stone-200 dark:border-stone-800 shrink-0">
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
                  key={item.lineId}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 items-start bg-stone-50 dark:bg-stone-900 rounded-xl p-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    onError={e => { e.currentTarget.style.visibility = 'hidden' }}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-stone-200 dark:bg-stone-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-snug">
                      {item.name}
                      {item.size && (
                        <span className="text-stone-500 dark:text-stone-400 font-normal">
                          {' '}· {item.size.label}
                        </span>
                      )}
                    </p>
                    {item.extras?.length > 0 && (
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        + {item.extras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    {item.observations && (
                      <p className="text-[11px] italic text-stone-500 dark:text-stone-400 mt-0.5">
                        "{item.observations}"
                      </p>
                    )}
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-1">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-full">
                        <button
                          type="button"
                          onClick={() => decrement(item.lineId)}
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
                          onClick={() => increment(item.lineId)}
                          aria-label="Aumentar"
                          className="p-1.5 hover:text-brand-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.lineId)}
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
        <footer className="border-t border-stone-200 dark:border-stone-800 px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-3 shrink-0">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-stone-500 dark:text-stone-400">Subtotal</span>
            <span className="text-xl font-extrabold tracking-tight">
              {formatPrice(totals.subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={onCheckout}
            className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
          >
            Continuar para checkout
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
    </>
  )
}
