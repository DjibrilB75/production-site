'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-dark-900/70 backdrop-blur-xl border-b border-gold-800/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 flex flex-col leading-none"
            >
              <span className="font-display text-xl font-light tracking-[0.15em] text-white/90">
                Sophie
              </span>
              <span className="font-accent text-[10px] tracking-[0.5em] text-gold-400 uppercase -mt-0.5">
                Laroche
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  className="relative font-sans text-xs font-light text-white/60 hover:text-white/90 tracking-[0.2em] uppercase transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400/70 transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            {/* CTA – Desktop */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-500/35 text-gold-300 text-xs font-sans tracking-[0.15em] uppercase hover:bg-gold-500/10 hover:border-gold-400/60 transition-all duration-300"
            >
              Réserver
            </motion.a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {/* Thin gold separator line */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-dark-900/97 backdrop-blur-2xl" />

            {/* Background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />

            <div className="relative h-full flex flex-col items-center justify-center gap-10 px-8">
              {/* Brand */}
              <div className="flex flex-col items-center mb-4">
                <span className="font-display text-3xl font-light text-white/90 tracking-wide">Sophie Laroche</span>
                <span className="font-accent text-[9px] text-gold-400 tracking-[0.5em] uppercase mt-1">Photographe de mariage</span>
              </div>

              <div className="gold-line w-16" />

              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.08 * index }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl font-light text-white/80 hover:text-gold-300 transition-colors tracking-wide"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-10 py-4 rounded-full border border-gold-500/40 text-gold-300 font-sans text-sm tracking-widest uppercase hover:bg-gold-500/10 transition-all"
              >
                Réserver votre date
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
