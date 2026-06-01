import request from '@/utils/request'
import type {
  ProjectManagementData,
  ProjectManagementSearchParams
} from '@/types/projectManagement'

export const getProjectManagementList = (
  params: PaginationParams & ProjectManagementSearchParams
) => {
  return request.get<ListResponse<ProjectManagementData>>({
    url: '/background/subject/list',
    params
  })
}
