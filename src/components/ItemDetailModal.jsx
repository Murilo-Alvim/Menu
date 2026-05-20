import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import { formatPrice } from '../utils/format.js'

const tagStyles = {
  vegetariano: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  vegano: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'sem glúten': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'chef recomenda': 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
}

export default function ItemDetailModal({ item, open, onClose }) {
  const { addLine } = useCart()
  const { showToast, flyToCart } = useUI()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [observations, setObservations] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (open && item) {
      setSelectedSize(item.sizes?.[0] ?? null)
      setSelectedExtras([])
      setObservations('')
      setQuantity(1)
    }
  }, [open, item])

  useEffect(() => {
    if (!open) return
    const handler = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const total = useMemo(() => {
    if (!item) return 0
    const sizeDelta = selectedSize?.priceDelta ?? 0
    const extrasPrice = selectedExtras.reduce((s, e) => s + e.price, 0)
    return (item.price + sizeDelta + extrasPrice) * quantity
  }, [item, selectedSize, selectedExtras, quantity])

  if (!item) return null

  const toggleExtra = extra => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    )
  }

  const handleAdd = e => {
    addLine({
      item,
      size: selectedSize,
      extras: selectedExtras,
      observations,
      quantity
    })
    const rect = e.currentTarget.getBoundingClientRect()
    flyToCart(rect, item.image)
    showToast(`${quantity}× ${item.name} adicionado`)
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
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 sm:inset-0 sm:m-auto sm:max-w-2xl sm:max-h-[90vh] sm:rounded-3xl bg-white dark:bg-stone-950 z-50 rounded-t-3xl overflow-hidden flex flex-col max-h-[92vh]"
            role="dialog"
            aria-labelledby="item-detail-title"
          >
            <div className="relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 sm:h-72 object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-900 flex items-center justify-center backdrop-blur-md shadow-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5">
              <div className="flex items-start justify-between gap-3">
                <h2 id="item-detail-title" className="text-2xl font-bold tracking-tight">
                  {item.name}
                </h2>
                <span className="text-brand-600 dark:text-brand-400 font-bold whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
              </div>

              {item.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.tags.map(t => (
                    <span
                      key={t}
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${tagStyles[t] ?? 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.longDescription ?? item.description}
              </p>

              {item.sizes?.length > 0 && (
                <Group title="Tamanho" required>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sizes.map(size => {
                      const isSelected = selectedSize?.id === size.id
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={[
                            'p-3 rounded-xl border-2 text-left transition-all',
                            isSelected
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          ].join(' ')}
                        >
                          <p className="font-semibold text-sm">{size.label}</p>
                          {size.priceDelta > 0 && (
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              + {formatPrice(size.priceDelta)}
                            </p>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </Group>
              )}

              {item.extras?.length > 0 && (
                <Group title="Adicionais" subtitle="Opcional">
                  <div className="space-y-2">
                    {item.extras.map(extra => {
                      const isSelected = !!selectedExtras.find(e => e.id === extra.id)
                      return (
                        <label
                          key={extra.id}
                          className={[
                            'flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all',
                            isSelected
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          ].join(' ')}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleExtra(extra)}
                            className="w-4 h-4 accent-brand-500"
                          />
                          <span className="flex-1 text-sm font-medium">{extra.name}</span>
                          <span className="text-sm text-stone-500 dark:text-stone-400">
                            + {formatPrice(extra.price)}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </Group>
              )}

              <Group title="Observações" subtitle="Opcional">
                <textarea
                  value={observations}
                  onChange={e => setObservations(e.target.value.slice(0, 200))}
                  placeholder="Ex.: sem cebola, ponto da carne, etc."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 focus:border-brand-500 focus:outline-none text-sm resize-none transition-colors"
                />
                <p className="text-[11px] text-stone-400 mt-1 text-right">
                  {observations.length}/200
                </p>
              </Group>
            </div>

            <footer className="border-t border-stone-200 dark:border-stone-800 px-5 sm:px-7 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center gap-4 bg-white dark:bg-stone-950">
              <div className="inline-flex items-center bg-stone-100 dark:bg-stone-900 rounded-full">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="p-2.5 hover:text-brand-500 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 font-bold min-w-[28px] text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="p-2.5 hover:text-brand-500 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold py-3 rounded-full transition-colors shadow-sm flex items-center justify-center gap-3"
              >
                <span>Adicionar</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {formatPrice(total)}
                </span>
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Group({ title, subtitle, required, children }) {
  return (
    <section className="mt-5">
      <header className="flex items-baseline justify-between mb-2">
        <h3 className="font-bold text-sm">
          {title}
          {required && <span className="text-brand-500 ml-1">*</span>}
        </h3>
        {subtitle && (
          <span className="text-xs text-stone-400 dark:text-stone-500">{subtitle}</span>
        )}
      </header>
      {children}
    </section>
  )
}
