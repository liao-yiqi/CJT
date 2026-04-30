import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/** 拦截器钩子 */
export interface SCRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseIntereptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

/* 实例化配置 基于AxiosRequestConfig基础上进行扩展 */
export interface SCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SCRequestInterceptors<T>
}

/* 错误码响应中间层类型 */
export type BusinessErrorHandler = (message: string) => void
