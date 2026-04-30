import { TOKEN_KEY } from '@/constant/globalVariables'
import { localStorage } from './storage'

export const getToken = (): string => {
  return localStorage.get(TOKEN_KEY) ?? ''
}

export const setToken = (token: string) => {
  return localStorage.set(TOKEN_KEY, token)
}

export const removeToken = () => {
  return localStorage.remove(TOKEN_KEY)
}
