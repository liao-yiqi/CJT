<script setup lang="ts">
import type {
  OrganizationManagementSearchParams,
  OrganizationManagementData,
  OrganizationManagementFormData
} from '@/types/system/organizationManagement'
import {
  createOrganizationManagementAPI,
  deleteOrganizationManagementAPI,
  getOrganizationManagementDataAPI,
  getOrganizationManagementDetailAPI,
  updateOrganizationManagementAPI
} from '@/api/system/organizationManagement-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'
import { listToTree } from '@/utils/tree.ts'
import { findFormItem } from '@/utils/formItemUtils.ts'

const searchbarItems = reactive<
  SearchbarItems<OrganizationManagementSearchParams>
>([
  {
    label: '部门名称',
    prop: 'deptName',
    type: 'input'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    dictField: 'sys_normal_disable'
  }
])

const tableColumns = reactive<TableColumns>([
  {
    label: '部门名称',
    prop: 'deptName'
  },
  {
    label: '排序',
    prop: 'orderNum'
  },
  {
    label: '状态',
    prop: 'status',
    slot: 'status'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
])

const pageConfig: PageConfig<OrganizationManagementData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'system:dept:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'system:dept:edit' },
      delete: { permission: 'system:dept:remove' }
    },
    showPagination: false,
    customActionButtons: [
      { name: '新增', type: 'text', onClick: row => handleAddDepartment(row) }
    ]
  },
  fetchData: async params => getPageData(params),
  treeConfig: {
    rowKey: 'deptId',
    showExpandButton: true,
    defaultExpandAll: true
  }
}

const dialogFormData = reactive<OrganizationManagementFormData>({
  parentId: '',
  deptName: '',
  orderNum: '',
  leader: '',
  phone: '',
  email: '',
  status: '0'
})

const formItems = defineFormItems<OrganizationManagementFormData>([
  {
    label: '上级部门',
    prop: 'parentId',
    type: 'treeSelect',
    colSpan: 2,
    hide: formData => formData.parentId === 0,
    componentProps: {
      options: [],
      nodeKey: 'deptId',
      fieldNames: { label: 'deptName', children: 'children' }
    }
  },
  {
    label: '部门名称',
    prop: 'deptName',
    type: 'input',
    rules: [{ required: true, message: '未填写部门名称', trigger: 'blur' }]
  },
  {
    label: '列表排序',
    prop: 'orderNum',
    type: 'input',
    componentProps: { type: 'number' },
    rules: [{ required: true, message: '未填写列表排序', trigger: 'blur' }]
  },
  { label: '负责人', prop: 'leader', type: 'input' },
  {
    label: '联系电话',
    prop: 'phone',
    type: 'input',
    rules: [
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'input',
    rules: [
      {
        type: 'email',
        message: '请填写正确的邮箱地址',
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    label: '部门状态',
    prop: 'status',
    type: 'radio',
    componentProps: { dictField: 'sys_normal_disable' }
  }
])

const getPageData = async (
  params: ListQuery<OrganizationManagementSearchParams>
) => {
  const { data } = await getOrganizationManagementDataAPI(params)
  const treeData = listToTree(data, {
    idKey: 'deptId',
    parentIdKey: 'parentId',
    rootParentId: 0
  })
  const parentItem = findFormItem(formItems, 'parentId', 'treeSelect')
  if (parentItem?.componentProps) {
    parentItem.componentProps.options = treeData
  }
  return {
    rows: treeData
  }
}

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (
  row: OrganizationManagementData | undefined = undefined
) => open(row)

const { handleDelete } = useDeleteAction<OrganizationManagementData>(
  ids => deleteOrganizationManagementAPI(String(ids)),
  {
    getId: row => String(row.deptId),
    message: '确定删除该部门数据吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<OrganizationManagementFormData, 'deptId'>({
    idKey: 'deptId',
    defaultFormData: dialogFormData,
    title: '部门',
    fetchDetail: id => getOrganizationManagementDetailAPI(id),
    onCreate: data => createOrganizationManagementAPI(data),
    onUpdate: data => updateOrganizationManagementAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh()
  })

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: dialogTitle.value
}))

const handleAddDepartment = (row: OrganizationManagementData) => {
  open(undefined, { parentId: row.deptId })
}
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
      <template #column-status="{ row }">
        <el-tag type="success">
          {{ row.status === '0' ? '启用' : '禁用' }}
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
