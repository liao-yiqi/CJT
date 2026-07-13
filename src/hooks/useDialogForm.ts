import { ScMessage } from '@/utils/ElUtils'
import { assignObject } from '@/utils/object.ts'

interface UseDialogFormOptions<
  T extends Record<string, any>,
  K extends string = 'id'
> {
  defaultFormData: T
  title: string
  idKey?: K
  fetchDetail?: (id: string) => Promise<any>
  onCreate: (data: T) => Promise<any>
  onUpdate: (data: T & Record<K, string>) => Promise<any>
  onSuccess?: () => void
  beforeOpen?: (formData: T, row?: any) => void | Promise<void>
}

export const useDialogForm = <
  T extends Record<string, any>,
  K extends string = 'id'
>(
  options: UseDialogFormOptions<T, K>
) => {
  const idKey = (options.idKey ?? 'id') as K
  const visible = ref(false)
  const formData = reactive<T>({ ...options.defaultFormData })
  const confirmLoading = ref(false)
  const currentId = ref('')

  const open = async (row?: any, presetData?: Partial<T>) => {
    assignObject(formData, JSON.parse(JSON.stringify(options.defaultFormData)))
    currentId.value = ''
    if (row) {
      currentId.value = row[idKey]
      if (options.fetchDetail) {
        const { data } = await options.fetchDetail(row[idKey])
        assignObject(formData, data)
      } else {
        assignObject(formData, row)
      }
    }
    if (presetData) assignObject(formData, presetData)
    await options.beforeOpen?.(formData as T, row)
    visible.value = true
  }

  const handleConfirm = async (data: Record<string, any>) => {
    confirmLoading.value = true
    try {
      const params = data as T
      currentId.value
        ? await options.onUpdate({ ...params, [idKey]: currentId.value } as T &
            Record<K, string>)
        : await options.onCreate(params)
      visible.value = false
      ScMessage.success(`${currentId.value ? '修改' : '新增'}成功`)
      options.onSuccess?.()
    } finally {
      confirmLoading.value = false
    }
  }

  const dialogTitle = computed(() =>
    currentId.value ? `编辑${options.title}` : `新增${options.title}`
  )

  return { visible, formData, confirmLoading, dialogTitle, open, handleConfirm }
}
