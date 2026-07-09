export interface ScBaseUploadProps {
  modelValue: boolean
  uploadConfig: ScUploadConfig
  templateConfig?: ScTemplateConfig
  title?: string
  uploadFn?: (files: Array<File>) => Promise<void>
  uploadExtraParams?:Record<string, any>
}

export interface ScBaseUploadEmits {
  (e: 'update:modelValue', val: boolean): void
  (e: 'uploadSuccess'): void
}

export interface ScUploadConfig {
  uploadUrl: string
  headers?: Record<string, string>
  accept?: string[]
  multiple?: boolean
  successMsg?: string
}

export interface ScTemplateConfig {
  templateUrl: string
  requestMethod: 'GET' | 'POST'
  showTemplateDownload?: boolean
}

export type UploadFileStatus = 'pending' | 'uploading' | 'success' | 'error'

export interface ScUploadFileItem {
  uid: number
  file: File
  name: string
  size: number
  status: UploadFileStatus
  errorMsg?: string
}
