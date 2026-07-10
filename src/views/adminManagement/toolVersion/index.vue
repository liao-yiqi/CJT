<script setup lang="ts">
import type {
  ToolVersionSearchParams,
  ToolVersionData,
  ToolVersionFormData
} from '@/types/adminManagement/toolVersion'
import {
  createToolVersionAPI,
  deleteToolVersionAPI,
  getToolVersionDataAPI,
  getToolVersionDetailAPI,
  updateToolVersionAPI
} from '@/api/adminManagement/toolVersion-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'
import { useDeleteAction } from '@/hooks/useDeleteAction.ts'
import { Plus, Remove } from '@element-plus/icons-vue'

const searchbarItems = reactive<SearchbarItems<ToolVersionSearchParams>>([
  {
    label: '名称',
    prop: 'name',
    type: 'input'
  },
  {
    label: '用途',
    prop: 'purpose',
    type: 'input'
  }
])

const tableColumns = reactive<TableColumns>([
  {
    label: '版本',
    prop: 'version'
  },
  {
    label: '安全规则版本',
    prop: 'secureVersion'
  }
])

const route = useRoute()

const toolId: string = String(route.params.id)

const pageConfig: PageConfig<ToolVersionData> = {
  searchConfig: { searchbarItems },
  operateConfig: {
    defaultButtonsConfig: { add: { permission: 'background:tool:add' } }
  },
  tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
      edit: { permission: 'background:tool:edit' },
      delete: { permission: 'background:tool:remove' }
    }
  },
  fetchData: getToolVersionDataAPI,
  pageExtraParams: { toolId }
}

const createSecureVersion = () => ({
  secureVersion: '',
  toolId
})

const dialogFormData = reactive<ToolVersionFormData>({
  version: '',
  secureVersions: [createSecureVersion()],
  toolId
})

const formItems = defineFormItems<ToolVersionFormData>([
  {
    label: '版本',
    prop: 'version',
    type: 'input',
    rules: [{ required: true, message: '未填写版本', trigger: 'blur' }]
  },
  {
    label: '安全规则版本',
    prop: 'secureVersions',
    customSlot: 'secureVersions'
  }
])

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (row: ToolVersionData | undefined = undefined) =>
  open(row)

const { handleDelete } = useDeleteAction<ToolVersionData>(
  ids => deleteToolVersionAPI({ ids }),
  {
    message: '确定删除该工具版本吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)

const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<ToolVersionFormData>({
    defaultFormData: dialogFormData,
    title: '工具版本',
    fetchDetail: id => getToolVersionDetailAPI(id),
    onCreate: data => createToolVersionAPI(data),
    onUpdate: data => updateToolVersionAPI(data),
    onSuccess: () => scResourcePageRef.value?.refresh()
  })

const pageDialogConfig = computed<DialogFormConfig>(() => ({
  formItems,
  title: dialogTitle.value,
  columns: 1
}))

const addSecureVersion = () => {
  formData.secureVersions.push(createSecureVersion())
}

const removeSecureVersion = (i: number) => {
  if (formData.secureVersions.length === 1) return
  formData.secureVersions.splice(i, 1)
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
    />
    <ScDialogForm
      v-model="visible"
      :form-data="formData"
      :config="pageDialogConfig"
      :confirm-loading="confirmLoading"
      @success="scResourcePageRef?.refresh()"
      @confirm="handleConfirm"
    >
      <template #custom-secureVersions>
        <div class="dynamic-list">
          <div
            v-for="(item, i) in formData.secureVersions"
            :key="i"
            class="dynamic-list-item"
          >
            <ScInput
              v-model="item.secureVersion"
              placeholder="请输入安全版本"
            />
            <ScButton
              v-if="formData.secureVersions.length > 1"
              type="danger"
              circle
              :icon="Remove"
              @click="removeSecureVersion(i)"
            />
          </div>
          <ScButton
            type="primary"
            circle
            :icon="Plus"
            @click="addSecureVersion"
          />
        </div>
      </template>
    </ScDialogForm>
  </div>
</template>

<style scoped lang="scss">
.dynamic-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
