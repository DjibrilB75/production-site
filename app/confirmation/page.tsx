'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <div className="max-w-lg mx-auto text-center">
      <CheckCircle2 className="w-14 h-14 text-terracotta-600 mx-auto mb-6" />
      <h1 className="font-display text-4xl text-night-900 mb-4">Merci pour votre commande</h1>
      <p className="text-night-800/60 mb-2">
        Votre commande {orderId && <span className="font-medium text-night-900">#{orderId}</span>} a
        bien été enregistrée.
      </p>
      <p className="text-night-800/60 mb-10">
        Un email de confirmation vous sera envoyé avec le détail de votre commande et le suivi de
        livraison.
      </p>
      <Link
        href="/#boutique"
        className="inline-flex items-center px-8 py-4 rounded-full bg-terracotta-600 text-white text-sm tracking-wide uppercase hover:bg-terracotta-700 transition-colors"
      >
        Poursuivre mes achats
      </Link>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />
      <div className="pt-40 pb-24 px-6">
        <Suspense fallback={null}>
          <ConfirmationContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
