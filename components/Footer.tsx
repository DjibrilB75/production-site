'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin, Play, Youtube } from 'lucide-react'
import { navLinks, companyInfo } from '@/lib/data'

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Linkedin,
  Play,
  Youtube,
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { platform: 'Vimeo', url: 'https://vimeo.com', icon: 'Play' },
  { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-6 lg:px-12 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-display text-3xl font-bold gradient-text">
                STUDIO
              </span>
            </motion.a>
            <p className="text-white/50 max-w-md leading-relaxed mb-6">
              {companyInfo.tagline}. We transform creative visions into
              compelling visual narratives that captivate and inspire.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
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
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-holographic-from/20 transition-colors group"
                    aria-label={social.platform}
                  >
                    {Icon && (
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-holographic-from transition-colors" />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-white/80 tracking-wider uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-holographic-from transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white/80 tracking-wider uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-white/50 hover:text-holographic-from transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="text-white/50 hover:text-holographic-from transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <span className="text-white/50">{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
