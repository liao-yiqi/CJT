import request from '@/utils/request'
import { createListAPI } from '@/utils/pageRequest.ts'
import type {
  ToolLibraryData,
  ToolLibrarySearchParams
} from '@/types/adminManagement/toolLibrary'

const toolLibraryBaseUrl = '/background/tool'

export const getToolLibraryDataAPI = createListAPI<
  ToolLibrarySearchParams,
  ToolLibraryData
>(`${toolLibraryBaseUrl}/list`)

export const createToolLibraryAPI = (data: Record<string, unknown>) =>
  request.post<BaseResponse>({ url: `${toolLibraryBaseUrl}`, data })

export const getToolLibraryDetailAPI = (id: string) =>
  request.get<DataResponse<ToolLibraryData>>({
    url: `${toolLibraryBaseUrl}/${id}`
  })

export const updateToolLibraryAPI = (data: Record<string, unknown>) =>
  request.put<BaseResponse>({ url: `${toolLibraryBaseUrl}`, data })

export const deleteToolLibraryAPI = (data: { ids: Array<string> }) =>
  request.post<BaseResponse>({ url: `${toolLibraryBaseUrl}/delete`, data })
