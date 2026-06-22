export const useUploadDialog = (onSuccess?: () => void) => {
  const visible = ref(false)
  const open = () => {
    visible.value = true
  }
  const handleSuccess = () => {
    visible.value = false
    onSuccess?.()
  }
  return { visible, open, handleSuccess }
}
