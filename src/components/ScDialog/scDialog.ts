export interface ScDialogProps {
  // 弹窗标题
  title?: string
  // 确认按钮文本
  confirmText?: string
  // 取消按钮文本
  cancelText?: string
  // 是否开启提交加载状态
  confirmLoading?: boolean
  // 弹窗宽度
  dialogWidth?: string | number
  // 是否可拖拽
  draggable?: boolean
  // 全屏弹窗
  fullscreen?: boolean
}

export interface ScDialogEmits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}
