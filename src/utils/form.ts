import type { ScBaseFormItem } from '@/components/ScBaseForm/types/formItem.ts'

type WithTypedProps<T extends Record<string, any>, Item> = Item extends ScBaseFormItem
  ? {
      [K in keyof Item]: K extends 'prop'
        ? keyof T
        : K extends 'hide'
          ? (formData: T) => boolean
          : Item[K]
    }
  : never

export const defineFormItems = <T extends Record<string, any>>(
  items: Array<WithTypedProps<T, ScBaseFormItem>>
): ScBaseFormItem[] => {
  return items as ScBaseFormItem[]
}
