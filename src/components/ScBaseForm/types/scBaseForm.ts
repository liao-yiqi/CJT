import type { ScBaseFormItem } from './formItem.ts'

export interface ScBaseFormProps {
  modelValue: Record<string, any>
  labelWidth?: number | string
  inline?: boolean
  formItems: Array<ScBaseFormItem>
  isGroup?: boolean
}

export interface ScBaseFormInstance {
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
}
