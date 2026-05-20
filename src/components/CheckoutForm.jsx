import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { formatPrice } from '../utils/format.js'

const initialForm = {
  name: '',
  phone: '',
  mode: 'delivery',
  address: '',
  complement: '',
  payment: 'pix',
  change: '',
  notes: ''
}

export default function CheckoutForm({ totals, onBack, onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const update = patch => setForm(prev => ({ ...prev, ...patch }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Informe seu nome'
    if (form.mode === 'delivery' && !form.address.trim()) e.address = 'Informe o endereço'
    if (form.payment === 'dinheiro' && form.change && Number(form.change) < totals.total) {
      e.change = `Mínimo ${formatPrice(totals.total)}`
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <header className="flex items-center gap-2 px-5 h-16 border-b border-stone-200 dark:border-stone-800 shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-lg">Seus dados</h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <Field label="Nome" error={errors.name} required>
          <input
            type="text"
            value={form.name}
            onChange={e => update({ name: e.target.value })}
            placeholder="Como podemos te chamar?"
            className={inputCls(errors.name)}
          />
        </Field>

        <Field label="Telefone" hint="Opcional, para contato">
          <input
            type="tel"
            value={form.phone}
            onChange={e => update({ phone: e.target.value })}
            placeholder="(11) 99999-9999"
            className={inputCls()}
          />
        </Field>

        <Field label="Como prefere receber?" required>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceCard
              selected={form.mode === 'delivery'}
              onClick={() => update({ mode: 'delivery' })}
              title="Entrega"
              subtitle={`+ ${formatPrice(totals.deliveryFee)}`}
            />
            <ChoiceCard
              selected={form.mode === 'pickup'}
              onClick={() => update({ mode: 'pickup' })}
              title="Retirar"
              subtitle="Sem taxa"
            />
          </div>
        </Field>

        {form.mode === 'delivery' && (
          <>
            <Field label="Endereço" error={errors.address} required>
              <input
                type="text"
                value={form.address}
                onChange={e => update({ address: e.target.value })}
                placeholder="Rua, número, bairro"
                className={inputCls(errors.address)}
              />
            </Field>
            <Field label="Complemento" hint="Apto, bloco, referência">
              <input
                type="text"
                value={form.complement}
                onChange={e => update({ complement: e.target.value })}
                placeholder="Ex.: Bloco B, apto 102"
                className={inputCls()}
              />
            </Field>
          </>
        )}

        <Field label="Pagamento" required>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceCard
              selected={form.payment === 'pix'}
              onClick={() => update({ payment: 'pix' })}
              title="PIX"
            />
            <ChoiceCard
              selected={form.payment === 'cartao'}
              onClick={() => update({ payment: 'cartao' })}
              title="Cartão"
            />
            <ChoiceCard
              selected={form.payment === 'dinheiro'}
              onClick={() => update({ payment: 'dinheiro' })}
              title="Dinheiro"
            />
          </div>
        </Field>

        {form.payment === 'dinheiro' && (
          <Field label="Troco para" hint="Deixe em branco se não precisar" error={errors.change}>
            <input
              type="number"
              min={totals.total}
              step="0.5"
              value={form.change}
              onChange={e => update({ change: e.target.value })}
              placeholder={`Ex.: ${(Math.ceil(totals.total / 10) * 10).toFixed(2)}`}
              className={inputCls(errors.change)}
            />
          </Field>
        )}

        <Field label="Observações gerais" hint="Opcional">
          <textarea
            value={form.notes}
            onChange={e => update({ notes: e.target.value.slice(0, 280) })}
            rows={2}
            placeholder="Algo que precisamos saber sobre o pedido?"
            className={inputCls() + ' resize-none'}
          />
        </Field>
      </div>

      <footer className="border-t border-stone-200 dark:border-stone-800 px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shrink-0 space-y-3 bg-white dark:bg-stone-950">
        <div className="space-y-1 text-sm">
          <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
          {form.mode === 'delivery' && totals.deliveryFee > 0 && (
            <Row label="Taxa de entrega" value={formatPrice(totals.deliveryFee)} />
          )}
          <Row
            label={<span className="font-bold text-base">Total</span>}
            value={
              <span className="font-extrabold text-base">
                {formatPrice(form.mode === 'delivery' ? totals.total : totals.subtotal)}
              </span>
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Enviar pelo WhatsApp
        </button>
      </footer>
    </form>
  )
}

function inputCls(error) {
  return [
    'w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border-2 text-sm transition-colors focus:outline-none',
    error
      ? 'border-red-400 focus:border-red-500'
      : 'border-stone-200 dark:border-stone-800 focus:border-brand-500'
  ].join(' ')
}

function Field({ label, hint, error, required, children }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-semibold">
          {label}
          {required && <span className="text-brand-500 ml-0.5">*</span>}
        </span>
        {hint && !error && (
          <span className="text-xs text-stone-400 dark:text-stone-500">{hint}</span>
        )}
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
      {children}
    </label>
  )
}

function ChoiceCard({ selected, onClick, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'p-3 rounded-xl border-2 text-center transition-all',
        selected
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
      ].join(' ')}
    >
      <p className="font-semibold text-sm">{title}</p>
      {subtitle && (
        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{subtitle}</p>
      )}
    </button>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-stone-500 dark:text-stone-400">{label}</span>
      <span>{value}</span>
    </div>
  )
}
