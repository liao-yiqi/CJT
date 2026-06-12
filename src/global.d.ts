// 基础响应类型
type BaseResponse = {
  code: number
  msg: string
}
// token响应类型
type TokenResponse = BaseResponse & {
  token: string
}
// 数据响应类型
type DataResponse<T> = BaseResponse & {
  data: T
}
// 列表相应类型
type ListResponse<T> = BaseResponse & {
  rows: Array<T>
  total: number
}

// 全局store状态
type GlobalState = {
  existLoading: boolean
}

// 下载参数
type DownloadFilePayload = {
  requestUrl: string
  extraParams?: Record<string, any>
  requestMethod?: 'GET' | 'POST'
}

// 分页参数
type PaginationParams = {
  pageNum: number
  pageSize: number
}
// 列表请求参数
type ListQuery<T = object> = PaginationParams & T
