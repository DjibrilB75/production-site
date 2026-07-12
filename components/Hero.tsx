'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const SLIDES = [
  { src: '/hero/dune-sunset.png', alt: 'Sac Yurah posé sur une dune au coucher du soleil' },
  { src: '/hero/oasis-rider.png', alt: 'Sac Yurah porté dans une oasis' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-night-900"
      style={{ opacity }}
    >
      {SLIDES.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1.08 : 1 }}
          transition={{ opacity: { duration: 1.5, ease: 'easeInOut' }, scale: { duration: 7, ease: 'easeOut' } }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Warm desert color grade */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-900/50 via-night-900/10 to-night-900/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-terracotta-900/40 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs md:text-sm tracking-[0.5em] uppercase text-sand-100/90 mb-5"
        >
          Maroquinerie artisanale
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-6xl md:text-8xl text-white drop-shadow-lg mb-6"
        >
          Yurah
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="max-w-md text-white/85 text-base md:text-lg mb-10"
        >
          Des sacs façonnés à la main, dans les teintes chaudes du sable et
          du crépuscule saharien.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          href="#boutique"
          className="inline-flex items-center px-8 py-4 text-sm tracking-widest uppercase font-medium text-night-900 bg-sand-100 rounded-full hover:bg-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          Découvrir la collection
        </motion.a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/60 tracking-widest uppercase">Défiler</span>
          <ChevronDown className="w-4 h-4 text-white/60" />
        </motion.div>
      </div>
    </motion.section>
  )
}
