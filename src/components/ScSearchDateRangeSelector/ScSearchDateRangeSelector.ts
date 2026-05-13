import type { ScDateRangePickerType } from '@/components/ScBaseFormItems/ScDateRangePicker'

export interface ScDateRangeSelectorProps {
  modelValue?: [string, string]
  type?: ScDateRangePickerType
  format?: string
  valueFormat?: string
  placeholder?: string
  rangeSeparator?: string
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
}

export interface ScDateRangeSelectorEmits {
  (e: 'update:modelValue', value: [string, string] | undefined): void
  (e: 'change', value: [string, string] | undefined): void
}
