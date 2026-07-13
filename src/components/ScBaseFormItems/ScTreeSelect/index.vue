<script setup lang="ts">
import type {
  ScTreeSelectProps,
  ScTreeSelectEmits,
  ScTreeSelectOption
} from './scTreeSelect'

const props = withDefaults(defineProps<ScTreeSelectProps>(), {
  nodeKey: 'value',
  size: 'default',
  clearable: true,
  checkOnClickNode: true,
  checkStrictly: true
})

const emit = defineEmits<ScTreeSelectEmits>()

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const showCheckbox = computed(() => props.multiple)

const treeProps = computed(() => ({
  label: props.fieldNames?.label ?? 'label',
  children: props.fieldNames?.children ?? 'children',
  disabled: props.fieldNames?.disabled ?? 'disabled'
}))

const handleChange = (value: any) => emit('change', value)
const handleNodeClick = (data: ScTreeSelectOption) => emit('node-click', data)
const handleClear = () => emit('clear')
const handleVisibleChange = (visible: boolean) =>
  emit('visible-change', visible)
</script>

<template>
  <el-tree-select
    v-model="modelValue"
    :data="options"
    :node-key="nodeKey"
    :props="treeProps"
    :multiple="multiple"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :disabled="disabled"
    :size="size"
    :placeholder="placeholder"
    :clearable="clearable"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :multiple-limit="multipleLimit"
    :default-expand-all="defaultExpandAll"
    :render-after-expand="renderAfterExpand"
    :check-on-click-node="checkOnClickNode"
    :accordion="accordion"
    :no-data-text="noDataText"
    class="sc-tree-select"
    @change="handleChange"
    @node-click="handleNodeClick"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
  >
    <template v-if="labelMaxWidth" #default="{ data: nodeData }">
      <span
        class="sc-tree-select__label"
        :style="{
          maxWidth:
            typeof labelMaxWidth === 'number'
              ? `${labelMaxWidth}px`
              : labelMaxWidth
        }"
        :title="nodeData[treeProps.label]"
      >
        {{ nodeData[treeProps.label] }}
      </span>
    </template>
  </el-tree-select>
</template>

<style scoped lang="scss">
.sc-tree-select {
  width: 100%;
}

.sc-tree-select__label {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
