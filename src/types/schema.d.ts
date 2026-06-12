import type {
  ScResourcePageConfig,
  ScSearchbarItem,
  ScTableColumn,
  ScResourcePageInstance
} from '@/components/ScBaseComponents'
import type { ScDialogFormConfig } from '@/components/ScDialogForm'

declare global {
  type SearchbarItems<T> = Array<ScSearchbarItem<T>>
  type TableColumns = Array<ScTableColumn>
  type PageConfig<T> = ScResourcePageConfig<T>
  type DialogFormConfig = ScDialogFormConfig
  type PageInstance = ScResourcePageInstance
}
