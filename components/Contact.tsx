'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react'
import { companyInfo } from '@/lib/data'

const contactSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  weddingDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const budgetOptions = [
    { value: '',          label: 'Votre budget' },
    { value: '2k-3k',    label: '2 000 € – 3 000 €' },
    { value: '3k-5k',    label: '3 000 € – 5 000 €' },
    { value: '5k-8k',    label: '5 000 € – 8 000 €' },
    { value: '8k+',      label: '8 000 € et plus' },
  ]

  return (
    <section id="contact" className="relative py-40 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Soft gold radial */}
      <div className="absolute top-1/3 right-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(194,128,154,0.05),transparent_60%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-block font-accent text-[11px] text-gold-400 tracking-[0.4em] uppercase mb-5"
          >
            Réservation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-tight"
          >
            Votre jour{' '}
            <em className="gold-text not-italic">mérite le meilleur</em>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left – contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl font-light text-white/60 leading-relaxed mb-14 italic">
              Chaque mariage est unique. Racontez-moi votre histoire —
              je vous réponds sous 24 heures.
            </p>

            <div className="space-y-8">
              {/* Email */}
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-gold-800/25 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/40 transition-all duration-300">
                  <Mail className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="font-accent text-[10px] text-white/30 tracking-[0.3em] uppercase mb-1">E-mail</p>
                  <p className="font-sans text-sm text-white/70 group-hover:text-gold-300 transition-colors">
                    {companyInfo.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-gold-800/25 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/40 transition-all duration-300">
                  <Phone className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="font-accent text-[10px] text-white/30 tracking-[0.3em] uppercase mb-1">Téléphone</p>
                  <p className="font-sans text-sm text-white/70 group-hover:text-gold-300 transition-colors">
                    {companyInfo.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-gold-800/25 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="font-accent text-[10px] text-white/30 tracking-[0.3em] uppercase mb-1">Disponibilité</p>
                  <p className="font-sans text-sm text-white/50">{companyInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Quote / reassurance */}
            <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-gold-800/20">
              <p className="font-display text-xl font-light text-white/50 italic leading-relaxed">
                &ldquo;Les places sont limitées — je ne photographie que 30 mariages par an
                pour offrir à chaque couple une attention totale.&rdquo;
              </p>
              <span className="block mt-4 font-accent text-[10px] text-gold-500 tracking-[0.3em] uppercase">
                Sophie Laroche
              </span>
            </div>
          </motion.div>

          {/* Right – booking form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2.5">
                  Vos prénoms
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  placeholder="Camille & Alexandre"
                  className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 font-sans text-sm placeholder-white/20 focus:border-gold-500/40 focus:outline-none focus:bg-white/[0.06] transition-all"
                />
                {errors.name && (
                  <p className="mt-1.5 font-sans text-xs text-rose-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2.5">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  placeholder="camille@exemple.fr"
                  className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 font-sans text-sm placeholder-white/20 focus:border-gold-500/40 focus:outline-none focus:bg-white/[0.06] transition-all"
                />
                {errors.email && (
                  <p className="mt-1.5 font-sans text-xs text-rose-400">{errors.email.message}</p>
                )}
              </div>

              {/* Date + Budget row */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="weddingDate" className="block font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2.5">
                    Date du mariage
                  </label>
                  <input
                    type="date"
                    id="weddingDate"
                    {...register('weddingDate')}
                    className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 font-sans text-sm focus:border-gold-500/40 focus:outline-none focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2.5">
                    Budget
                  </label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className="w-full px-5 py-3.5 bg-dark-800 border border-white/[0.08] rounded-xl text-white/60 font-sans text-sm focus:border-gold-500/40 focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    {budgetOptions.map((o) => (
                      <option key={o.value} value={o.value} className="bg-dark-800">
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2.5">
                  Votre histoire
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  placeholder="Racontez-moi votre projet de mariage, le lieu, l'ambiance souhaitée..."
                  className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 font-sans text-sm placeholder-white/20 focus:border-gold-500/40 focus:outline-none focus:bg-white/[0.06] transition-all resize-none leading-relaxed"
                />
                {errors.message && (
                  <p className="mt-1.5 font-sans text-xs text-rose-400">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                className="w-full relative px-8 py-4 font-sans text-sm tracking-wider text-dark-900 overflow-hidden rounded-full disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {/* Gold gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2 font-medium">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Message envoyé !
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer ma demande
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
