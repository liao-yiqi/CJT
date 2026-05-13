<script setup lang="ts">
import ScDateRangePicker from '@/components/ScBaseFormItems/ScDateRangePicker'
import type {
  ScDateRangeSelectorProps,
  ScDateRangeSelectorEmits
} from './ScSearchDateRangeSelector.ts'
import { ArrowDown, Calendar } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<ScDateRangeSelectorProps>(), {
  type: 'daterange',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  placeholder: '请选择时间范围',
  rangeSeparator: '至'
})
const emit = defineEmits<ScDateRangeSelectorEmits>()

const visible = ref(false)
const wrapperRef = ref<HTMLElement>()

const togglePanel = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

const closePanel = () => {
  visible.value = false
}

const handleDocumentClick = (e: MouseEvent) => {
  if (!visible.value) return
  const target = e.target as Node

  if (wrapperRef.value?.contains(target)) return

  const popperEls = document.querySelectorAll('.sc-date-range-select__popper, .el-picker__popper')
  for (const el of popperEls) {
    if (el.contains(target)) return
  }

  closePanel()
}

watch(visible, val => {
  if (val) {
    document.addEventListener('mousedown', handleDocumentClick)
  } else {
    document.removeEventListener('mousedown', handleDocumentClick)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleDocumentClick)
})

const localValue = ref<[string, string] | undefined>(props.modelValue)

watch(
  () => props.modelValue,
  val => {
    localValue.value = val
  }
)

const handleChange = (value: [string, string]) => {
  emit('update:modelValue', value)
  emit('change', value)
  closePanel()
}

const displayText = computed(() => {
  const val = props.modelValue
  if (!val || !val[0] || !val[1]) return ''
  return `${val[0]} ${props.rangeSeparator} ${val[1]}`
})
</script>

<template>
  <el-popover
    :visible="visible"
    placement="bottom-start"
    :show-arrow="false"
    :width="'auto'"
    popper-class="sc-date-range-select__popper"
  >
    <template #reference>
      <div
        ref="wrapperRef"
        class="sc-date-range-select"
        :class="{
          'is-disabled': props.disabled,
          'is-active': visible,
          [`sc-date-range-select--${props.size ?? 'default'}`]: true
        }"
        :title="displayText || undefined"
        @click="togglePanel"
      >
        <el-icon class="sc-date-range-select__icon sc-date-range-select__icon--prefix">
          <Calendar />
        </el-icon>
        <span class="sc-date-range-select__label" :class="{ 'is-placeholder': !displayText }">
          {{ displayText || props.placeholder }}
        </span>
        <el-icon
          class="sc-date-range-select__icon sc-date-range-select__icon--suffix"
          :class="{ 'is-active': visible }"
        >
          <ArrowDown />
        </el-icon>
      </div>
    </template>

    <div class="sc-date-range-select__panel">
      <ScDateRangePicker
        v-model="localValue"
        :type="props.type"
        :format="props.format"
        :value-format="props.valueFormat"
        :range-separator="props.rangeSeparator"
        @change="handleChange"
      />
    </div>
  </el-popover>
</template>

<style scoped lang="scss">
.sc-date-range-select {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  width: 220px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-fill-color-blank);
  cursor: pointer;
  transition: border-color 0.2s;
  user-select: none;
  box-sizing: border-box;
  &:hover:not(.is-disabled) {
    border-color: var(--el-border-color-hover);
  }
  &.is-active {
    border-color: var(--el-color-primary);
  }
  &.is-disabled {
    background-color: var(--el-disabled-bg-color);
    border-color: var(--el-disabled-border-color);
    cursor: not-allowed;
    .sc-date-range-select__label,
    .sc-date-range-select__icon {
      color: var(--el-disabled-text-color);
    }
  }
  &--large {
    height: 40px;
    font-size: 14px;
  }
  &--default {
    height: 32px;
    font-size: 14px;
  }
  &--small {
    height: 24px;
    font-size: 12px;
    padding: 0 8px;
  }
}
.sc-date-range-select__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: inherit;
  color: var(--el-text-color-regular);
  &.is-placeholder {
    color: var(--el-text-color-placeholder);
  }
}
.sc-date-range-select__icon {
  flex-shrink: 0;
  color: var(--el-text-color-placeholder);
  font-size: 14px;
  &--suffix {
    transition: transform 0.2s;
    &.is-active {
      transform: rotate(180deg);
    }
  }
}
.sc-date-range-select__panel {
  padding: 4px 0;
}
</style>

<style lang="scss">
.sc-date-range-select__popper {
  padding: 12px !important;
  width: fit-content !important;
  min-width: unset !important;
}
</style>
