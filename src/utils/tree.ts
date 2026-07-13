export const listToTree = <T extends Record<string, any>>(
  list: T[],
  options: {
    idKey: string
    parentIdKey: string
    childrenKey?: string
    rootParentId?: any
  }
): T[] => {
  const {
    idKey,
    parentIdKey,
    childrenKey = 'children',
    rootParentId = 0
  } = options
  const map = new Map<any, T>()
  const result: T[] = []

  list.forEach(item => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  map.forEach(item => {
    const parentId = item[parentIdKey]
    if (parentId === rootParentId || !map.has(parentId)) {
      result.push(item)
    } else {
      const parent = map.get(parentId)!
      parent[childrenKey].push(item)
    }
  })

  return result
}
