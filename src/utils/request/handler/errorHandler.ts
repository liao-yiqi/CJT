import { ElMessage, ElMessageBox } from 'element-plus'
import type { BusinessErrorHandler } from '../type'

export let isRelogin: { show: boolean } = { show: false }

const businessErrorHandlers: Record<number, BusinessErrorHandler> = {
  401: () => {
    if (!isRelogin.show) {
      isRelogin.show = true
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {
          isRelogin.show = false
        })
    }
  },
  403: () => {},
  500: message => {
    ElMessage.error(message ?? '服务器发生错误，请稍后再试')
  }
}

export const handleBusinessError = (code: number, message: string) => {
  const handler = businessErrorHandlers[code]
  if (handler) {
    handler(message)
  } else {
    console.warn(`未定义的业务错误码 ${code}，请添加对应的处理函数`)
  }
}
