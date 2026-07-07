<script setup lang="ts">
import type { ScInputEmits, ScInputProps } from './scInput.ts'
import type { InputInstance } from 'element-plus'

const props = withDefaults(defineProps<ScInputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  placeholder: '请输入',
  disabled: false,
  showWordLimit: false,
  clearable: true,
  rows: 5
})

const emit = defineEmits<ScInputEmits>()

const inputRef = useTemplateRef<InputInstance>('inputRef')

const value = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const handleInput = (value: string | number) => {
  emit('input', value)
}

const handleChange = (value: string | number) => {
  emit('change', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleClear = () => {
  emit('clear')
}

defineExpose({
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  },
  select: () => {
    inputRef.value?.select()
  },
  clear: () => {
    inputRef.value?.clear()
  },
  ref: inputRef
})
</script>

<template>
  <div class="input-container">
    <el-input
      ref="inputRef"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :maxlength="props.maxLength"
      :show-word-limit="showWordLimit"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :rows="rows"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @clear="handleClear"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </el-input>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  width: 100%;
  // 确保内部组件填满容器
  :deep(.el-input),
  :deep(.el-select) {
    width: 100%;
  }
  // 由于清除按钮出现会导致输入框改变长度
  // 从而让表单出现抖动
  :deep(.el-input__wrapper) {
    padding-right: 30px;
    transition: box-shadow 0.2s;
  }
  :deep(.el-input__suffix) {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
