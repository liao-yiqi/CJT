import request from '@/utils/request'
import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  PostData,
  PostFormData,
  PostSearchParams
} from '@/types/system/post'

const postBaseUrl = '/system/post'

export const getPostDataAPI = createListAPI<PostSearchParams, PostData>(
  `${postBaseUrl}/list`
)

export const createPostAPI = (data: PostFormData) =>
  request.post<BaseResponse>({ url: `${postBaseUrl}`, data })

export const getPostDetailAPI = (id: string | number) =>
  request.get<DataResponse<PostData>>({ url: `${postBaseUrl}/${id}` })

export const updatePostAPI = (
  data: PostFormData & { postId: string | number }
) => request.put<BaseResponse>({ url: `${postBaseUrl}`, data })

export const deletePostAPI = (data: { ids: Array<string> }) =>
  request.post<BaseResponse>({ url: `${postBaseUrl}/delete`, data })
