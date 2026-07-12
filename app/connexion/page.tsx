'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/lib/store/auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((s) => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error ?? 'Une erreur est survenue.')
      return
    }
    router.push(searchParams.get('next') || '/compte')
  }

  return (
    <div className="max-w-md mx-auto">
      <p className="text-xs tracking-[0.35em] uppercase text-terracotta-600 mb-3 text-center">
        Espace membre
      </p>
      <h1 className="font-display text-4xl text-night-900 mb-10 text-center">Se connecter</h1>

      <form onSubmit={handleSubmit} className="bg-white/60 rounded-2xl p-8 shadow-card space-y-5">
        {error && (
          <p className="text-sm text-terracotta-700 bg-terracotta-50 border border-terracotta-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-night-900 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none transition-colors"
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-night-900 mb-2">Mot de passe</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-full bg-terracotta-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-terracotta-700 transition-colors"
        >
          Se connecter
        </button>
      </form>

      <p className="text-center text-sm text-night-800/60 mt-6">
        Pas encore de compte ?{' '}
        <Link href="/inscription" className="text-terracotta-700 font-medium hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />
      <div className="pt-32 pb-24 px-6">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
