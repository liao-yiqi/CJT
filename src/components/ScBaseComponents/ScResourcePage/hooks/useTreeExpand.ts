import type { TreeConfig } from '@/components/ScBaseComponents'
import type { TableInstance } from 'element-plus'

export const useTreeExpand = (
  getTreeConfig: () => TreeConfig | undefined,
  getTableData: () => Array<any>,
  tableRef: Ref<TableInstance | null>
) => {
  const isAllExpanded = ref(false)
  const getChildrenField = () => getTreeConfig()?.children || 'children'

  const getRowKey = (row: Record<string, any>) => {
    const keyField = getTreeConfig()?.rowKey || 'id'
    return row[keyField]
  }

  const expandAllRows = async () => {
    const childrenField = getChildrenField()
    const expandedKeys = new Set()
    const allRowsToExpand: Array<any> = []

    const collectRows = (rows: Array<Record<string, any>>) => {
      rows.forEach(row => {
        const rowKey = getRowKey(row)
        if (expandedKeys.has(rowKey)) return
        expandedKeys.add(rowKey)
        const children = row[childrenField]
        if (children && children.length > 0) {
          allRowsToExpand.push(row)
          collectRows(children)
        }
      })
    }

    collectRows(getTableData())
    allRowsToExpand.forEach(r => {
      if (!tableRef?.value) return
      tableRef?.value.toggleRowExpansion(r, true)
    })
    await nextTick()
  }

  const collapseAllRows = () => {
    const childrenField = getChildrenField()
    const collapsedKeys = new Set()
    const allRowsToCollapse: Array<any> = []

    const collectRows = (rows: Array<Record<string, any>>) => {
      rows.forEach(row => {
        const rowKey = getRowKey(row)
        if (collapsedKeys.has(rowKey)) return
        collapsedKeys.add(rowKey)
        const children = row[childrenField]
        if (children && children.length > 0) {
          allRowsToCollapse.push(row)
          collectRows(children)
        }
      })
    }

    collectRows(getTableData())
    allRowsToCollapse.forEach(r => {
      if (!tableRef?.value) return
      tableRef?.value.toggleRowExpansion(r, true)
    })
  }

  const toggleExpandAll = async () => {
    isAllExpanded.value = !isAllExpanded.value
    if (isAllExpanded.value) {
      await expandAllRows()
    } else {
      collapseAllRows()
    }
  }
  return { isAllExpanded, toggleExpandAll }
}
