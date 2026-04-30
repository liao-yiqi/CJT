import request from '@/utils/request'
import type { RouterData } from '@/router'

/**
 * @description 获取路由菜单
 */
export const getRouters = (params: { subjectId: string; isSubjectMenu?: string }) => {
  return request.get<DataResponse<RouterData[]>>({ url: '/getRouters', params })
}
