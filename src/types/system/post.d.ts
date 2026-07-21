export type PostSearchParams = {
  postCode: string
  postName: string
  status: string
}

export type PostData = {
  postId: string | number
  postCode: string
  postName: string
  postSort: string
  status: string
  createTime: string
} & CommonTableData

export type PostFormData = {
  postName: string
  postCode: string
  postSort: string
  status: string
  remark: string
}
