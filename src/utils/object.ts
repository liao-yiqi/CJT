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
    // 有映射关系就取映射的源字段，否则取同名字段
    const sourceKey = keyMap?.[key] ?? k
    if (sourceKey in source) {
      ;(target as Record<string, any>)[k] = Array.isArray(source[sourceKey])
        ? JSON.parse(JSON.stringify(source[sourceKey]))
        : source[sourceKey]
    }
  })
}
