import request from '@/utils/request'
import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  ProjectRoleData,
  ProjectRoleFormData,
  ProjectRoleSearchParams
} from '@/types/system/role/projectRole'

const projectRoleBaseUrl = '/ras/role'

export const getProjectRoleDataAPI = createListAPI<
  ProjectRoleSearchParams,
  ProjectRoleData
>(`${projectRoleBaseUrl}/list`)

export const createProjectRoleAPI = (data: ProjectRoleFormData) =>
  request.post<BaseResponse>({ url: `${projectRoleBaseUrl}/add`, data })

export const getProjectRoleDetailAPI = (id: string) =>
  request.get<DataResponse<ProjectRoleData>>({
    url: `${projectRoleBaseUrl}/${id}`
  })

export const updateProjectRoleAPI = (data: ProjectRoleFormData) =>
  request.put<BaseResponse>({ url: `${projectRoleBaseUrl}`, data })

export const deleteProjectRoleAPI = (data: { ids: Array<string> }) =>
  request.post<BaseResponse>({ url: `${projectRoleBaseUrl}/delete`, data })
