import { ElButton, ElIcon } from 'element-plus'
import { createApp, defineComponent, h } from 'vue'
import ScConfirmDialog from '@/components/ScConfirmDialog/index.vue'

export interface ConfirmOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

/**
 * 以编程方式唤起删除确认弹窗，用法与 ElMessageBox 类似
 *
 * @example
 * const { scConfirm } = useScConfirm()
 * await scConfirm({ message: '确定删除该用户吗？' })
 */
export const useScConfirm = () => {
  const scConfirm = (options: ConfirmOptions = {}): Promise<void> => {
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
              ...options,
              onConfirm: async () => {
                resolve()
              },
              onCancel: () => {
                reject(new Error('cancel'))
              },
              onClose: () => {
                cleanup()
              }
            })
          }
        })
      )
      app.use(ElButton)
      app.use(ElIcon)
      app.mount(container)
    })
  }
  return { scConfirm }
}
