import type { DatePickerType } from 'element-plus'

export type ScDateRangePickerType = Extract<
  DatePickerType,
  'daterange' | 'monthrange' | 'yearrange'
>

export interface ScDateRangePickerProps {
  modelValue?: [string, string]
  type?: ScDateRangePickerType
  format?: string
  valueFormat?: string
  startPlaceholder?: string
  endPlaceholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'large' | 'default' | 'small'
  rangeSeparator?: string
}

export interface ScDateRangePickerEmits {
  (e: 'update:modelValue', value: [string, string]): void
  (e: 'change', value: [string, string]): void
}
