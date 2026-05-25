import type {
  OperateConfig,
  PageButton,
  OperateDefaultButtonsId
} from '@/components/ScBaseComponents/ScResourcePage/types'
import { CirclePlusFilled, Download, UploadFilled } from '@element-plus/icons-vue'
import { usePermission } from '../hooks/usePermission'

const allDefaultButtonsMap: Record<OperateDefaultButtonsId, PageButton> = {
  add: { id: 'add', name: '新增', type: 'primary', icon: CirclePlusFilled },
  import: { id: 'import', name: '导入', type: 'warning', icon: UploadFilled },
  export: { id: 'export', name: '导出', type: 'danger', icon: Download }
}

const { hasPermission } = usePermission()

export const useOperateButtons = (
  getOperateConfig: () => OperateConfig | undefined,
  onAdd: () => void,
  onImport: () => void,
  onExport: () => Promise<void>,
  onOperateClick: (id: string | undefined) => void
) => {
  const defaultButtons = computed<PageButton[]>(() => {
    const configuredIds = getOperateConfig()?.defaultButtons ?? ['add']
    const customConfig = getOperateConfig()?.defaultButtonsConfig || {}
    return configuredIds
      .filter(id => allDefaultButtonsMap[id])
      .map((id, index) => {
        const defaultBtn = allDefaultButtonsMap[id]
        const custom = customConfig?.[id]
        return {
          ...defaultBtn,
          name: custom?.name ?? defaultBtn.name,
          type: custom?.type ?? defaultBtn.type,
          icon: custom?.icon ?? defaultBtn.icon,
          disabled: custom?.disabled ?? defaultBtn.disabled,
          order: custom?.order ?? (index + 1) * 10,
          tourId: custom?.tourId,
          permission: custom?.permission
        }
      })
      .filter(btn => hasPermission(btn.permission))
  })

  const allButtons = computed(() => {
    const extraButtons = getOperateConfig()?.customButtons || []
    const buttonsWithOrder = extraButtons
      .filter(btn => hasPermission(btn.permission))
      .map((b, i) => ({
        ...b,
        order: b.order ?? (i + 1) * 10 + 100
      }))
    return [...defaultButtons.value, ...buttonsWithOrder].sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    )
  })

  const handleBtnClick = async (item: PageButton) => {
    if (item.onClick) {
      return item.onClick()
    }
    switch (item.id) {
      case 'add':
        onAdd()
        break
      case 'import':
        onImport()
        break
      case 'export':
        await onExport()
        break
      default:
        onOperateClick(item.id)
    }
  }

  return { allButtons, handleBtnClick }
}
