
import type { ScDatePickerProps } from '@/components/ScBaseFormItems/ScDatePicker'
import type { ScDateRangeSelectorProps } from '@/components/ScSearchDateRangeSelector/ScSearchDateRangeSelector.ts'

type ScSearchbarBaseItem = {
  prop: string
  label?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  /** 占几列，默认 1 */
  span?: number
  /** 额外透传给底层组件的 props */
  componentProps?: Record<string, any>
}

export type ScSearchbarInputItem = ScSearchbarBaseItem & {
  type: 'input'
  inputType?: 'text' | 'number' | 'password'
}

export type ScSearchbarSelectItem = ScSearchbarBaseItem & {
  type: 'select'
  options?: Array<{ label: string; value: string | number }>
  dictField?: string
  filterable?: boolean
  multiple?: boolean
}

export type ScSearchbarDateItem = ScSearchbarBaseItem & {
  type: 'date'
  dateType?: ScDatePickerProps['type']
  format?: string
  valueFormat?: string
}

export type ScSearchbarDateRangeItem = ScSearchbarBaseItem & {
  type: 'dateRange'
  dateType?: ScDateRangeSelectorProps['type']
  format?: string
  valueFormat?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export type ScSearchbarItem =
  | ScSearchbarInputItem
  | ScSearchbarSelectItem
  | ScSearchbarDateItem
  | ScSearchbarDateRangeItem

export type ScSearchbarProps = {
  searchbarItems: Array<ScSearchbarItem>
  modelValue: Record<string, any>
  /** 网格列数，默认 7 */
  cols?: number
  showReset?: boolean
  /**
   * 是否截断超出首行的搜索项，超出部分隐藏。
   * 需配合 showCollapse 一起使用才能让用户展开。
   */
  truncate?: boolean
  /** 是否显示展开/收起按钮，仅在 truncate 为 true 且确实有内容被截断时生效 */
  showCollapse?: boolean
  searchText?: string
  resetText?: string
  size?: 'large' | 'small' | 'default'
  gap?: number
  /** 搜索按钮 loading 状态，由父组件控制 */
  loading?: boolean
  /** handleSearch 防抖延迟（ms），默认 300 */
  debounceDelay?: number
}

export type ScSearchbarEmits = {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'search', value: Record<string, any>): void
  (e: 'reset'): void
}
