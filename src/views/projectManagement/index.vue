<script setup lang="ts">
import type { TableColumn } from '@/components/ScBaseComponents/ScTable'

const tableData = ref<Record<string, any>>([])

const tableColumns = reactive<Array<TableColumn>>([])

onMounted(() => {
  for (let i = 0; i < 5; i += 1) {
    tableColumns.push({
      prop: `a${i + 1}`,
      label: `测试${i + 1}`,
      showOverflowTooltip: i / 2 === 0
    })
  }

  for (let i = 0; i < 10; i++) {
    const row: { [key: string]: any } = {}

    for (let j = 0; j < tableColumns.length; j++) {
      const key = tableColumns[j].prop
      row[key] =
        `${key}-${i + 1}长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字`
    }

    tableData.value.push(row)
  }
})
</script>

<template>
  <div class="page-card">
    <ScTable
      :data="tableData"
      :table-columns="tableColumns"
      :loading="false"
      :total="tableData.length"
    ></ScTable>
  </div>
</template>

<style scoped lang="scss"></style>
