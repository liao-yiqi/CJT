<script setup lang="ts">
import type {
  ControlPointData,
  ControlPointItemData,
  ControlPointItemFormData,
  ControlPointItemSearchParams
} from '@/types/adminManagement/controlPoint'
import {
  createControlPointItemAPI,
  getControlPointItemAPI,
  getControlPointItemDetailAPI,
  updateControlPointItemAPI
} from '@/api/adminManagement/controlPoint-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { http } from '@/utils/http.ts'
import { findFormSelectItem } from '@/utils/formItemUtils.ts'

const searchbarItems = reactive<SearchbarItems<ControlPointItemSearchParams>>([
  { label: '测评项', prop: 'item', type: 'input' },
  { label: '测评对象', prop: 'obj', type: 'input' }
])

const tableColumns = reactive<TableColumns>([
  { label: '控制点', prop: 'pointName' },
  { label: '测评项', prop: 'item' },
  { label: '测评对象', prop: 'obj' },
  { label: '测评方法及步骤', prop: 'method' },
  { label: '单元判定', prop: 'judge' },
  { label: '解读', prop: 'interpret' },
  { label: '预期结果或主要证据', prop: 'expected' },
  { label: '级别', prop: 'gradeLabel' }
])

const route = useRoute()

const pointId = computed<string>(() => {
  return route.params.id as string
})

const pageConfig: PageConfig<ControlPointItemData> = {
  searchConfig: {
    searchbarItems,
    searchExtraParams: { pointId: pointId.value }
  },
  operateConfig: {
    defaultButtonsConfig: {
      add: { permission: 'background:guide:add' }
    }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'background:guide:edit' },
      delete: { permission: 'background:guide:remove' }
    }
  },
  fetchData: getControlPointItemAPI,
  pageExtraParams: { pointId: pointId.value }
}

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const dialogFormData = reactive<ControlPointItemFormData>({
  pointId: pointId.value,
  grade: '',
  item: '',
  obj: '',
  judge: '',
  interpret: '',
  methods: [{ content: '', expected: '' }]
})

const formItems = defineFormItems<ControlPointItemFormData>([
  {
    label: '控制点',
    prop: 'pointId',
    type: 'select',
    componentProps: { options: [], disabled: true }
  },
  {
    label: '级别',
    prop: 'grade',
    type: 'select',
    componentProps: { dictField: 'background_point_grade' }
  },
  {
    label: '测评项',
    prop: 'item',
    type: 'input',
    componentProps: { type: 'textarea', rows: 5 },
    colSpan: 2
  },
  {
    label: '测评对象',
    prop: 'obj',
    type: 'input',
    componentProps: { type: 'textarea', rows: 5 },
    colSpan: 2
  },
  {
    label: '单元判定',
    prop: 'judge',
    type: 'input',
    componentProps: { type: 'textarea', rows: 5 },
    colSpan: 2
  },
  {
    label: '解读',
    prop: 'interpret',
    type: 'input',
    componentProps: { type: 'textarea', rows: 5 },
    colSpan: 2
  },
  {
    label: '测评方法及步骤',
    prop: 'methods',
    customSlot: 'methods',
    colSpan: 2
  }
])

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<ControlPointItemFormData>({
    defaultFormData: dialogFormData,
    title: '测评项详情',
    fetchDetail: id => getControlPointItemDetailAPI(id),
    onCreate: data => createControlPointItemAPI(data),
    onUpdate: data => updateControlPointItemAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh(),
    beforeOpen: (formData, row) => {
      if (!row) formData.methods = [{ content: '', expected: '' }]
    }
  })

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: dialogTitle.value
}))

const handlePageClick = (row: ControlPointItemData | undefined = undefined) =>
  open(row)

const getPointOptions = async () => {
  const { data } = await http.get<DataResponse<Array<ControlPointData>>>(
    '/background/point/option'
  )
  const options = data.map(i => ({
    label: i.categoryLabel,
    value: i.id
  }))
  const pointItem = findFormSelectItem(formItems, 'pointId')
  if (pointItem)
    pointItem.componentProps = {
      ...pointItem.componentProps,
      options
    }
}

onMounted(() => getPointOptions())

const addMethods = (index: number) => {
  formData.methods.splice(index + 1, 0, {
    content: '',
    expected: ''
  })
}

const removeMethods = (index: number) => {
  if (formData.methods.length <= 1) return
  formData.methods.splice(index, 1)
}
</script>

<template>
  <div class="page-card">
    <ScResourcePage
      ref="scResourcePageRef"
      :page-config="pageConfig"
      @add="handlePageClick"
      @edit="handlePageClick"
    />
    <ScDialogForm
      v-model="visible"
      :form-data="formData"
      :config="pageDialogConfig"
      :confirm-loading="confirmLoading"
      @success="scResourcePageRef?.refresh()"
      @confirm="handleConfirm"
    >
      <template #custom-methods>
        <div class="methods-wrap">
          <div
            v-for="(item, index) in formData.methods"
            :key="index"
            class="method-item"
          >
            <ScInput
              v-model="item.content"
              placeholder="请输入检测方法、步骤"
            />
            <ScInput
              v-model="item.expected"
              placeholder="请输入预期结果或主要依据"
            />
            <ScButton
              v-if="index === formData.methods.length - 1"
              type="primary"
              size="small"
              @click="addMethods(index)"
            >
              +
            </ScButton>
            <ScButton
              type="danger"
              size="small"
              @click="removeMethods(index)"
              :disabled="formData.methods.length === 1"
            >
              -
            </ScButton>
          </div>
        </div>
      </template>
    </ScDialogForm>
  </div>
</template>

<style scoped lang="scss">
.methods-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .method-item {
    display: flex;
    gap: 8px;
    align-items: center;
    .sc-input {
      flex: 1;
    }
    .method-actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
      .btn-placeholder {
        width: 32px; // 与 ScButton small 宽度一致
      }
    }
  }
}
</style>
