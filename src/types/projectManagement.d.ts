/**
 * @description 项目管理数据
 */
export type ProjectManagementData = {
  id: number
  code: string
  name: string
  assessAddress: string
  assessMethodLabel: string
  typeLabel: string
  reportCreatorName: string
  assessResult: string
  commissionUnitAddress: string
  accordanceFileType: string[]
  assessContent: string
  assessMethod: string[]
  commissionUnitName: string
  constructionDept: string
  contractorName: string
  description: string
  designUnit: string
  ifUsePlanStealer: string
  ifUseResultStealer: string
  largeType: string
  planCreatorName: string
  precautions: string
  reportName: string
  reportTime: string
  reportType: string
  reportTypeLabel: string
  scene: string
  supervisionUnit: string
  testCategory: string
  type: string[]
  validatePlan: string
}

/**
 * @description 项目管理搜索参数
 */
export type ProjectManagementSearchParams = {
  code: string
  name: string
  largeType: string
  type: string
}
