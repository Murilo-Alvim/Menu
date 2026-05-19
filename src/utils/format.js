const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function formatPrice(value) {
  return formatter.format(value)
}

export function buildWhatsAppMessage({ restaurant, items, customer, totals }) {
  const deliveryLine =
    customer.mode === 'delivery'
      ? `📍 *Entrega:* ${customer.address}${customer.complement ? ' - ' + customer.complement : ''}`
      : '🏃 *Retirar no local*'

  const paymentLine = (() => {
    if (customer.payment === 'dinheiro') {
      return customer.change
        ? `💵 *Pagamento:* Dinheiro (troco para ${formatPrice(Number(customer.change))})`
        : '💵 *Pagamento:* Dinheiro (sem troco)'
    }
    if (customer.payment === 'pix') return '💳 *Pagamento:* PIX'
    if (customer.payment === 'cartao') return '💳 *Pagamento:* Cartão na entrega'
    return ''
  })()

  const itemLines = items.flatMap(it => {
    const lines = [`• ${it.quantity}× ${it.name}${it.size ? ' (' + it.size.label + ')' : ''} — ${formatPrice(it.unitPrice * it.quantity)}`]
    if (it.extras?.length) {
      lines.push(`   + ${it.extras.map(e => e.name).join(', ')}`)
    }
    if (it.observations) {
      lines.push(`   ✏️ ${it.observations}`)
    }
    return lines
  })

  const lines = [
    `*Novo pedido — ${restaurant.name}*`,
    '',
    `👤 *Cliente:* ${customer.name}`,
    ...(customer.phone ? [`📞 *Telefone:* ${customer.phone}`] : []),
    deliveryLine,
    paymentLine,
    '',
    '*Itens:*',
    ...itemLines,
    '',
    `Subtotal: ${formatPrice(totals.subtotal)}`
  ]

  if (totals.deliveryFee > 0) {
    lines.push(`Taxa de entrega: ${formatPrice(totals.deliveryFee)}`)
  }
  lines.push(`*Total:* ${formatPrice(totals.total)}`)

  if (customer.notes) {
    lines.push('', `📝 *Observações gerais:* ${customer.notes}`)
  }

  return encodeURIComponent(lines.join('\n'))
}
