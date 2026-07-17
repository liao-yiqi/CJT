/**
 * 安全合并对象，只取目标对象中已有的 key，支持字段映射和数组深拷贝
 *
 * @param target 目标对象，决定最终保留哪些字段
 * @param source 源对象，数据来源
 * @param keyMap 字段映射，{ 目标字段: 源字段 }，用于字段名不一致的场景
 *
 * @example
 * // 基础用法
 * assignObject(formData, apiResponse)
 *
 * // 字段映射
 * assignObject(formData, apiResponse, { methods: 'methodList' })
 */
export const assignObject = <T extends Record<string, any>>(
  target: T,
  source: Record<string, any>,
  keyMap?: Partial<Record<keyof T, string>>
) => {
  const keys = Object.keys(target) as (keyof T)[]
  keys.forEach(key => {
    const k = String(key)
    const sourceKey = keyMap?.[key] ?? k
    if (sourceKey in source) {
      const value = source[sourceKey]
      const targetValue = (target as Record<string, any>)[k]
      if (Array.isArray(value)) {
        ;(target as Record<string, any>)[k] = JSON.parse(JSON.stringify(value))
      } else if (value == null && Array.isArray(targetValue)) {
        // 字段本应是数组，后端返回 null/undefined 时保留空数组
        ;(target as Record<string, any>)[k] = []
      } else {
        ;(target as Record<string, any>)[k] = value
      }
    }
  })
}
