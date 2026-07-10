export type ToolVersionSearchParams = {
  name: string
  purpose: string
}

export type ToolVersionData = {
  version: string
  secureVersion: string
} & CommonTableData

export type ToolVersionFormData = {
  version: string
  secureVersions: Array<{ secureVersion: string; toolId: string }>
  toolId: string
}
