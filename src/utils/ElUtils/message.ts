import { ElMessage, type MessageOptions } from 'element-plus'

type MessageType = 'success' | 'warning' | 'error' | 'info'

export interface ScMessageOptions extends Omit<MessageOptions, 'type' | 'message'> {
  /** 显示时长（ms），0 表示不自动关闭，默认 3000 */
  duration?: number
  /** 是否显示关闭按钮，默认 false */
  showClose?: boolean
  /** 是否将 message 作为 HTML 片段渲染，默认 false */
  dangerouslyUseHTMLString?: boolean
  /** 关闭时的回调 */
  onClose?: () => void
}

type CloseHandler = () => void

class ScMessageClass {
  private _defaultDuration = 3000

  success(message: string, options?: ScMessageOptions): CloseHandler {
    return this._show('success', message, options)
  }

  warning(message: string, options?: ScMessageOptions): CloseHandler {
    return this._show('warning', message, options)
  }

  error(message: string, options?: ScMessageOptions): CloseHandler {
    return this._show('error', message, options)
  }

  info(message: string, options?: ScMessageOptions): CloseHandler {
    return this._show('info', message, options)
  }

  /**
   * Loading 弹窗，返回一个 close 函数，调用后立即关闭。
   *
   * @example
   * const close = ScMessage.loading('提交中…')
   * await submitForm()
   * close()
   * ScMessage.success('提交成功！')
   */
  loading(message: string, options?: Omit<ScMessageOptions, 'duration'>): CloseHandler {
    const instance = ElMessage({
      message,
      duration: 0,
      icon: LoadingIcon(),
      showClose: false,
      ...options
    } as MessageOptions)

    return () => instance.close()
  }

  /**
   * 关闭当前所有 ElMessage 弹窗。
   */
  closeAll(): void {
    ElMessage.closeAll()
  }

  /**
   * 修改全局默认显示时长。
   */
  setDefaultDuration(ms: number): void {
    this._defaultDuration = ms
  }

  private _show(type: MessageType, message: string, options: ScMessageOptions = {}): CloseHandler {
    const {
      duration = this._defaultDuration,
      showClose = false,
      dangerouslyUseHTMLString = false,
      onClose,
      ...rest
    } = options

    const instance = ElMessage({
      type,
      message,
      duration,
      showClose,
      dangerouslyUseHTMLString,
      onClose,
      ...rest
    })

    return () => instance.close()
  }
}

const LoadingIcon = () => {
  const el = document.createElement('span')
  el.style.cssText = `
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: sc-spin 0.7s linear infinite;
    vertical-align: middle;
  `

  // 注入 keyframes（只注入一次）
  const styleId = '__sc-message-spin__'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = '@keyframes sc-spin { to { transform: rotate(360deg); } }'
    document.head.appendChild(style)
  }

  return el
}

const ScMessage = new ScMessageClass()
export default ScMessage
