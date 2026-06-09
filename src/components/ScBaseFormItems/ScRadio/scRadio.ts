export interface ScRadioProps {
  modelValue: ScRadioValue
  radioOptions?: Array<ScRadioOption>
  dictField?: string
  fieldNames?: ScRadioFieldName
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  border?: boolean
}

export interface ScRadioEmits {
  (e: 'update:modelValue', value: ScRadioValue): void
}

export type ScRadioValue = string | number | undefined

export interface ScRadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface ScRadioFieldName {
  label: string
  value: string
}
