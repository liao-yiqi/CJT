import { ScMessage } from '@/utils/ElUtils'

interface UseDialogFormOptions<T extends Record<string, any>> {
  defaultFormData: T
  fetchDetail?: (id: string) => Promise<any>
  onCreate: (data: T) => Promise<any>
  onUpdate: (data: T & { id: string }) => Promise<any>
  onSuccess?: () => void
}

/**
 * 弹窗表单 hook，管理弹窗显隐、表单数据、请求流程
 *
 * @param options.defaultFormData 表单初始值，决定表单字段范围，回显时只取其中的 key
 * @param options.fetchDetail 获取详情函数，传入 id，编辑场景打开时自动调用回填数据
 * @param options.onCreate 新增请求函数
 * @param options.onUpdate 编辑请求函数，自动注入 id
 * @param options.onSuccess 请求成功后的回调，一般用于刷新列表
 *
 * @example
 * const { visible, formData, confirmLoading, open, handleConfirm } = useDialogForm({
 *   defaultFormData: { name: '', code: '' },
 *   fetchDetail: id => getDetailAPI(id),
 *   onCreate: data => createAPI(data),
 *   onUpdate: data => updateAPI(data),
 *   onSuccess: () => tableRef.value?.refresh()
 * })
 *
 * // 新增
 * open()
 * // 编辑
 * open(row)
 */
export const useDialogForm = <T extends Record<string, any>>(options: UseDialogFormOptions<T>) => {
  const visible = ref(false)
  const formData = reactive<T>({ ...options.defaultFormData })
  const confirmLoading = ref(false)
  const currentId = ref('')

  const assignFormData = (source: Record<string, any>) => {
    const keys = Object.keys(options.defaultFormData) as (keyof T)[]
    keys.forEach(key => {
      if (String(key) in source) {
        ;(formData as Record<string, any>)[String(key)] = source[String(key)]
      }
    })
  }

  const open = async (row?: any) => {
    Object.assign(formData, options.defaultFormData)
    currentId.value = ''
    if (row) {
      currentId.value = row.id
      if (options.fetchDetail) {
        const { data } = await options.fetchDetail(row.id)
        assignFormData(data)
      } else {
        assignFormData(row)
      }
    }
    visible.value = true
  }

  const handleConfirm = async (data: Record<string, any>) => {
    confirmLoading.value = true
    try {
      const params = data as T
      currentId.value
        ? await options.onUpdate({ ...params, id: currentId.value })
        : await options.onCreate(params)
      visible.value = false
      ScMessage.success(`${currentId.value ? '修改' : '新增'}成功`)
      options.onSuccess?.()
    } finally {
      confirmLoading.value = false
    }
  }

  return {
    visible,
    formData,
    confirmLoading,
    open,
    handleConfirm
  }
}
