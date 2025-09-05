import { create } from 'zustand'
import { authApi } from '../lib/api'

type User = {
  id: number
  username: string
  email: string
  is_tasker: boolean
  is_verified: boolean
}

type AuthState = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  login: async (email, password) => {
    set({ loading: true })
    try {
      const user = await authApi.login(email, password)
      set({ user })
    } catch (error) {
      set({ loading: false })
      throw error // Re-throw to let the component handle it
    } finally {
      set({ loading: false })
    }
  },
  logout: () => {
    authApi.logout()
    set({ user: null })
  },
  fetchMe: async () => {
    set({ loading: true })
    try {
      const user = await authApi.me()
      set({ user })
    } finally {
      set({ loading: false })
    }
  },
}))


