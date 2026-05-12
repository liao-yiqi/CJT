import type { DatePickType } from 'element-plus'

export interface ScBaseDateProps {
  modelValue?: string | [string, string]
  type: DatePickType
  format?: string
  valueFormat?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'large' | 'default' | 'small'
  rangeSeparator?: string
}

export interface ScBaseDateEmits {
  (e: 'update:modelValue', value: string | [string, string]): void
  (e: 'change', value: string | [string, string]): void
}
