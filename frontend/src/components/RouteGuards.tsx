import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export function RequireTasker({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (!user.is_tasker) return <Navigate to="/" replace />
  return <>{children}</>
}

export function RequireTaskerOrRedirect({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (!user.is_tasker) return <Navigate to="/tasker/register" replace />
  return <>{children}</>
}


