'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Video, Film, Palette, Plane } from 'lucide-react'
import { services } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Video,
  Film,
  Palette,
  Plane,
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const element = ref.current
    const duration = 2
    const start = 0

    gsap.to(
      { value: start },
      {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: function () {
          element.textContent = Math.round(this.targets()[0].value) + suffix
        },
      }
    )
  }, [isInView, end, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-holographic-from/50 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-holographic-via1/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-holographic-from tracking-[0.3em] uppercase mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight"
          >
            We Create{' '}
            <span className="gradient-text">Immersive</span> Visual Experiences
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-8">
              We are a collective of filmmakers, photographers, and visual artists
              dedicated to pushing the boundaries of storytelling through motion
              and light.
            </p>
            <p className="text-lg text-white/50 leading-relaxed mb-8">
              From concept to final delivery, we craft every frame with precision
              and passion. Our work spans commercials, brand films, music videos,
              and documentary features for clients worldwide.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 text-holographic-from font-medium group"
            >
              <span>Let&apos;s work together</span>
              <span className="w-8 h-px bg-holographic-from transform origin-left group-hover:scale-x-150 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: 150, suffix: '+', label: 'Projects Completed' },
              { number: 50, suffix: '+', label: 'Global Clients' },
              { number: 12, suffix: '', label: 'Industry Awards' },
              { number: 8, suffix: '', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="text-center lg:text-left"
              >
                <div className="font-accent text-5xl md:text-6xl font-bold gradient-text mb-2">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/50 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl md:text-3xl font-display font-bold mb-12"
          >
            Our Services
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-holographic-from/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-holographic-from/20 to-holographic-via1/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="w-6 h-6 text-holographic-from" />}
                  </div>
                  <h4 className="font-medium text-white mb-1">{service.label}</h4>
                  <p className="text-xs text-white/40">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
