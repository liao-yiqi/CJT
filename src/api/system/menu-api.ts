import request from '@/utils/request'
import type { RouterData } from '@/router'
import type { TreeMenuData, TreeMenuDataByRoleId } from '@/types/system/menu'

/**
 * @description 获取路由菜单
 */
export const getRouters = (params: {
  subjectId: string
  isSubjectMenu?: string
}) => {
  return request.get<DataResponse<RouterData[]>>({ url: '/getRouters', params })
}

/**
 * @description 获取菜单下拉树结构数据
 */
export const getMenuTreeData = () => {
  return request.get<DataResponse<Array<TreeMenuData>>>({
    url: '/system/menu/treeselect'
  })
}

/**
 * @description 通过角色id获取下拉树结构数据
 */
export const getMenuTreeDataByRoleId = (roleId: number) => {
  return request.get<TreeMenuDataByRoleId>({
    url: `/system/menu/roleMenuTreeselect/${roleId}`
  })
}

/**
 * @description 根据角色id查询菜单下拉树结构
 */
export const getMenuTreeDataByProjectRoleId = (roleId: number) => {
  return request.get<TreeMenuDataByRoleId>({
    url: `/ras/role/subjectRoleMenuTreeSelect/${roleId}`
  })
}
