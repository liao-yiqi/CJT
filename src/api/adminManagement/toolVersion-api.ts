import request from '@/utils/request'
import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  ToolVersionData,
  ToolVersionSearchParams
} from '@/types/adminManagement/toolVersion'

const toolVersionBaseUrl = '/background/tool/version'

export const getToolVersionDataAPI = createListAPI<
  ToolVersionSearchParams,
  ToolVersionData
>(`${toolVersionBaseUrl}/list`)

export const createToolVersionAPI = (data: Record<string, unknown>) =>
  request.post<BaseResponse>({ url: `${toolVersionBaseUrl}`, data })

export const getToolVersionDetailAPI = (id: string) =>
  request.get<DataResponse<ToolVersionData>>({
    url: `${toolVersionBaseUrl}/${id}`
  })

export const updateToolVersionAPI = (data: Record<string, unknown>) =>
  request.put<BaseResponse>({ url: `${toolVersionBaseUrl}`, data })

export const deleteToolVersionAPI = (data: { ids: Array<string> }) =>
  request.post<BaseResponse>({ url: `${toolVersionBaseUrl}/delete`, data })
