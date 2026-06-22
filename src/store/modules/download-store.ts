import { downloadFileAPI } from '@/api/file-api.ts'
import type { AxiosResponse } from 'axios'

export const useDownloadFilesStore = defineStore('downloadFile', () => {
  const downloadFilesRequest = async (payload: DownloadFilePayload): Promise<AxiosResponse> => {
    const { requestUrl, extraParams, requestMethod = 'GET' } = payload
    try {
      return await downloadFileAPI(requestUrl, extraParams, requestMethod)
    } catch (e) {
      console.error('文件下载失败==>', e)
      throw e
    }
  }

  return {
    downloadFilesRequest
  }
})
