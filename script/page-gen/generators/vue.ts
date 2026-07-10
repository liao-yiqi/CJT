import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSafe, lowerFirst, upperFirst } from '../utils/fs-helpers.ts'
import { parseArgs, type CliOptions } from '../utils/args.ts'

const DEFAULT_VIEWS_ROOT = 'src/views'

export function buildContent(
  Entity: string,
  cnName: string,
  apiPrefix: string,
  domainPath: string,
  opts: Partial<CliOptions>
): string {
  const { delete: hasDelete } = opts
  const entityLower = apiPrefix

  // 传了 --xxx-permission 就用你传的值覆盖默认值；不需要权限控制的话，生成完自己删掉对应行即可。
  const addPermission = opts.addPermission ?? `${entityLower}:add`
  const editPermission = opts.editPermission ?? `${entityLower}:edit`
  const deletePermission = opts.deletePermission ?? `${entityLower}:remove`

  const apiImports = [
    `create${Entity}API`,
    `get${Entity}DataAPI`,
    `get${Entity}DetailAPI`,
    `update${Entity}API`
  ]
  if (hasDelete) apiImports.push(`delete${Entity}API`)
  apiImports.sort()

  const deleteImportLine = hasDelete
    ? `\nimport { useDeleteAction } from '@/hooks/useDeleteAction.ts'`
    : ''

  const operateConfigBlock = `
  operateConfig: {
    defaultButtonsConfig: { add: { permission: '${addPermission}' } }
  },`

  const tableButtonLines: string[] = [
    `      edit: { permission: '${editPermission}' }`
  ]
  if (hasDelete)
    tableButtonLines.push(`      delete: { permission: '${deletePermission}' }`)

  const tableConfigBlock = `tableConfig: {
    tableColumns,
    defaultButtonsConfig: {
${tableButtonLines.join(',\n')}
    }
  },`

  const deleteHookBlock = hasDelete
    ? `
const { handleDelete } = useDeleteAction<${Entity}Data>(
  ids => delete${Entity}API({ ids }),
  {
    message: '确定删除该${cnName}吗？删除后不可恢复。',
    onSuccess: () => scResourcePageRef.value?.refresh()
  }
)
`
    : ''

  const deleteEmitLine = hasDelete ? `\n      @delete="handleDelete"` : ''

  return `<script setup lang="ts">
import type {
  ${Entity}SearchParams,
  ${Entity}Data,
  ${Entity}FormData,
} from '@/types/${domainPath}${apiPrefix}'
import {
  ${apiImports.join(',\n  ')}
} from '@/api/${domainPath}${apiPrefix}-api.ts'
import { defineFormItems } from '@/utils/form.ts'
import { useDialogForm } from '@/hooks/useDialogForm.ts'${deleteImportLine}

const searchbarItems = reactive<SearchbarItems<${Entity}SearchParams>>([
  // { label: '示例字段', prop: 'exampleProp', type: 'input' }
  // 需要下拉选项的字段: { label: '示例字段', prop: 'exampleProp', type: 'select', dictField: 'xxx_dict_key' }
])

const tableColumns = reactive<TableColumns>([
  // { label: '示例字段', prop: 'exampleProp' }
  // 文字过长需要省略提示: { label: '示例字段', prop: 'exampleProp', showOverflowTooltip: true }
])

const pageConfig: PageConfig<${Entity}Data> = {
  searchConfig: { searchbarItems },${operateConfigBlock}
  ${tableConfigBlock}
  fetchData: get${Entity}DataAPI
}

const dialogFormData = reactive<${Entity}FormData>({
  // exampleProp: ''
})

const formItems = defineFormItems<${Entity}FormData>([
  // {
  //   label: '示例字段',
  //   prop: 'exampleProp',
  //   type: 'input',
  // }
])

const scResourcePageRef = useTemplateRef<PageInstance>('scResourcePageRef')

const handlePageClick = (row: ${Entity}Data | undefined = undefined) => open(row)

${deleteHookBlock}
const { visible, formData, confirmLoading, open, handleConfirm, dialogTitle } =
  useDialogForm<${Entity}FormData>({
    defaultFormData: dialogFormData,
    title: '${cnName}',
    fetchDetail: id => get${Entity}DetailAPI(id),
    onCreate: data => create${Entity}API(data),
    onUpdate: data => update${Entity}API(data),
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
      ${deleteEmitLine}
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
`
}

/**
 * @returns 实际写入（或本应写入）的文件路径
 */
export function generate(
  entityName: string,
  cnName: string,
  opts: Partial<CliOptions> = {}
): string {
  const domainPath = opts.domain ? `${opts.domain}/` : ''
  const apiPrefix = lowerFirst(entityName)
  const entityLower = apiPrefix

  const vuePath = opts.out
    ? path.resolve(process.cwd(), opts.out)
    : path.resolve(
        process.cwd(),
        DEFAULT_VIEWS_ROOT,
        domainPath,
        entityLower,
        'index.vue'
      )

  writeFileSafe(
    vuePath,
    buildContent(upperFirst(entityName), cnName, apiPrefix, domainPath, opts)
  )
  return vuePath
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const { positional, opts } = parseArgs(process.argv.slice(2))
  const [entityName, cnName] = positional
  if (!entityName || !cnName) {
    console.log(
      '用法: npx tsx generators/vue.ts <EntityName> <中文名> [--domain=xxx] [--delete] [--out=相对路径]'
    )
    process.exit(1)
  }
  generate(entityName, cnName, opts)
}
