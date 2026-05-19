import { motion } from 'framer-motion'
import { Clock, MapPin, Phone } from 'lucide-react'

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  )
}

function formatPhoneDisplay(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 13) {
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
  }
  return phone
}

export default function Contact({ restaurant }) {
  const whatsappUrl = `https://wa.me/${restaurant.phone}?text=${encodeURIComponent(
    `Olá! Gostaria de mais informações sobre o ${restaurant.name}.`
  )}`

  const infoCards = [
    {
      icon: MapPin,
      label: 'Endereço',
      value: restaurant.address,
      accent: 'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
    },
    {
      icon: Clock,
      label: 'Horário',
      value: restaurant.hours,
      accent: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: formatPhoneDisplay(restaurant.phone),
      accent: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
    }
  ]

  return (
    <section id="contato" className="mt-16 pt-8 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 sm:mb-14"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-500">
          CONTATO
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Fale com a gente
        </h2>
        <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Tire dúvidas, faça reservas ou peça pelo WhatsApp — respondemos rapidinho.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {infoCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.accent}`}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {card.label}
                </p>
                <p className="mt-1 font-medium text-sm leading-snug break-words">
                  {card.value}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 px-5 sm:px-6 py-5 text-white flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" aria-hidden />

        <div className="relative flex-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            Peça agora pelo WhatsApp
          </h3>
          <p className="text-sm text-emerald-50/90">
            Atendimento direto, confirmação em minutos.
          </p>
        </div>

        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold text-sm px-4 py-2.5 rounded-full shadow-md hover:bg-emerald-50 transition-colors shrink-0"
        >
          <WhatsAppIcon size={16} />
          Chamar no WhatsApp
        </motion.a>
      </motion.div>
    </section>
  )
}
