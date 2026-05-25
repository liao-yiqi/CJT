import type { ButtonType } from 'element-plus'

export interface OperateConfig {
  // 操作列需要默认显示的按钮组，默认为['add']
  defaultButtons?: Array<OperateDefaultButtonsId>
  // 自定义按钮
  customButtons?: Array<PageButton>
  // 覆盖默认按钮属性
  defaultButtonsConfig?: Partial<Record<OperateDefaultButtonsId, DefaultButtonConfig>>
}

// 操作列默认按钮id
export type OperateDefaultButtonsId = 'add' | 'import' | 'export'

export interface PageButton {
  id?: string
  name?: string
  icon?: Component
  type?: ButtonType
  text?: boolean
  disabled?: boolean
  order?: number
  tourId?: string
  permission?: string | string[]
  onClick?: () => void | Promise<void>
}

export interface DefaultButtonConfig {
  id?: string
  name?: string
  icon?: Component
  type: ButtonType
  disabled?: boolean
  order?: number
  tourId?: string
  permission?: string | Array<string>
  onClick?: () => void | Promise<void>
}
