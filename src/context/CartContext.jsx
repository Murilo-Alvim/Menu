import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'menu-cart'

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
    case 'ADD': {
      const existing = state.find(it => it.id === action.item.id)
      if (existing) {
        return state.map(it =>
          it.id === action.item.id ? { ...it, quantity: it.quantity + 1 } : it
        )
      }
      return [...state, { ...action.item, quantity: 1 }]
    }
    case 'INCREMENT':
      return state.map(it =>
        it.id === action.id ? { ...it, quantity: it.quantity + 1 } : it
      )
    case 'DECREMENT':
      return state
        .map(it =>
          it.id === action.id ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter(it => it.quantity > 0)
    case 'REMOVE':
      return state.filter(it => it.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, it) => sum + it.quantity, 0)
    const totalPrice = items.reduce((sum, it) => sum + it.quantity * it.price, 0)
    return {
      items,
      totalItems,
      totalPrice,
      add: item => dispatch({ type: 'ADD', item }),
      increment: id => dispatch({ type: 'INCREMENT', id }),
      decrement: id => dispatch({ type: 'DECREMENT', id }),
      remove: id => dispatch({ type: 'REMOVE', id }),
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
