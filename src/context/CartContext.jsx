import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'menu-cart-v2'

function loadInitial() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_LINE': {
      const existing = state.find(it => it.lineId === action.line.lineId)
      if (existing) {
        return state.map(it =>
          it.lineId === action.line.lineId
            ? { ...it, quantity: it.quantity + action.line.quantity }
            : it
        )
      }
      return [...state, action.line]
    }
    case 'INCREMENT':
      return state.map(it =>
        it.lineId === action.lineId ? { ...it, quantity: it.quantity + 1 } : it
      )
    case 'DECREMENT':
      return state
        .map(it =>
          it.lineId === action.lineId ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter(it => it.quantity > 0)
    case 'REMOVE':
      return state.filter(it => it.lineId !== action.lineId)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function makeLineId(itemId, sizeId, extras) {
  const extraIds = (extras ?? []).map(e => e.id).sort().join('+')
  return [itemId, sizeId || 'base', extraIds || 'noex'].join('|')
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, it) => sum + it.quantity, 0)
    const totalPrice = items.reduce((sum, it) => sum + it.quantity * it.unitPrice, 0)

    const addLine = ({ item, size = null, extras = [], observations = '', quantity = 1 }) => {
      const extrasPrice = extras.reduce((s, e) => s + e.price, 0)
      const sizeDelta = size?.priceDelta ?? 0
      const unitPrice = item.price + sizeDelta + extrasPrice
      const lineId = makeLineId(item.id, size?.id, extras)

      const line = {
        lineId,
        itemId: item.id,
        name: item.name,
        image: item.image,
        unitPrice,
        quantity,
        size: size ? { id: size.id, label: size.label } : null,
        extras: extras.map(e => ({ id: e.id, name: e.name, price: e.price })),
        observations: observations.trim()
      }

      dispatch({ type: 'ADD_LINE', line })
    }

    return {
      items,
      totalItems,
      totalPrice,
      addLine,
      increment: lineId => dispatch({ type: 'INCREMENT', lineId }),
      decrement: lineId => dispatch({ type: 'DECREMENT', lineId }),
      remove: lineId => dispatch({ type: 'REMOVE', lineId }),
      clear: () => dispatch({ type: 'CLEAR' })
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
