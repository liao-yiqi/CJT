import request from '@/utils/request'

export const uploadFileAPI = (url: string, data: FormData) => {
  return request.post<BaseResponse>({ url, data })
}

export const downloadFileAPI = (
  url: string,
  params?: Record<string, any>,
  method: 'GET' | 'POST' = 'GET'
) => request.download({ url, params, method })
