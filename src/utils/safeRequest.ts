import { ScMessage } from '@/utils/ElUtils'

export const safeRequest = async <T, E = Error>(
  promise: Promise<T>,
  options?: {
    message?: string
    showError?: boolean
  }
): Promise<[E | null, T | null]> => {
  const { message, showError = true } = options || {}

  try {
    const res = await promise
    return [null, res]
  } catch (err) {
    if (showError) {
      ScMessage.error(message ?? '提交失败！')
    }
    return [err as E, null]
  }
}
