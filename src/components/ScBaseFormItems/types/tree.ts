export interface ScTreeOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: Array<ScTreeOption>
}

export interface ScTreeFieldName {
  label: string
  children: string
  disabled?: string
}
