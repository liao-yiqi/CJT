import type { ScTableColumn } from '@/components/ScBaseComponents'

export const useColumnConfig = (
  getTableColumns: () => Array<ScTableColumn>,
  getShowActionColumn: () => boolean | undefined
) => {
  const selectedColumns = ref<Array<string>>([])
  const showActionColumn = ref<boolean>(true)

  const initSelectedColumns = () => {
    selectedColumns.value = getTableColumns().map(col => col.prop)
    showActionColumn.value = getShowActionColumn() !== false
  }

  const visibleColumns = computed(() => {
    return getTableColumns().filter(col => selectedColumns.value.includes(col.prop))
  })

  // 对表格列进行监听，在动态列新增时自动补充
  watch(
    getTableColumns,
    newColumns => {
      const newProps = newColumns.map(c => c.prop)
      const addedProps = newProps.filter(p => !selectedColumns.value.includes(p))
      if (addedProps.length > 0) selectedColumns.value.push(...addedProps)
    },
    { deep: true }
  )

  return {
    selectedColumns,
    showActionColumn,
    visibleColumns,
    initSelectedColumns
  }
}
