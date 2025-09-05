import axios from 'axios'
import type { AxiosError, AxiosInstance } from 'axios'

type Tokens = { access: string; refresh: string }

const API_BASE_URL = '/api'

const getTokens = (): Tokens | null => {
  const raw = localStorage.getItem('stackin_tokens')
  return raw ? JSON.parse(raw) as Tokens : null
}

const setTokens = (tokens: Tokens | null) => {
  if (tokens) localStorage.setItem('stackin_tokens', JSON.stringify(tokens))
  else localStorage.removeItem('stackin_tokens')
}

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

let isRefreshing = false
let pendingQueue: Array<() => void> = []

api.interceptors.request.use((config) => {
  const tokens = getTokens()
  const url = (config.url || '') as string
  const isAuthEndpoint = url.includes('/user/login') || url.includes('/user/register') || url.includes('/user/token')
  
  // Only add Authorization header for non-auth endpoints
  if (tokens?.access && !isAuthEndpoint) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${tokens.access}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as any
    // Do not attempt refresh on auth endpoints
    const url = (original?.url || '') as string
    const isAuthEndpoint = url.includes('/user/login') || url.includes('/user/register') || url.includes('/user/token')
    if (error.response?.status === 401 && !original?._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingQueue.push(resolve))
        return api(original)
      }
      original._retry = true
      isRefreshing = true
      try {
        const tokens = getTokens()
        if (!tokens?.refresh) {
          // No refresh token → reject original error instead of throwing a new one
          return Promise.reject(error)
        }
        const resp = await axios.post(`${API_BASE_URL}/user/token/refresh/`, { refresh: tokens.refresh })
        const newTokens: Tokens = { access: resp.data.access, refresh: tokens.refresh }
        setTokens(newTokens)
        pendingQueue.forEach((cb) => cb())
        pendingQueue = []
        return api(original)
      } catch (e) {
        setTokens(null)
        pendingQueue = []
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    throw error
  }
)

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await api.post('/user/login/', { email, password })
    const tokens: Tokens = res.data.tokens
    setTokens(tokens)
    return res.data.user
  },
  register: async (payload: Record<string, unknown>) => {
    const res = await api.post('/user/register/', payload)
    return res.data
  },
  me: async () => {
    const res = await api.get('/user/profile/')
    return res.data as any
  },
  logout: () => setTokens(null),
}

export const userApi = {
  updateProfile: (payload: Record<string, unknown>) => api.post('/user/profile/update/', payload),
  changePassword: (payload: { old_password: string; new_password: string }) => api.post('/user/change-password/', payload),
  verifyIdentity: (payload: FormData) => api.post('/user/identity/', payload, { headers: { 'Content-Type': 'multipart/form-data' } }),
  registerTasker: (payload: Record<string, unknown>) => api.post('/user/tasker-register/', payload),
}

export const taskApi = {
  categories: () => api.get('/task/categories/'),
  list: () => api.get('/task/tasks/'),
  create: (payload: Record<string, unknown>) => api.post('/task/tasks/', payload),
  detail: (id: number) => api.get(`/task/tasks/${id}/`),
  updateDelete: (id: number, payload: Record<string, unknown>) => api.put(`/task/tasks/${id}/update-delete/`, payload),
  accept: (id: number) => api.post(`/task/tasks/${id}/accept/`, {}),
  status: (id: number, action: 'start' | 'complete') => api.post(`/task/tasks/${id}/status/`, { action }),
  events: (id: number) => api.get(`/task/tasks/${id}/events/`),
  completeQR: (id: number) => api.post(`/task/tasks/${id}/complete-qr/`, {}),
}

export const paymentApi = {
  createIntent: (payload: { task: number; amount: number; currency?: string }) => api.post('/payment/intent/create/', payload),
  detail: (id: number) => api.get(`/payment/${id}/`),
  release: (id: number) => api.post(`/payment/${id}/release/`, {}),
  refund: (id: number) => api.post(`/payment/${id}/refund/`, {}),
}

export const chatApi = {
  rooms: () => api.get('/chat/rooms/'),
  roomDetail: (id: number) => api.get(`/chat/rooms/${id}/`),
  messages: (roomId: number) => api.get(`/chat/rooms/${roomId}/messages/`),
  sendMessage: (roomId: number, payload: { content: string }) => api.post(`/chat/rooms/${roomId}/messages/send/`, payload),
  markRead: (messageId: number) => api.post(`/chat/messages/${messageId}/read/`, {}),
}

export const reviewApi = {
  list: () => api.get('/review/'),
  create: (payload: Record<string, unknown>) => api.post('/review/create/', payload),
  detail: (id: number) => api.get(`/review/${id}/`),
  stats: (userId: number) => api.get(`/review/stats/${userId}/`),
}

export const reportApi = {
  list: () => api.get('/report/'),
  create: (payload: Record<string, unknown>) => api.post('/report/', payload),
  detail: (id: number) => api.get(`/report/${id}/`),
  uploadAttachment: (form: FormData) => api.post('/report/attachment/upload/', form, { headers: { 'Content-Type': 'multipart/form-data' } }),
  moderate: (id: number, payload: Record<string, unknown>) => api.post(`/report/${id}/moderate/`, payload),
}

export const notiApi = {
  list: () => api.get('/noti/'),
  detail: (id: number) => api.get(`/noti/${id}/`),
  markRead: (id: number) => api.post(`/noti/${id}/mark-read/`, {}),
  archive: (id: number) => api.post(`/noti/${id}/archive/`, {}),
  bulkMarkRead: (ids: number[]) => api.post('/noti/bulk/mark-read/', { ids }),
  unreadCount: () => api.get('/noti/unread/count/'),
}

export const chatbotApi = {
  sendMessage: (message: string) => api.post('/chatbot/message/', { message }),
  getSuggestions: () => api.get('/chatbot/suggestions/'),
}


