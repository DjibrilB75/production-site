'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Pin } from 'lucide-react'
import { navLinks, companyInfo } from '@/lib/data'

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  Pin,
  Youtube,
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { platform: 'Pinterest', url: 'https://pinterest.com', icon: 'Pin' },
  { platform: 'Facebook',  url: 'https://facebook.com',  icon: 'Facebook' },
  { platform: 'YouTube',   url: 'https://youtube.com',   icon: 'Youtube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative pt-24 pb-10 px-6 lg:px-12">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-700/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="inline-flex flex-col mb-7"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-display text-3xl font-light text-white/90 tracking-wide">
                Sophie Laroche
              </span>
              <span className="font-accent text-[10px] text-gold-400 tracking-[0.4em] uppercase mt-0.5">
                Photographe de mariage
              </span>
            </motion.a>

            <p className="font-sans text-sm text-white/40 max-w-xs leading-relaxed mb-8">
              {companyInfo.tagline}. Reportages de mariage luxueux en France
              et à l&apos;international depuis 2012.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500/25 transition-all duration-300 group"
                    aria-label={social.platform}
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 text-white/40 group-hover:text-gold-400 transition-colors" />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-accent text-[10px] text-white/50 tracking-[0.35em] uppercase mb-7">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/40 hover:text-gold-300 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#hero" className="font-sans text-sm text-white/40 hover:text-gold-300 transition-colors duration-300">
                  Accueil
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-[10px] text-white/50 tracking-[0.35em] uppercase mb-7">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="font-sans text-sm text-white/40 hover:text-gold-300 transition-colors duration-300"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="font-sans text-sm text-white/40 hover:text-gold-300 transition-colors duration-300"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <span className="font-sans text-sm text-white/30 leading-relaxed">
                  {companyInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-line mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/25">
            &copy; {year} Sophie Laroche. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs text-white/25 hover:text-white/50 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="font-sans text-xs text-white/25 hover:text-white/50 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
