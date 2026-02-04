'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const studioTextRef = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Studio text animation
      gsap.fromTo(
        studioTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )

      // CTA buttons animation
      gsap.fromTo(
        '.cta-left',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      )

      gsap.fromTo(
        '.cta-right',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      )

      // Scroll indicator animation
      gsap.fromTo(
        '.scroll-indicator',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Play video when it's in view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ opacity }}
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Subtle Gradient Overlays - Reduced opacity for 80-90% video visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-transparent to-dark-900/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/20 via-transparent to-dark-900/20" />

        {/* Subtle holographic overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-gradient-to-br from-holographic-from via-transparent to-transparent" />
      </motion.div>

      {/* Studio Text - Centered */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.p
          ref={studioTextRef}
          className="text-sm md:text-base lg:text-lg font-medium text-white/90 tracking-[0.4em] uppercase"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Cinema Production Studio
        </motion.p>
      </div>

      {/* CTA Button - Bottom Left */}
      <motion.a
        href="#work"
        className="cta-left absolute bottom-16 md:bottom-20 left-6 md:left-12 z-10 group"
      >
        <span className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-sm font-medium text-white rounded-full transition-all duration-300 backdrop-blur-xl bg-violet-500/15 border border-white/20 hover:bg-violet-500/25 hover:border-violet-500/50 hover:-translate-y-0.5 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-violet-500/20">
          View Our Work
        </span>
      </motion.a>

      {/* CTA Button - Bottom Right */}
      <motion.a
        href="#contact"
        className="cta-right absolute bottom-16 md:bottom-20 right-6 md:right-12 z-10 group"
      >
        <span className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-sm font-medium text-white rounded-full transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 shadow-lg shadow-black/10 hover:shadow-xl">
          Start a Project
        </span>
      </motion.a>

      {/* Scroll Indicator - Centered Bottom */}
      <div className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </div>

      {/* Decorative Elements - Subtle */}
      <div className="absolute top-1/4 left-8 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
      <div className="absolute top-1/4 right-8 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
    </motion.section>
  )
}
