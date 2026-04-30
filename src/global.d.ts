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

type GlobalState = {
  existLoading: boolean
}
