<script setup lang="ts">
import type {
  CommonTestEnvironmentsSearchParams,
  CommonTestEnvironmentsData,
  CommonTestEnvironmentsFormData
} from '@/types/adminManagement/commonTestEnvironments'
import {
  createCommonTestEnvironmentsAPI,
  deleteCommonTestEnvironmentsAPI,
  getCommonTestEnvironmentsDataAPI,
  getCommonTestEnvironmentsDetailAPI,
  updateCommonTestEnvironmentsAPI
} from '@/api/adminManagement/commonTestEnvironments-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'

const searchbarItems = reactive<
  SearchbarItems<CommonTestEnvironmentsSearchParams>
>([{ label: '名称', prop: 'name', type: 'input' }])

const tableColumns = reactive<TableColumns>([
  {
    label: '名称/型号（版本号）/设备编号/提供方/用途',
    prop: 'name'
  },
  {
    label: '操作系统/数据库/中间层(应用层)',
    prop: 'system'
  },
  {
    label: '运行环境',
    prop: 'env'
  }
])

const pageConfig: PageConfig<CommonTestEnvironmentsData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'commonTestEnvironments:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'commonTestEnvironments:edit' },
      delete: { permission: 'commonTestEnvironments:remove' }
    }
  },
  fetchData: getCommonTestEnvironmentsDataAPI
}

const dialogFormData = reactive<CommonTestEnvironmentsFormData>({
  name: '',
  system: '',
  env: ''
})

const formItems = defineFormItems<CommonTestEnvironmentsFormData>([
  {
    label: '名称/型号（版本号）/设备编号/提供方/用途',
    prop: 'name',
    type: 'input',
    componentProps: { type: 'textarea' },
    rules: [
      {
        required: true,
        message: '未填写名称/型号（版本号）/设备编号/提供方/用途',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '操作系统/数据库/中间层(应用层)',
    prop: 'system',
    type: 'input',
    componentProps: { type: 'textarea' }
  },
  {
    label: '运行环境',
    prop: 'env',
    type: 'input',
    componentProps: { type: 'textarea' }
  }
])

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (
  row: CommonTestEnvironmentsData | undefined = undefined
) => open(row)

const { handleDelete } = useDeleteAction<CommonTestEnvironmentsData>(
  ids => deleteCommonTestEnvironmentsAPI({ ids }),
  {
    message: '确定删除该常用测试环境吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<CommonTestEnvironmentsFormData>({
    defaultFormData: dialogFormData,
    title: '常用测试环境',
    fetchDetail: id => getCommonTestEnvironmentsDetailAPI(id),
    onCreate: data => createCommonTestEnvironmentsAPI(data),
    onUpdate: data => updateCommonTestEnvironmentsAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh()
  })

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: dialogTitle.value,
  columns: 1
}))
</script>

<template>
  <div class="page-card">
    <ScResourcePage
      ref="scResourcePageRef"
      :page-config="pageConfig"
      @add="handlePageClick"
      @edit="handlePageClick"
      @delete="handleDelete"
    />
    <ScDialogForm
      v-model="visible"
      :form-data="formData"
      :config="pageDialogConfig"
      :confirm-loading="confirmLoading"
      @success="scResourcePageRef?.refresh()"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
