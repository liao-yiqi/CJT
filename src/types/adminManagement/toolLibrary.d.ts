export type ToolLibrarySearchParams = {
  name: string
  purpose: string
}

export type ToolLibraryData = {
  name: string
  type: string
  source: string
  purpose: string
} & CommonTableData

export type ToolLibraryFormData = Omit<ToolLibraryData, keyof CommonTableData>
