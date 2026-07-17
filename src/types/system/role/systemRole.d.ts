export type SystemRoleSearchParams = {
  roleName: string
  roleKey: string
  status: string
  dateRange: string
}

export type SystemRoleData = {
  roleId: number
  roleName: string
  roleKey: string
  roleSort: string
  status: string
  createTime: string
} & CommonTableData

export type SystemRoleFormData = {
  roleName: string
  useSubjectRole: string
  roleKey: string
  roleSort: string | number
  status: string
  menuIds: Array<number>
  remark: string
  menuCheckStrictly: boolean
}

export type SystemRolePermissionFormData = {
  roleKey: string
  roleName: string
  dataScope: string
  deptIds: Array<number>
}
