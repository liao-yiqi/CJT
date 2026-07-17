import request from '@/utils/request'
import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  SystemRoleData,
  SystemRoleFormData,
  SystemRolePermissionFormData,
  SystemRoleSearchParams
} from '@/types/system/role/systemRole'

const roleBaseUrl = '/system/role'

export const getRoleDataAPI = createListAPI<
  SystemRoleSearchParams,
  SystemRoleData
>(`${roleBaseUrl}/list`)

export const createRoleAPI = (data: SystemRoleFormData) =>
  request.post<BaseResponse>({ url: `${roleBaseUrl}`, data })

export const getRoleDetailAPI = (id: string | number) =>
  request.get<DataResponse<SystemRoleData>>({ url: `${roleBaseUrl}/${id}` })

export const updateRoleAPI = (data: SystemRoleFormData & { roleId: string }) =>
  request.put<BaseResponse>({ url: `${roleBaseUrl}`, data })

export const deleteRoleAPI = (data: { ids: Array<string> }) =>
  request.post<BaseResponse>({ url: `${roleBaseUrl}/delete`, data })

export const changeRoleStatus = (data: { roleId: number; status: string }) => {
  return request.put<BaseResponse>({ url: `${roleBaseUrl}/changeStatus`, data })
}

export const setRolePermissionData = (
  data: SystemRolePermissionFormData & { roleId: number }
) => {
  return request.put<BaseResponse>({ url: `${roleBaseUrl}/dataScope`, data })
}
