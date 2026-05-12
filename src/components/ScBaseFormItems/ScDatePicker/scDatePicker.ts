import type { DatePickerType } from 'element-plus'

export type ScDatePickerType = Extract<DatePickerType, 'date' | 'week' | 'month' | 'year'>

export interface ScDatePickerProps {
  modelValue: string
  type?: ScDatePickerType
  format?: string
  valueFormat?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'large' | 'default' | 'small'
}

export interface ScDatePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
