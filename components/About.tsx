'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NextImage from 'next/image'
import { Camera, Heart, Image, Plane, Sparkles } from 'lucide-react'
import { services } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Heart,
  Image,
  Plane,
  Sparkles,
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return
    const el = ref.current
    gsap.to(
      { value: 0 },
      {
        value: end,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = Math.round(this.targets()[0].value) + suffix
        },
      }
    )
  }, [isInView, end, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-40 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-1/3 w-px h-40 bg-gradient-to-b from-transparent via-gold-600/30 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-t from-transparent via-gold-600/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-block font-accent text-[11px] text-gold-400 tracking-[0.4em] uppercase mb-5"
          >
            Mon histoire
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light max-w-4xl mx-auto leading-tight"
          >
            Capturer l&apos;éphémère,{' '}
            <em className="gold-text not-italic">
              sublimer l&apos;éternel
            </em>
          </motion.h2>
        </div>

        {/* ── Main bio grid ── */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-36">

          {/* Left – photographer portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Portrait image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <NextImage
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&q=80"
                alt="Sophie Laroche – photographe de mariage"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Gold overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-dark-800 border border-gold-700/30 rounded-2xl p-6 text-center glow-gold"
            >
              <div className="font-display text-4xl font-light gold-text">12</div>
              <div className="font-accent text-[9px] text-white/50 tracking-[0.3em] uppercase mt-1">
                Ans d&apos;expérience
              </div>
            </motion.div>
          </motion.div>

          {/* Right – bio text + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-8 italic">
              &ldquo;Je ne photographie pas des mariages.
              <br />
              Je photographie des émotions.&rdquo;
            </p>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-6">
              Photographe basée à Paris, je parcours la France et l&apos;Europe depuis 2012 pour
              immortaliser les unions les plus belles. Mon regard discret et sensible capture
              l&apos;instant décisif — ce frisson, ce sourire volé, cette larme de joie.
            </p>
            <p className="font-sans text-base text-white/40 leading-relaxed mb-10">
              Formée aux Beaux-Arts, je développe un style épuré, lumineux et intemporel.
              Chaque album est une œuvre : tirage fine art, reliure cuir, papier coton 300 g/m².
            </p>

            <div className="gold-line w-20 mb-10" />

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: 340, suffix: '+', label: 'Mariages' },
                { number: 18,  suffix: '',  label: 'Pays' },
                { number: 9,   suffix: '',  label: 'Prix' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="font-display text-4xl font-light gold-text">
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="font-accent text-[10px] text-white/40 tracking-[0.3em] uppercase mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 mt-12 px-8 py-4 rounded-full border border-gold-500/40 text-gold-300 font-sans text-sm tracking-wider hover:bg-gold-500/10 hover:border-gold-400/60 transition-all duration-300"
            >
              Écrire à Sophie
              <span className="w-6 h-px bg-gold-400/60" />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Services / Prestations ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-accent text-[11px] text-gold-400 tracking-[0.4em] uppercase">
              Prestations
            </span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index, duration: 0.7 }}
                  whileHover={{ y: -4 }}
                  className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-gold-600/25 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-700/20 to-gold-900/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon className="w-5 h-5 text-gold-400" />}
                  </div>
                  <h4 className="font-display text-base font-light text-white/80 mb-1.5 leading-tight">
                    {service.label}
                  </h4>
                  <p className="font-sans text-xs text-white/35 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
