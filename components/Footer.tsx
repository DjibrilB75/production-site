import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'
import { navLinks, companyInfo } from '@/lib/products'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-6 lg:px-12 bg-night-900 text-dune-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="font-display text-3xl text-sand-200">Néra</span>
            </Link>
            <p className="text-dune-100/60 max-w-md leading-relaxed mb-6">
              {companyInfo.tagline}. Des sacs à main façonnés à la main en cuir
              pleine fleur, dans les teintes chaudes du sable et du crépuscule.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-terracotta-500/30 transition-colors"
                  aria-label="Réseau social"
                >
                  <Icon className="w-4 h-4 text-sand-200" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-sand-200/80 tracking-widest uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-dune-100/60 hover:text-sand-200 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/panier" className="text-dune-100/60 hover:text-sand-200 transition-colors">
                  Mon panier
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-sand-200/80 tracking-widest uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-dune-100/60">
              <li>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-sand-200 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li>{companyInfo.phone}</li>
              <li>{companyInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dune-100/40">
            &copy; {currentYear} {companyInfo.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-dune-100/40">
            <a href="#" className="hover:text-sand-200 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-sand-200 transition-colors">Conditions générales</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
