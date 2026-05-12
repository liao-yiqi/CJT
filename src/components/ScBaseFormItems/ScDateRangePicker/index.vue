<script setup lang="ts">
import ScBaseDate from '@/components/ScBaseDate/index.vue'
import type { ScDateRangePickerProps, ScDateRangePickerEmits } from './scDateRangePicker'

const props = withDefaults(defineProps<ScDateRangePickerProps>(), {
  type: 'daterange',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期'
})

const emit = defineEmits<ScDateRangePickerEmits>()
</script>

<template>
  <ScBaseDate
    :model-value="props.modelValue"
    :type="props.type"
    :format="props.format"
    :value-format="props.valueFormat"
    :start-placeholder="props.startPlaceholder"
    :end-placeholder="props.endPlaceholder"
    :disabled="props.disabled"
    :clearable="props.clearable"
    :size="props.size"
    :range-separator="props.rangeSeparator"
    @update:model-value="emit('update:modelValue', $event as [string, string])"
    @change="emit('change', $event as [string, string])"
  />
</template>
