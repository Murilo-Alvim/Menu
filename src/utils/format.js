const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function formatPrice(value) {
  return formatter.format(value)
}

export function buildWhatsAppMessage({ restaurant, items, totalPrice }) {
  const lines = [
    `*Novo pedido — ${restaurant.name}*`,
    '',
    ...items.map(
      it => `• ${it.quantity}x ${it.name} — ${formatPrice(it.price * it.quantity)}`
    ),
    '',
    `*Total:* ${formatPrice(totalPrice)}`
  ]
  return encodeURIComponent(lines.join('\n'))
}
