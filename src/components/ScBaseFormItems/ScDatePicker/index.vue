<script setup lang="ts">
import ScBaseDate from '@/components/ScBaseDate'
import type { ScDatePickerProps, ScDatePickerEmits } from './scDatePicker'

const props = withDefaults(defineProps<ScDatePickerProps>(), {
  type: 'date',
  placeholder: '请选择',
  clearable: true
})

const emit = defineEmits<ScDatePickerEmits>()
</script>

<template>
  <ScBaseDate
    :model-value="props.modelValue"
    :type="props.type"
    :format="props.format"
    :value-format="props.valueFormat"
    :placeholder="placeholder"
    :disabled="props.disabled"
    :clearable="clearable"
    :size="props.size"
    @update:model-value="emit('update:modelValue', $event as string)"
    @change="emit('change', $event as string)"
  />
</template>
