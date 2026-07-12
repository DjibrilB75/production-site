'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/lib/store/auth'

export default function RegisterPage() {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    const result = register(name, email, password)
    if (!result.ok) {
      setError(result.error ?? 'Une erreur est survenue.')
      return
    }
    router.push('/compte')
  }

  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-terracotta-600 mb-3 text-center">
            Rejoindre Néra
          </p>
          <h1 className="font-display text-4xl text-night-900 mb-10 text-center">Créer un compte</h1>

          <form onSubmit={handleSubmit} className="bg-white/60 rounded-2xl p-8 shadow-card space-y-5">
            {error && (
              <p className="text-sm text-terracotta-700 bg-terracotta-50 border border-terracotta-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-night-900 mb-2">Nom complet</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none transition-colors"
                placeholder="Amina Djibril"
              />
            </div>
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
                placeholder="6 caractères minimum"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-night-900 mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-terracotta-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-terracotta-700 transition-colors"
            >
              Créer mon compte
            </button>
          </form>

          <p className="text-center text-sm text-night-800/60 mt-6">
            Déjà membre ?{' '}
            <Link href="/connexion" className="text-terracotta-700 font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
