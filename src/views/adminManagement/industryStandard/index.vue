<script setup lang="ts">
import type {
  IndustryStandardData,
  IndustryStandardFormData,
  IndustryStandardSearchParams
} from '@/types/adminManagement/industryStandard'
import {
  createIndustryStandardAPI,
  deleteIndustryStandardAPI,
  getIndustryStandardDataAPI,
  getIndustryStandardDetailAPI,
  updateIndustryStandardAPI
} from '@/api/adminManagement/industryStandard-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'

const searchbarItems = reactive<SearchbarItems<IndustryStandardSearchParams>>([
  { label: '标准编号', prop: 'standardNo', type: 'input' },
  { label: '标准名称', prop: 'standardName', type: 'input' }
])

const tableColumns = reactive<TableColumns>([
  {
    label: '标准编号',
    prop: 'standardNo'
  },
  {
    label: '标准名称',
    prop: 'standardName'
  },
  {
    label: '颁布时间',
    prop: 'promulgationDate'
  },
  {
    label: '实施时间',
    prop: 'implementationDate'
  },
  {
    label: '颁布部门',
    prop: 'promulgationDept'
  },
  {
    label: '优先级',
    prop: 'priority'
  }
])

const pageConfig: PageConfig<IndustryStandardData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'background:standard:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'background:standard:edit' },
      delete: { permission: 'background:standard:remove' }
    }
  },
  fetchData: getIndustryStandardDataAPI
}

const dialogFormData = reactive<IndustryStandardFormData>({
  standardNo: '',
  standardName: '',
  promulgationDate: '',
  implementationDate: '',
  promulgationDept: '',
  priority: ''
})

const formItems = defineFormItems<IndustryStandardFormData>([
  {
    label: '标准编号',
    prop: 'standardNo',
    type: 'input',
    rules: [{ required: true, message: '未填写标准编号', trigger: 'blur' }]
  },
  {
    label: '标准名称',
    prop: 'standardName',
    type: 'input',
    rules: [{ required: true, message: '未填写标准名称', trigger: 'blur' }]
  },
  { label: '颁布时间', prop: 'promulgationDate', type: 'date' },
  { label: '实施时间', prop: 'implementationDate', type: 'date' },
  { label: '颁布部门', prop: 'promulgationDept', type: 'input' },
  {
    label: '优先级',
    prop: 'priority',
    type: 'input',
    componentProps: { type: 'number' }
  }
])

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: '行业/标准'
}))

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (row: IndustryStandardData | undefined = undefined) => {
  open(row)
}

const { handleDelete } = useDeleteAction<IndustryStandardFormData>(
  ids => deleteIndustryStandardAPI({ ids }),
  {
    message: '确定删除该行业标准吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm } =
  useDialogForm<IndustryStandardFormData>({
    defaultFormData: dialogFormData,
    title: '行业/标准',
    fetchDetail: id => getIndustryStandardDetailAPI(id),
    onCreate: data => createIndustryStandardAPI(data),
    onUpdate: data => updateIndustryStandardAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh()
  })
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
