import axios, { type AxiosInstance } from 'axios'
import type { SCRequestConfig, SCRequestInterceptors } from './type.ts'
import {
  globalRequestInterceptor,
  globalRequestInterceptorCatch,
  globalResponseInterceptor,
  globalResponseInterceptorCatch
} from './interceptors.ts'
import { BASE_URL, TIME_OUT } from './config.ts'

class SCRequest {
  private instance: AxiosInstance
  private interceptors?: SCRequestInterceptors

  constructor(config: SCRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 注册全局拦截器
    this.instance.interceptors.request.use(globalRequestInterceptor, globalRequestInterceptorCatch)
    this.instance.interceptors.response.use(
      globalResponseInterceptor,
      globalResponseInterceptorCatch
    )

    // 注册实例级拦截器（可覆盖全局拦截器行为）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntereptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  // 请求方法
  request<T = any>(config: SCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单次请求拦截处理
      let finalConfig = config
      if (config.interceptors?.requestInterceptor) {
        finalConfig = config.interceptors.requestInterceptor(
          config as any
        ) as unknown as SCRequestConfig<T>
      }
      this.instance
        .request<any, T>(finalConfig)
        .then(res => {
          const result = config.interceptors?.responseIntereptor
            ? config.interceptors.responseIntereptor(res as any)
            : res
          resolve(result as T)
        })
        .catch(reject)
    })
  }

  get<T = any>(config: SCRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: SCRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  put<T = any>(config: SCRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: SCRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

// 导出默认实例
export default new SCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export { SCRequest }
