import { createContext, useCallback, useContext, useRef, useState } from 'react'

const UIContext = createContext(null)

let toastIdCounter = 0

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [flights, setFlights] = useState([])
  const cartTargetRef = useRef(null)

  const showToast = useCallback((message, opts = {}) => {
    const id = ++toastIdCounter
    setToasts(prev => [...prev, { id, message, type: opts.type ?? 'success' }])
    const ttl = opts.ttl ?? 2200
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, ttl)
  }, [])

  const flyToCart = useCallback((sourceRect, imageSrc) => {
    if (!cartTargetRef.current || !sourceRect) return
    const targetRect = cartTargetRef.current.getBoundingClientRect()
    const id = ++toastIdCounter
    setFlights(prev => [
      ...prev,
      {
        id,
        src: imageSrc,
        from: { x: sourceRect.left, y: sourceRect.top, w: sourceRect.width, h: sourceRect.height },
        to: { x: targetRect.left + targetRect.width / 2 - 14, y: targetRect.top + targetRect.height / 2 - 14 }
      }
    ])
    setTimeout(() => {
      setFlights(prev => prev.filter(f => f.id !== id))
    }, 900)
  }, [])

  const registerCartTarget = useCallback(el => {
    cartTargetRef.current = el
  }, [])

  return (
    <UIContext.Provider
      value={{ toasts, showToast, flights, flyToCart, registerCartTarget }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI deve ser usado dentro de UIProvider')
  return ctx
}
