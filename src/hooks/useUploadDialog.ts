import { createVNode, render } from 'vue'
import ScBaseUpload from '@/components/ScBaseUpload'

interface UseUploadDialogOptions {
  uploadConfig: UploadConfig
  templateConfig?: TemplateConfig
  title?: string
  extraParams?: Record<string, any>
  uploadFn?: (files: File[]) => Promise<any>
  onSuccess?: () => void
}
export const useUploadDialog = (options: UseUploadDialogOptions) => {
  const {
    uploadConfig,
    templateConfig,
    title,
    extraParams,
    uploadFn,
    onSuccess
  } = options

  const visible = ref<boolean>(false)

  let container: HTMLDivElement | null = null

  const handleUploadSuccess = () => {
    visible.value = false
    onSuccess?.()
  }

  const renderDialog = () => {
    if (!container) {
      container = document.createElement('div')
      document.body.appendChild(container)
    }
    const vnode = createVNode(ScBaseUpload, {
      modelValue: visible.value,
      'onUpdate:modelValue': (val: boolean) => (visible.value = val),
      title,
      uploadExtraParams: extraParams,
      uploadConfig,
      templateConfig,
      uploadFn,
      onUploadSuccess: handleUploadSuccess
    })
    render(vnode, container)
  }
  watchEffect(renderDialog)

  const open = () => (visible.value = true)

  onScopeDispose(() => {
    if (container) {
      render(null, container)
      container.remove()
      container = null
    }
  })
  return { open }
}
