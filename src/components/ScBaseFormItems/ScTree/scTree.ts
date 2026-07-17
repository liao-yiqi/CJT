import type { ScTreeOption, ScTreeFieldName } from '../types/tree'

export type { ScTreeOption, ScTreeFieldName }

export interface ScTreeProps {
  modelValue: Array<string | number>
  options?: Array<ScTreeOption> | Array<Record<string, any>>
  fieldNames?: ScTreeFieldName
  nodeKey?: string
  checkStrictly?: boolean
  defaultExpandAll?: boolean
  disabled?: boolean
  filterable?: boolean
  emptyText?: string
  maxHeight?: number | string
}

export interface ScTreeCheckedInfo {
  checkedKeys: Array<string | number>
  checkedNodes: Array<ScTreeOption>
  halfCheckedKeys: Array<string | number>
  halfCheckedNodes: Array<ScTreeOption>
}

export interface ScTreeEmits {
  (e: 'update:modelValue', value: Array<string | number>): void
  (e: 'check', data: ScTreeOption, checkedInfo: ScTreeCheckedInfo): void
}

export interface ScTreeInstance {
  expandAll: () => void
  collapseAll: () => void
  checkAll: () => void
  uncheckAll: () => void
}
