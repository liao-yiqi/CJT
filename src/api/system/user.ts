import type { UserInfo } from '@/types/user'
import request from '@/utils/request'

/**
 * @description 获取用户详情信息
 */
export const getUserInfo = () => {
  return request.get<UserInfo>({ url: '/getInfo' })
}
