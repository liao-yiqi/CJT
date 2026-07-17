<script setup lang="ts">
import type {
  ProjectRoleSearchParams,
  ProjectRoleData,
  ProjectRoleFormData
} from '@/types/system/role/projectRole'
import {
  createProjectRoleAPI,
  deleteProjectRoleAPI,
  getProjectRoleDataAPI,
  getProjectRoleDetailAPI,
  updateProjectRoleAPI
} from '@/api/system/role/projectRole-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { findFormItem } from '@/utils/formItemUtils.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'
import {
  getMenuTreeData,
  getMenuTreeDataByProjectRoleId
} from '@/api/system/menu-api.ts'
import type { TreeMenuData } from '@/types/system/menu'
import type { ScDialogFormInstance } from '@/components/ScDialogForm'
import type { ScTreeInstance } from '@/components/ScBaseFormItems/ScTree'

const searchbarItems = reactive<SearchbarItems<ProjectRoleSearchParams>>([
  { label: '角色名称', prop: 'name', type: 'input' }
])

const tableColumns = reactive<TableColumns>([
  { label: '角色名称', prop: 'name' },
  { label: '权限标识', prop: 'code' }
])

const pageConfig: PageConfig<ProjectRoleData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'ras:role:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'ras:role:edit' },
      delete: { permission: 'ras:role:remove' }
    }
  },
  fetchData: getProjectRoleDataAPI
}

const dialogFormData = reactive<ProjectRoleFormData>({
  code: '',
  name: '',
  menuIds: [],
  menuCheckStrictly: '1'
})

const formItems = defineFormItems<ProjectRoleFormData>([
  {
    label: '项目角色名称',
    prop: 'name',
    type: 'input',
    rules: [{ required: true, message: '未填写项目角色名称', trigger: 'blur' }],
    componentProps: { placeholder: '请输入项目角色名称' }
  },
  {
    label: '项目角色标识',
    prop: 'code',
    type: 'input',
    rules: [{ required: true, message: '未填写项目角色标识', trigger: 'blur' }],
    componentProps: { placeholder: '请输入项目角色标识' }
  },
  {
    label: '菜单权限',
    prop: 'menuIds',
    type: 'tree',
    colSpan: 2,
    rules: [{ required: true, message: '未选择菜单权限', trigger: 'change' }],
    componentProps: {
      options: [],
      nodeKey: 'id',
      checkStrictly: true
    }
  }
])

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (row: ProjectRoleData | undefined = undefined) =>
  open(row)

const setMenuPermissionData = (data: Array<TreeMenuData>) => {
  const menuPermissionItem = findFormItem(formItems, 'menuIds', 'tree')
  if (menuPermissionItem?.componentProps) {
    menuPermissionItem.componentProps.options = data
  }
}

const getTreeMenuData = async () => {
  const { data } = await getMenuTreeData()
  setMenuPermissionData(data)
}

const getTreeMenuDataByProjectRoleId = async (roleId: number) => {
  const { menus, checkedKeys } = await getMenuTreeDataByProjectRoleId(roleId)
  setMenuPermissionData(menus)
  formData.menuIds = checkedKeys.map(String)
}

const { handleDelete } = useDeleteAction<ProjectRoleData>(
  ids => deleteProjectRoleAPI({ ids }),
  {
    message: '确定删除该项目角色吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<ProjectRoleFormData>({
    defaultFormData: dialogFormData,
    title: '项目角色',
    fetchDetail: id => getProjectRoleDetailAPI(id),
    onCreate: data => createProjectRoleAPI(data),
    onUpdate: data => updateProjectRoleAPI(data),
    beforeOpen: async (_, row) => {
      if (row) {
        await getTreeMenuDataByProjectRoleId(Number(row.id))
      } else {
        await getTreeMenuData()
      }
    },
    onSuccess: () => scResourcePageRef.value?.refresh()
  })

watch(
  () => formData.menuCheckStrictly,
  value => {
    const menuItem = findFormItem(formItems, 'menuIds', 'tree')
    if (menuItem?.componentProps) {
      menuItem.componentProps.checkStrictly = value !== '1'
    }
  },
  { immediate: true, flush: 'sync' }
)

const scDialogFormRef = useTemplateRef<ScDialogFormInstance>('scDialogFormRef')
const getTreeRef = (): ScTreeInstance | undefined =>
  scDialogFormRef.value?.getItemRef<ScTreeInstance>('menuIds')

const expandOrCollapse = ref(false)
const handleExpand = () => {
  expandOrCollapse.value
    ? getTreeRef()?.expandAll()
    : getTreeRef()?.collapseAll()
}

const expandAllVal = ref(false)
const handleExpandAll = () => {
  expandAllVal.value ? getTreeRef()?.checkAll() : getTreeRef()?.uncheckAll()
}

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
    />
    <ScDialogForm
      ref="scDialogFormRef"
      v-model="visible"
      :form-data="formData"
      :config="pageDialogConfig"
      :confirm-loading="confirmLoading"
      @success="scResourcePageRef?.refresh()"
      @confirm="handleConfirm"
    >
      <template #before-menuIds>
        <div class="tree-toolbar">
          <el-checkbox v-model="expandOrCollapse" @change="handleExpand">
            展开/收缩
          </el-checkbox>
          <el-checkbox v-model="expandAllVal" @change="handleExpandAll">
            全选/全不选
          </el-checkbox>
          <el-checkbox
            v-model="formData.menuCheckStrictly"
            true-label="1"
            false-label="0"
          >
            父子联动
          </el-checkbox>
        </div>
      </template>
    </ScDialogForm>
  </div>
</template>

<style scoped lang="scss"></style>
