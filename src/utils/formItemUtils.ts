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
 */
export const findFormSelectItem = <T extends Record<string, any>>(
  items: Array<ScBaseFormItem>,
  prop: keyof T
): ScBaseFormSelectItem | undefined => {
  return items.find((item): item is ScBaseFormSelectItem => item.prop === prop)
}
