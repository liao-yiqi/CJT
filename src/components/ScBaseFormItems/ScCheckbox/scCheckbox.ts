export interface ScCheckboxProps {
  modelValue: ScCheckboxValue
  inputValue?: string
  disabled?: boolean
  dictField?: string
  checkboxOptions?: Array<ScCheckboxOption>
  fieldNames?: ScCheckboxFieldName
  showInput?: Array<string | number>
}

export interface ScCheckboxEmits {
  (e: 'update:modelValue', value: ScCheckboxValue): void
}

export type ScCheckboxValue = Array<string | number>

export interface ScCheckboxOption {
  label?: string
  value?: string | number
  disabled?: boolean
}

export interface ScCheckboxFieldName {
  label: string
  value: string
  disabled?: boolean
}
