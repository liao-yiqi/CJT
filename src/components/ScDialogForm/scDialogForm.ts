import type { ScBaseFormItem } from '@/components/ScBaseForm/types/formItem.ts'

export interface ScDialogFormConfig {
  title?: string
  confirmText?: string
  cancelText?: string
  dialogWidth?: string | number
  draggable?: boolean
  fullscreen?: boolean
  formItems: ScBaseFormItem[]
  labelWidth?: number | string
  inline?: boolean
  columns?: number
  groupModel?: boolean
}

export interface ScDialogFormProps {
  modelValue: boolean
  formData: Record<string, any>
  config: ScDialogFormConfig
  confirmLoading?: boolean
}

export interface ScDialogFormEmits {
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm', data: Record<string, any>): void
}
