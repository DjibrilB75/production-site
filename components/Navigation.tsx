'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import { navLinks } from '@/lib/products'
import { useCartStore, cartCount } from '@/lib/store/cart'
import { useAuthStore } from '@/lib/store/auth'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const items = useCartStore((s) => s.items)
  const currentUser = useAuthStore((s) => s.currentUser)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
  }, [isMobileMenuOpen])

  const count = mounted ? cartCount(items) : 0
  // Only the home page has a dark fullscreen hero behind the nav — everywhere
  // else the background is light, so the nav must stay in its "scrolled" (dark text) look.
  const overDarkHero = pathname === '/' && !isScrolled

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          overDarkHero
            ? 'bg-transparent'
            : 'bg-dune-50/85 backdrop-blur-md border-b border-terracotta-200/40 shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative z-10">
              <span
                className={cn(
                  'font-display text-3xl tracking-wide transition-colors',
                  overDarkHero ? 'text-white drop-shadow-md' : 'text-terracotta-700'
                )}
              >
                Yurah
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide uppercase transition-colors',
                    overDarkHero
                      ? 'text-white/90 hover:text-white drop-shadow-sm'
                      : 'text-night-800/70 hover:text-terracotta-600'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={currentUser ? '/compte' : '/connexion'}
                className={cn(
                  'hidden sm:flex items-center gap-2 text-sm transition-colors',
                  overDarkHero ? 'text-white hover:text-white/80' : 'text-night-800/80 hover:text-terracotta-600'
                )}
              >
                <User className="w-5 h-5" />
                <span>{currentUser ? currentUser.name.split(' ')[0] : 'Connexion'}</span>
              </Link>

              <Link
                href="/panier"
                className={cn(
                  'relative flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                  overDarkHero ? 'text-white hover:bg-white/10' : 'text-night-800 hover:bg-sand-100'
                )}
                aria-label="Panier"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-terracotta-500 text-white text-[10px] font-semibold">
                    {count}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn('md:hidden p-2', overDarkHero ? 'text-white' : 'text-night-800')}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-dune-50/98 backdrop-blur-xl"
          >
            <div className="h-full flex flex-col items-center justify-center gap-8 px-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display text-terracotta-700"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-4 mt-6"
              >
                <Link
                  href={currentUser ? '/compte' : '/connexion'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-night-800/80"
                >
                  {currentUser ? `Bonjour, ${currentUser.name.split(' ')[0]}` : 'Se connecter'}
                </Link>
                <Link
                  href="/panier"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-night-800/80"
                >
                  Voir le panier ({count})
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
