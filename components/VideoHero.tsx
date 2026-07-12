'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-night-900"
      style={{ opacity }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.85) sepia(0.18) contrast(1.02)' }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Warm desert color grade */}
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-900/45 via-terracotta-700/10 to-night-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-900/50 via-transparent to-transparent" />
        <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-sand-300/25 via-transparent to-terracotta-500/20" />
      </motion.div>

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
          Néra
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
