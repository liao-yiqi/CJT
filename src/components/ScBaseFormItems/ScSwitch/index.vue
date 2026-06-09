<script setup lang="ts">
import type { ScSwitchEmits, ScSwitchProps } from './scSwitch.ts'

defineOptions({ name: 'ScSwitch' })

const props = withDefaults(defineProps<ScSwitchProps>(), {
  inactiveText: '',
  activeText: '',
  inlinePrompt: true,
  disabled: false,
  activeValue: true,
  inactiveValue: false
})

const emit = defineEmits<ScSwitchEmits>()

const switchValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<template>
  <el-switch
    v-model="switchValue"
    :inactive-text="inactiveText"
    :active-text="activeText"
    :inlinePrompt="inlinePrompt"
    :disabled="disabled"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
  />
</template>

<style scoped lang="scss"></style>
