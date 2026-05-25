import type { AxiosResponse } from 'axios'

/**
 * 从响应头中解析文件名
 */
export const getFileName = (disposition?: string): string => {
  if (!disposition) return ''
  // 优先匹配 filename*=UTF-8''
  const utf8Match = disposition.match(/filename\*=UTF-8''(.+)/)
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1])
  }
  // 再匹配 filename=
  const normalMatch = disposition.match(/filename="?(.+?)"?$/)
  return normalMatch?.[1] ?? ''
}

/**
 * 文件下载函数
 * @param data
 * @param fileName
 */
export const downloadFile = async (
  data: AxiosResponse,
  fileName: string | null | undefined
): Promise<void> => {
  if (data.data instanceof Blob) {
    const url = window.URL.createObjectURL(data.data)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName ?? getFileName(data.headers['content-disposition'])
    a.click()
    window.URL.revokeObjectURL(url)
  } else {
    const errorMsg = '文件流错误，服务器返回了错误信息，请检查！'
    console.error(errorMsg)
  }
}
