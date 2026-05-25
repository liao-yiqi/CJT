import type {
  ActionButton,
  DefaultButtonsConfig
} from '@/components/ScBaseComponents/ScResourcePage/types'
import { usePermission } from './usePermission'

const { hasPermission } = usePermission()

export const useActionButtons = <T>(
  getActionButtons: () => Array<ActionButton<T>> | undefined,
  getShowDefaultActions: () => boolean | undefined,
  onEdit: (row: T) => void,
  onDelete: (row: T) => void,
  getDefaultActionsConfig: () =>
    | {
        edit?: DefaultButtonsConfig<T>
        delete?: DefaultButtonsConfig<T>
      }
    | undefined
) => {
  const defaultActions = computed<Array<ActionButton<T>>>(() => {
    const config = getDefaultActionsConfig() || {}
    const buttons: Array<ActionButton<T>> = [
      {
        name: '编辑',
        type: 'warning' as const,
        text: true,
        show: config.edit?.show,
        disabled: config.edit?.disabled,
        order: config.edit?.order ?? 10,
        onClick: (row: T) => onEdit(row)
      },
      {
        name: '删除',
        type: 'danger' as const,
        text: true,
        show: config.delete?.show,
        disabled: config.delete?.disabled,
        order: config.delete?.order?? 20,
        onClick: (row: T) => onDelete(row)
      }
    ]
    return buttons.filter((_, i) => {
      const permission = i === 0 ? config.edit?.permission : config.delete?.permission
      return hasPermission(permission)
    })
  })

  const allActionButtons = computed(() => {
    const showDefault = getShowDefaultActions() !== false
    const customButtons = getActionButtons() || []
    const buttonWithOrder = customButtons
      .filter(btn => hasPermission(btn.permission))
      .map((b, i) => ({
        ...b,
        order: b.order ?? (i + 1) * 10 + 100
      }))
    const allButtons = showDefault ? [...defaultActions.value, ...buttonWithOrder] : buttonWithOrder
    return allButtons.sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  const isButtonDisabled = (btn: ActionButton<T>, row: T): boolean => {
    if (typeof btn.disabled === 'function') {
      return btn.disabled(row)
    }
    return btn.disabled ?? false
  }

  const resolveButtonName = (btn: ActionButton<T>, row: T): string => {
    if (typeof btn.name === 'function') {
      return btn.name(row)
    }
    return btn.name
  }

  return { allActionButtons, isButtonDisabled, resolveButtonName }
}
