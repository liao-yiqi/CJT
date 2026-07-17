import type {
  ScBaseFormItem,
  ScBaseFormSelectItem
} from '@/components/ScBaseForm/types/formItem.ts'

/**
 * 从 form 配置项数组中查找指定 prop 的 select 类型项
 *
 * @template T - form 绑定的表单参数类型
 * @param items - form 配置项数组
 * @param prop - 要查找的字段名，限定为 T 的键
 * @returns 找到的 ScFormSelectItem，未找到或类型不匹配时返回 undefined
 *
 * @example
 * const standardItem = findFormSelectItem(formItems, 'standardId')
 * if (standardItem) {
 *   standardItem.componentProps.options = await getStandardOptions()
 * }
 * @deprecated 该函数已不再使用，由findFormItem代替
 */
export const findFormSelectItem = <T extends Record<string, any>>(
  items: Array<ScBaseFormItem>,
  prop: keyof T
): ScBaseFormSelectItem | undefined => {
  return items.find((item): item is ScBaseFormSelectItem => item.prop === prop)
}

/**
 * 从 form 配置项数组中查找指定 prop 且类型匹配的表单项
 *
 * @template Type - 要匹配的表单项类型（如 'select'、'treeSelect'）
 * @template T - form 绑定的表单参数类型
 * @param items - form 配置项数组
 * @param prop - 要查找的字段名，限定为 T 的键
 * @param type - 要匹配的表单项类型
 * @returns 找到且类型匹配的表单项，未找到或类型不匹配时返回 undefined
 *
 * @example
 * const standardItem = findFormItem(formItems, 'standardId', 'select')
 * if (standardItem) {
 *   standardItem.componentProps!.options = await getStandardOptions()
 * }
 *
 * const deptItem = findFormItem(formItems, 'deptId', 'treeSelect')
 * if (deptItem) {
 *   deptItem.componentProps!.options = await getDeptTreeOptions()
 * }
 */
export const findFormItem = <
  Type extends Exclude<ScBaseFormItem['type'], undefined>,
  T extends Record<string, any> = Record<string, any>
>(
  items: Array<ScBaseFormItem>,
  prop: keyof T,
  type: Type
): Extract<ScBaseFormItem, { type: Type }> | undefined => {
  const item = items.find(item => item.prop === prop)
  return item?.type === type
    ? (item as Extract<ScBaseFormItem, { type: Type }>)
    : undefined
}
