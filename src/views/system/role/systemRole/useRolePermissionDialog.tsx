import { useDialogForm } from '@/hooks/useDialogForm.ts'
import type { SystemRolePermissionFormData } from '@/types/system/role/systemRole'
import {
  getRoleDetailAPI,
  setRolePermissionData
} from '@/api/system/role/systemRole-api.ts'
import { getDeptTreeDataByRoleId } from '@/api/system/organizationManagement-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { findFormItem } from '@/utils/formItemUtils.ts'
import ScDialogForm from '@/components/ScDialogForm'
import { defineComponent, h } from 'vue'

interface UseRolePermissionDialogOptions {
  onSuccess?: () => void
}

const rolePermissionFormData = reactive<SystemRolePermissionFormData>({
  dataScope: '',
  roleKey: '',
  roleName: '',
  deptIds: []
})

const formItems = defineFormItems<SystemRolePermissionFormData>([
  {
    label: '角色名称',
    prop: 'roleName',
    type: 'input',
    componentProps: { disabled: true }
  },
  {
    label: '权限字符',
    prop: 'roleKey',
    type: 'input',
    componentProps: { disabled: true }
  },
  {
    label: '权限范围',
    prop: 'dataScope',
    type: 'select',
    componentProps: {
      options: [
        { value: '1', label: '全部数据权限' },
        { value: '2', label: '自定数据权限' },
        { value: '3', label: '本部门数据权限' },
        { value: '4', label: '本部门及以下数据权限' },
        { value: '5', label: '仅本人数据权限' }
      ]
    }
  },
  {
    label: '部门列表',
    prop: 'deptIds',
    type: 'tree',
    hide: formData => formData.dataScope === '1',
    componentProps: {
      options: [],
      nodeKey: 'id',
      defaultExpandAll: true
    },
    colSpan: 2
  }
])

export const useRolePermissionDialog = (
  options: UseRolePermissionDialogOptions = {}
) => {
  const {
    visible,
    formData,
    confirmLoading,
    open,
    handleConfirm,
    dialogTitle
  } = useDialogForm<SystemRolePermissionFormData, 'roleId', number>({
    idKey: 'roleId',
    defaultFormData: rolePermissionFormData,
    title: '分配数据权限',
    fetchDetail: id => getRoleDetailAPI(id),
    onUpdate: data => setRolePermissionData(data),
    onSuccess: () => options.onSuccess?.(),
    beforeOpen: async (_, row) => {
      if (!row) return
      const { depts, checkedKeys } = await getDeptTreeDataByRoleId(row.roleId)
      const deptItem = findFormItem(formItems, 'deptIds', 'tree')
      if (deptItem?.componentProps) {
        deptItem.componentProps.options = depts
      }
      formData.deptIds = checkedKeys
    }
  })

  const pageDialogConfig = computed<DialogFormConfig>(() => ({
    formItems,
    title: dialogTitle.value
  }))

  const RolePermissionDialog = defineComponent({
    name: 'RolePermissionDialog',
    setup() {
      return () =>
        h(ScDialogForm, {
          modelValue: visible.value,
          'onUpdate:modelValue': (val: boolean) => {
            visible.value = val
          },
          formData,
          config: pageDialogConfig.value,
          confirmLoading: confirmLoading.value,
          onConfirm: handleConfirm
        })
    }
  })

  return { RolePermissionDialog, open }
}
