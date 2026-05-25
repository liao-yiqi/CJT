import request from '@/utils/request'

export const downloadFileAPI = (
  url: string,
  params?: Record<string, any>,
  method: 'GET' | 'POST' = 'GET'
) => request.download({ url, params, method })
