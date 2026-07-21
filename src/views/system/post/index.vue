<script setup lang="ts">
import type {
  PostSearchParams,
  PostData,
  PostFormData
} from '@/types/system/post'
import {
  createPostAPI,
  deletePostAPI,
  getPostDataAPI,
  getPostDetailAPI,
  updatePostAPI
} from '@/api/system/post-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'

const searchbarItems = reactive<SearchbarItems<PostSearchParams>>([
  {
    label: '岗位编码',
    prop: 'postCode',
    type: 'input',
    placeholder: '请输入岗位编码'
  },
  {
    label: '岗位名称',
    prop: 'postName',
    type: 'input',
    placeholder: '请输入岗位名称'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    dictField: 'sys_normal_disable'
  }
])

const tableColumns = reactive<TableColumns>([
  { label: '岗位编号', prop: 'postId' },
  { label: '岗位编码', prop: 'postCode' },
  { label: '岗位名称', prop: 'postName' },
  { label: '岗位排序', prop: 'postSort' },
  { label: '状态', prop: 'status', slot: 'statusSlot' },
  { label: '创建时间', prop: 'createTime' }
])

const pageConfig: PageConfig<PostData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'system:post:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'system:post:edit' },
      delete: { permission: 'system:post:remove' }
    }
  },
  fetchData: getPostDataAPI
}

const dialogFormData = reactive<PostFormData>({
  postName: '',
  postCode: '',
  postSort: '',
  status: '0',
  remark: ''
})

const formItems = defineFormItems<PostFormData>([
  {
    label: '岗位名称',
    prop: 'postName',
    type: 'input',
    rules: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
    componentProps: { placeholder: '请输入岗位名称' }
  },
  {
    label: '岗位编码',
    prop: 'postCode',
    type: 'input',
    rules: [{ required: true, message: '请输入岗位编码', trigger: 'blur' }],
    componentProps: { placeholder: '请输入岗位编码' }
  },
  {
    label: '岗位顺序',
    prop: 'postSort',
    type: 'input',
    rules: [{ required: true, message: '请输入岗位顺序', trigger: 'blur' }],
    componentProps: { type: 'number', placeholder: '请输入岗位顺序' }
  },
  {
    label: '部门状态',
    prop: 'status',
    type: 'radio',
    componentProps: { dictField: 'sys_normal_disable' }
  },
  {
    label: '备注',
    prop: 'remark',
    type: 'input',
    componentProps: { type: 'textarea', placeholder: '请输入备注' },
    colSpan: 2
  }
])

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (row: PostData | undefined = undefined) => open(row)

const { handleDelete } = useDeleteAction<PostData>(
  ids => deletePostAPI({ ids }),
  {
    getId: row => String(row.postId),
    message: '确定删除该岗位管理吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<PostFormData, 'postId', string | number>({
    idKey: 'postId',
    defaultFormData: dialogFormData,
    title: '岗位管理',
    fetchDetail: id => getPostDetailAPI(id),
    onCreate: data => createPostAPI(data),
    onUpdate: data => updatePostAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh()
  })

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: dialogTitle.value
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
    >
      <template #column-statusSlot="{ row }">
        <el-tag :type="row.status === '1' ? 'danger' : 'success'">
          {{ row.status === '1' ? '停用' : '正常'}}
        </el-tag>
      </template>
    </ScResourcePage>
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
