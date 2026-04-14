'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ChevronDown } from 'lucide-react'

const WeddingRing = dynamic(
  () => import('@/components/3d/WeddingRing'),
  { ssr: false }
)

// Photo count must match WEDDING_PHOTOS array in WeddingRing.tsx
const PHOTO_COUNT = 6

export default function WeddingHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)

  // framer-motion scroll for text fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.12], [0, -40])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  // Active photo index driven by raw scroll
  const activePhoto = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      scrollRef.current = progress
      // 4 rotations × 2 faces = 8 milestones, each milestone = 1 photo
      activePhoto.current = Math.floor(progress * 8) % PHOTO_COUNT
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      // 300 vh gives enough scroll room for 4 full ring rotations
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport – stays in view while section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Radial dark background */}
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />
        </div>

        {/* 3D Wedding Ring Canvas – fills the viewport */}
        <WeddingRing
          scrollProgress={scrollRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* ── Hero text overlay ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-accent text-xs text-gold-400 uppercase tracking-[0.4em] mb-6"
          >
            Photographe de mariage
          </motion.span>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-center leading-none"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white/90 tracking-tight">
              Sophie
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light gold-text tracking-tight mt-1">
              Laroche
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
            className="font-sans text-sm md:text-base text-white/40 tracking-[0.25em] uppercase mt-8"
          >
            L&apos;art de capturer l&apos;amour
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-5 mt-12 pointer-events-auto"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold-500/40 text-gold-300 text-sm tracking-wider font-sans hover:bg-gold-500/10 hover:border-gold-400/60 transition-all duration-300"
            >
              Voir le portfolio
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold-500/15 border border-gold-400/50 text-gold-200 text-sm tracking-wider font-sans hover:bg-gold-500/25 transition-all duration-300"
            >
              Réserver votre date
            </a>
          </motion.div>
        </motion.div>

        {/* Photo progress dots */}
        <PhotoDots
          scrollYProgress={scrollYProgress}
          count={PHOTO_COUNT}
        />

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-accent text-[10px] text-white/30 tracking-[0.3em] uppercase">
            Défiler
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-gold-400/50" />
          </motion.div>
        </motion.div>

        {/* Thin horizontal gold line – decorative */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>
    </section>
  )
}

// ── Photo progress indicator dots ──
function PhotoDots({
  scrollYProgress,
  count,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  count: number
}) {
  const opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProgressDot key={i} index={i} total={count} scrollYProgress={scrollYProgress} />
      ))}
    </motion.div>
  )
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = (index + 1) / total

  // Map 0..1 scroll to active range for this dot (8 milestones, 6 photos)
  // progress 0.05..0.95 is the "active" scroll window inside the section
  const active = useTransform(scrollYProgress, [
    0.05 + start * 0.9,
    0.05 + (start + 0.01) * 0.9,
    0.05 + (end - 0.01) * 0.9,
    0.05 + end * 0.9,
  ], [0, 1, 1, 0])

  const scale = useTransform(active, [0, 1], [0.6, 1])

  return (
    <motion.div
      style={{ scale }}
      className="w-1.5 h-1.5 rounded-full border border-gold-400/40 bg-transparent overflow-hidden"
    >
      <motion.div
        style={{ scaleY: active }}
        className="w-full h-full bg-gold-400 origin-top"
      />
    </motion.div>
  )
}
