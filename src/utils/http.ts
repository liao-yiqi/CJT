import request from '@/utils/request'

/**
 * HTTP 快捷请求工具
 *
 * 用于轻量级接口调用（非业务核心接口）
 *
 * 适用场景：
 * - 下拉框数据
 * - 字典 / 枚举数据
 * - 页面一次性请求
 * - 不需要复用的接口
 *
 * ❌ 不建议用于：
 * - 业务核心接口（列表/增删改查）
 * - 跨页面复用接口
 */
export const http = {
  /**
   * GET 请求
   */
  get<T>(url: string, params?: Object) {
    return request.get<T>({ url, params })
  }
}
