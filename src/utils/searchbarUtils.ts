import type { ScSearchbarSelectItem } from '@/components/ScBaseComponents/ScSearchbar'

/**
 * 从 searchbar 配置项数组中查找指定 prop 的 select 类型项
 *
 * @template T - searchbar 绑定的表单参数类型
 * @param items - searchbar 配置项数组
 * @param prop - 要查找的字段名，限定为 T 的键
 * @returns 找到的 ScSearchbarSelectItem，未找到或类型不匹配时返回 undefined
 *
 * @example
 * const standardItem = findSelectItem(searchbarItems, 'standardId')
 * if (standardItem) {
 *   standardItem.options = await getStandardOptions()
 * }
 */
export const findSelectItem = <T>(
  items: SearchbarItems<T>,
  prop: string
): ScSearchbarSelectItem<T> | undefined => {
  return items.find(
    (item): item is ScSearchbarSelectItem<T> => item.prop === prop
  )
}
