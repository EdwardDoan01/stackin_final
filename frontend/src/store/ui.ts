import { create } from 'zustand'

export type Toast = { id: number; message: string; type?: 'success' | 'error' | 'info' }

type UIState = {
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: number) => void
}

let counter = 1

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],
  showToast: (message, type = 'info') => {
    const id = counter++
    set({ toasts: [...get().toasts, { id, message, type }] })
    setTimeout(() => get().removeToast(id), 3000)
  },
  removeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}))


