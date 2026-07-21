import type {
  ScResourcePageConfig,
  ScSearchbarItem,
  ScTableColumn,
  ScResourcePageInstance,
  ScExportConfig
} from '@/components/ScBaseComponents'
import type { ScDialogFormConfig } from '@/components/ScDialogForm'
import type {
  ScTemplateConfig,
  ScUploadConfig
} from '@/components/ScBaseUpload'

declare global {
  type SearchbarItems<T> = Array<ScSearchbarItem<T>>
  type TableColumns = Array<ScTableColumn>
  type PageConfig<T> = ScResourcePageConfig<T>
  type DialogFormConfig = ScDialogFormConfig
  type PageInstance = ScResourcePageInstance
  type UploadConfig = ScUploadConfig
  type TemplateConfig = ScTemplateConfig
  type ExportConfig = ScExportConfig
}
