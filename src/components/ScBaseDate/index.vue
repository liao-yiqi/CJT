<script setup lang="ts">
import type { ScBaseDateProps, ScBaseDateEmits } from './scBaseDate'

const props = withDefaults(defineProps<ScBaseDateProps>(), {
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  clearable: true,
  rangeSeparator: '至'
})

const emit = defineEmits<ScBaseDateEmits>()

function handleChange(value: string | [string, string]) {
  emit('change', value)
}
</script>

<template>
  <el-date-picker
    :model-value="props.modelValue"
    :type="props.type"
    :format="props.format"
    :value-format="props.valueFormat"
    :placeholder="props.placeholder"
    :start-placeholder="props.startPlaceholder"
    :end-placeholder="props.endPlaceholder"
    :disabled="props.disabled"
    :clearable="props.clearable"
    :size="props.size"
    :range-separator="rangeSeparator"
    @update:model-value="emit('update:modelValue', $event)"
    @change="handleChange"
  />
</template>
