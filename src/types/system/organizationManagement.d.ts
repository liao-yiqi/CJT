export type OrganizationManagementSearchParams = {
  deptName: string
  status: string
}

export type OrganizationManagementData = {
  deptName: string
  orderNum: string
  status: string
  createTime: string
  deptId: number
  parentId: number
  children: Array<OrganizationManagementData>
} & Omit<CommonTableData, 'id'>

export type OrganizationManagementFormData = {
  parentId: string | number
  deptName: string
  orderNum: string
  leader: string
  phone: string
  email: string
  status: string
}
