export interface ScTreeSelectProps {
  modelValue: ScTreeSelectModelValue
  options?: Array<ScTreeSelectOption> | Array<Record<string, any>>
  multiple?: boolean
  checkStrictly?: boolean
  nodeKey?: string
  fieldNames?: ScTreeSelectFieldName
  disabled?: boolean
  size?: 'large' | 'small' | 'default'
  placeholder?: string
  clearable?: boolean
  filterable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  multipleLimit?: number
  defaultExpandAll?: boolean
  renderAfterExpand?: boolean
  checkOnClickNode?: boolean
  accordion?: boolean
  noDataText?: string
  labelMaxWidth?: number | string
}

export type ScTreeSelectModelValue = string | number | Array<string | number>

export interface ScTreeSelectOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: Array<ScTreeSelectOption>
}

export interface ScTreeSelectFieldName {
  label: string
  children: string
  disabled?: string
}

export interface ScTreeSelectEmits {
  (e: 'update:modelValue', value: ScTreeSelectModelValue): void
  (e: 'change', value: any): void
  (e: 'node-click', data: ScTreeSelectOption): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
}
