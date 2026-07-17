export type ProjectRoleSearchParams = {
  name: string
}

export type ProjectRoleData = {
  name: string
  code: string
} & CommonTableData

export type ProjectRoleFormData = {
  // 项目角色标识
  code: string
  // 项目角色名称
  name: string
  // 菜单id
  menuIds: Array<string>
  // 父子联动
  menuCheckStrictly: string
}
