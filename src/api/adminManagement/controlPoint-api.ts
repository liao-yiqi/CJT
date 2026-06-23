import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  ControlPointData,
  ControlPointFormData,
  ControlPointItemData,
  ControlPointItemFormData,
  ControlPointItemSearchParams,
  ControlPointSearchParams
} from '@/types/adminManagement/controlPoint'
import request from '@/utils/request'

const controlPointBaseUrl = '/background/point'
const controlPointItemBaseUrl = '/background/pointItem'

export const getControlPointAPI = createListAPI<
  ControlPointSearchParams,
  ControlPointData
>(`${controlPointBaseUrl}/list`)

export const createControlPointAPI = (data: ControlPointFormData) => {
  return request.post<BaseResponse>({ url: controlPointBaseUrl, data })
}

export const updateControlPointAPI = (
  data: ControlPointFormData & { id: string }
) => {
  return request.put<BaseResponse>({ url: controlPointBaseUrl, data })
}

export const getControlPointDetailAPI = (id: string) => {
  return request.get<DataResponse<ControlPointData>>({
    url: `${controlPointBaseUrl}/${id}`
  })
}

export const deleteControlPointAPI = (data: { ids: Array<string> }) => {
  return request.post<BaseResponse>({
    url: `${controlPointBaseUrl}/delete`,
    data
  })
}

export const getControlPointItemAPI = createListAPI<
  ControlPointItemSearchParams,
  ControlPointItemData
>(`${controlPointItemBaseUrl}/list`)

export const createControlPointItemAPI = (data: ControlPointItemFormData) => {
  return request.post<BaseResponse>({ url: controlPointItemBaseUrl, data })
}

export const updateControlPointItemAPI = (
  data: ControlPointItemFormData & { id: string }
) => {
  return request.put<BaseResponse>({ url: controlPointItemBaseUrl, data })
}

export const getControlPointItemDetailAPI = (id: string) => {
  return request.get<DataResponse<ControlPointItemData>>({
    url: `${controlPointItemBaseUrl}/${id}`
  })
}
