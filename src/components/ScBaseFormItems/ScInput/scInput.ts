export type ScInputProps = {
  modelValue: string | number
  type?: ScInputType
  size?: 'large' | 'small' | 'default'
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  maxLength?: number
  showWordLimit?: boolean
  prefixIcon?: string
  suffixIcon?: string
  autosize?: boolean
}

export type ScInputType = 'text' | 'number' | 'textarea' | 'password'

export type ScInputEmits = {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'clear'): void
}
