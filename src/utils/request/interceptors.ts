import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { HTTP_ERROR_CODE } from '@/constant/errorCode.ts'
import { handleBusinessError } from './handler/errorHandler'
import { getToken } from '../auth'

/** 全局请求拦截：统一注入 token */
export const globalRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}

/** 全局请求错误拦截 */
export const globalRequestInterceptorCatch = (error: unknown) => {
  console.error('[Request Error]', error)
  return Promise.reject(error)
}

/** 全局响应拦截：统一解构 data 层 */
export const globalResponseInterceptor = async (
  res: AxiosResponse<BaseResponse | Blob>
): Promise<any> => {
  if (res.data instanceof Blob) {
    // 尝试解析是否为 JSON 错误
    try {
      const text = await res.data.text()
      const json = JSON.parse(text) as BaseResponse
      handleBusinessError(json.code, json.msg)
      return Promise.reject(json)
    } catch {
      return res
    }
  }
  const { code, msg } = res.data as BaseResponse
  if (code == 200) return res.data
  handleBusinessError(code, msg)
  return Promise.reject({ code, msg })
}

/** 全局响应错误拦截：统一 HTTP 错误提示 */
export const globalResponseInterceptorCatch = (error: any) => {
  const status = error?.response?.status
  const msg = HTTP_ERROR_CODE[status] ?? `未知错误(${status ?? '网络错误'})`
  console.error('错误的响应', msg, error)
  return Promise.reject(error)
}
