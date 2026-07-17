import request from '@/utils/request'
import type {
  OrganizationManagementData,
  OrganizationManagementFormData,
  OrganizationManagementSearchParams,
  TreeDeptData
} from '@/types/system/organizationManagement'

const organizationManagementBaseUrl = '/system/dept'

export const getOrganizationManagementDataAPI = (
  params: ListQuery<OrganizationManagementSearchParams>
) => {
  return request.get<DataResponse<Array<OrganizationManagementData>>>({
    url: `${organizationManagementBaseUrl}/list`,
    params
  })
}

export const createOrganizationManagementAPI = (
  data: OrganizationManagementFormData
) =>
  request.post<BaseResponse>({ url: `${organizationManagementBaseUrl}`, data })

export const getOrganizationManagementDetailAPI = (id: string) =>
  request.get<DataResponse<OrganizationManagementData>>({
    url: `${organizationManagementBaseUrl}/${id}`
  })

export const updateOrganizationManagementAPI = (
  data: OrganizationManagementFormData & { deptId: string }
) =>
  request.put<BaseResponse>({ url: `${organizationManagementBaseUrl}`, data })

export const deleteOrganizationManagementAPI = (id: string) => {
  return request.delete<BaseResponse>({
    url: `${organizationManagementBaseUrl}/${id}`
  })
}

export const getDeptTreeDataByRoleId = (roleId: number) => {
  return request.get<TreeDeptData>({
    url: `/system/dept/roleDeptTreeselect/${roleId}`
  })
}
