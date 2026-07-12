import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/lib/types'

interface StoredAccount extends User {
  password: string
}

interface AuthState {
  accounts: StoredAccount[]
  currentUser: User | null
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

// Demo-only client-side auth (no backend): accounts persist in localStorage.
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: [],
      currentUser: null,
      register: (name, email, password) => {
        const normalizedEmail = email.trim().toLowerCase()
        if (get().accounts.some((a) => a.email === normalizedEmail)) {
          return { ok: false, error: 'Un compte existe déjà avec cet email.' }
        }
        const account: StoredAccount = {
          id: crypto.randomUUID(),
          name,
          email: normalizedEmail,
          password,
        }
        set((state) => ({
          accounts: [...state.accounts, account],
          currentUser: { id: account.id, name: account.name, email: account.email },
        }))
        return { ok: true }
      },
      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase()
        const account = get().accounts.find((a) => a.email === normalizedEmail)
        if (!account || account.password !== password) {
          return { ok: false, error: 'Email ou mot de passe incorrect.' }
        }
        set({ currentUser: { id: account.id, name: account.name, email: account.email } })
        return { ok: true }
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: 'yurah-auth' }
  )
)
