export interface ScSwitchProps {
  modelValue: ScSwitchValue
  inactiveText?: string
  activeText?: string
  inlinePrompt?: boolean
  activeValue?: ScSwitchValue
  inactiveValue?: ScSwitchValue
  disabled?: boolean
}

export interface ScSwitchEmits {
  (e: 'update:modelValue', value: ScSwitchValue): void
}

export type ScSwitchValue = string | number | boolean
