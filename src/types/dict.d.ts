/**
 * 字典选项
 */
export type DictOption = {
  label: string
  value: string
  remark?: string
  disabled?: boolean
}

/**
 * 字典返回类型
 */
type DictData = {
  dictLabel: string
  dictValue: string
  isDefault?: string
  status?: string
  dictCode: number
  cssClass?: string
  remark?: string
  listClass?: string
  disabled?: boolean
}
