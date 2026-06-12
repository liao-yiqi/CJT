import { createApp, defineComponent, h } from 'vue'
import { ScMessage } from '@/utils/ElUtils'
import ScConfirmDialog from '@/components/ScConfirmDialog/index.vue'

export interface DeleteActionOptions<T> {
  /** 获取行数据的唯一标识，默认取 row.id */
  getId?: (row: T) => string
  /** 确认弹窗的提示文案 */
  message?: string
  /** 删除成功后的提示文案 */
  successMessage?: string
  /** 删除成功后的回调，通常用于刷新列表 */
  onSuccess?: () => void
}
const mountConfirm = (options: { message?: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const cleanup = () => {
      app.unmount()
      document.body.removeChild(container)
    }
    const app = createApp(
      defineComponent({
        render() {
          return h(ScConfirmDialog, {
            message: options.message,
            onConfirm: () => resolve(),
            onCancel: () => reject(new Error('cancel')),
            onClose: () => cleanup()
          })
        }
      })
    )
    app.mount(container)
  })
}

/**
 * 封装带二次确认的删除操作
 *
 * @example
 * const { handleDelete } = useDeleteAction(
 *   (data) => deleteIndustryStandardAPI(data),
 *   { onSuccess: fetchList }
 * )
 */
export const useDeleteAction = <T extends Record<string, unknown>>(
  deleteFn: (ids: string[]) => Promise<unknown>,
  options: DeleteActionOptions<T> = {}
) => {
  const {
    getId = row => row.id as string,
    message = '此操作不可撤销，确定要删除该条记录吗？',
    successMessage = '删除成功',
    onSuccess
  } = options
  const handleDelete = async (row: T | T[]) => {
    try {
      await mountConfirm({ message })
    } catch {
      return
    }

    const ids = Array.isArray(row) ? row.map(getId) : [getId(row)]
    await deleteFn(ids)
    ScMessage.success(successMessage)
    onSuccess?.()
  }
  return { handleDelete }
}
