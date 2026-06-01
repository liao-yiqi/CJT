import type { ScSearchbarItem as ScSearchbarItemBase } from '@/components/ScBaseComponents'

export {}

declare global {
  type ScSearchbarItem<T> = ScSearchbarItemBase<T>
}
