import axios from 'axios'
import { getCookie } from '@/lib/storage/cookies'

const ACCESS_TOKEN_COOKIE = 'thisisjustarandomstring'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const raw = getCookie(ACCESS_TOKEN_COOKIE)
  const token = raw ? JSON.parse(raw) : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — let the QueryClient onError handle 401/500 globally;
// here we only normalise the error shape so callers have a consistent API.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
