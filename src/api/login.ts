import request from '@/utils/request'
import type { LoginFormData } from '@/types/user'

export const login = (data: LoginFormData) => {
  return request.post<TokenResponse>({ url: '/login', data })
}

export const logout = () => {
  return request.post({ url: '/logout' })
}
