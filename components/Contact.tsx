'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react'
import { companyInfo } from '@/lib/data'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const budgetOptions = [
    { value: '', label: 'Select budget range' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
  ]

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-holographic-from/10 to-holographic-via1/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-holographic-from tracking-[0.3em] uppercase mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            Let&apos;s Create{' '}
            <span className="gradient-text">Together</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Ready to bring your vision to life? We&apos;d love to hear about your project.
              Reach out and let&apos;s start a conversation.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-holographic-from/20 transition-colors">
                  <Mail className="w-5 h-5 text-holographic-from" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">Email us</p>
                  <p className="text-white group-hover:text-holographic-from transition-colors">
                    {companyInfo.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-holographic-from/20 transition-colors">
                  <Phone className="w-5 h-5 text-holographic-from" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">Call us</p>
                  <p className="text-white group-hover:text-holographic-from transition-colors">
                    {companyInfo.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-holographic-from" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">Location</p>
                  <p className="text-white">{companyInfo.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-holographic-from focus:outline-none focus:ring-1 focus:ring-holographic-from transition-colors"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-holographic-from focus:outline-none focus:ring-1 focus:ring-holographic-from transition-colors"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm text-white/60 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  id="budget"
                  {...register('budget')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-holographic-from focus:outline-none focus:ring-1 focus:ring-holographic-from transition-colors appearance-none cursor-pointer"
                >
                  {budgetOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-dark-800"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-holographic-from focus:outline-none focus:ring-1 focus:ring-holographic-from transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                className="w-full relative px-8 py-4 font-medium text-white overflow-hidden rounded-lg disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-holographic-from via-holographic-via1 to-holographic-via2 transition-transform group-hover:scale-105" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
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
