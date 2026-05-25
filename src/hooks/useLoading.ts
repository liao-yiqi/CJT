/**
 * useLoading Hook
 * 提供 loading 状态以及开始/结束 loading 的方法
 */
export const useLoading = () => {
  const loading = ref(false)
  function startLoading() {
    loading.value = true
  }
  function stopLoading() {
    loading.value = false
  }
  return {
    loading,
    startLoading,
    stopLoading
  }
}
