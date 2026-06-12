import type {
  IndustryStandardData,
  IndustryStandardFormData,
  IndustryStandardSearchParams
} from '@/types/adminManagement/industryStandard'
import { createListAPI } from '@/utils/pageRequest.ts'
import request from '@/utils/request'

export const getIndustryStandardDataAPI = createListAPI<
  IndustryStandardSearchParams,
  IndustryStandardData
>('/background/standard/list')

export const createIndustryStandardAPI = (data: IndustryStandardFormData) => {
  return request.post<BaseResponse>({ url: '/background/standard', data })
}

export const updateIndustryStandardAPI = (data: IndustryStandardFormData & { id: string }) => {
  return request.put<BaseResponse>({ url: '/background/standard', data })
}

export const getIndustryStandardDetailAPI = (id: string) => {
  return request.get<DataResponse<IndustryStandardData>>({ url: `/background/standard/${id}` })
}

export const deleteIndustryStandardAPI = (data: { ids: Array<string> }) => {
  return request.post<BaseResponse>({ url: '/background/standard/delete', data })
}
