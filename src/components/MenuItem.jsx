import { Plus, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import { formatPrice } from '../utils/format.js'

const tagStyles = {
  vegetariano: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  vegano: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'sem glúten': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'chef recomenda': 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
}

export default function MenuItem({ item, onOpenDetail }) {
  const { addLine, items: cartItems } = useCart()
  const { showToast, flyToCart } = useUI()
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef(null)

  const inCartQty = cartItems
    .filter(c => c.itemId === item.id)
    .reduce((s, c) => s + c.quantity, 0)

  const hasOptions = (item.sizes?.length ?? 0) > 0 || (item.extras?.length ?? 0) > 0

  const handleAddClick = e => {
    e.stopPropagation()
    if (hasOptions) {
      onOpenDetail(item)
      return
    }
    addLine({ item, quantity: 1 })
    const rect = imgRef.current?.getBoundingClientRect()
    if (rect) flyToCart(rect, item.image)
    showToast(`${item.name} adicionado`)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpenDetail(item)}
      className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/70 dark:border-stone-800 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-900 transition-all cursor-pointer"
    >
      <div className="relative sm:w-40 sm:h-40 h-44 w-full shrink-0 overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center">
        {!imgLoaded && !imgFailed && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700" />
        )}
        {imgFailed ? (
          <UtensilsCrossed size={40} className="text-brand-400 dark:text-stone-500" />
        ) : (
          <img
            ref={imgRef}
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-base leading-snug">{item.name}</h3>
            <span className="text-brand-600 dark:text-brand-400 font-bold whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
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
        </div>

        <div className="mt-3 flex items-center justify-between">
          {inCartQty > 0 ? (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {inCartQty} no carrinho
            </span>
          ) : (
            <span className="text-xs text-stone-400">
              {hasOptions ? 'Toque para personalizar' : 'Toque para adicionar'}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handleAddClick}
            className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-sm font-semibold px-3.5 py-2 rounded-full shadow-sm transition-colors"
          >
            <Plus size={16} strokeWidth={3} />
            Adicionar
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
