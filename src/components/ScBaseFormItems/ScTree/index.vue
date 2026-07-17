<script setup lang="ts">
import type { TreeInstance } from 'element-plus'
import type { ScTreeOption } from '../types/tree'
import type {
  ScTreeProps,
  ScTreeEmits,
  ScTreeCheckedInfo,
  ScTreeInstance
} from './scTree'

const props = withDefaults(defineProps<ScTreeProps>(), {
  nodeKey: 'value',
  checkStrictly: false,
  defaultExpandAll: false,
  disabled: false,
  filterable: false,
  emptyText: '暂无数据',
  maxHeight: 300
})

const emit = defineEmits<ScTreeEmits>()

const treeRef = useTemplateRef<TreeInstance>('treeRef')
const filterText = ref('')

const labelKey = computed(() => props.fieldNames?.label ?? 'label')
const childrenKey = computed(() => props.fieldNames?.children ?? 'children')

// 外部改 modelValue 时同步勾选状态；初始状态交给模板里的 default-checked-keys，这里只处理后续变化
watch(
  () => props.modelValue,
  keys => {
    treeRef.value?.setCheckedKeys(keys, false)
  }
)

watch(filterText, val => {
  treeRef.value?.filter(val)
})

const handleCheck = (data: any, checkedInfo: any) => {
  emit('update:modelValue', checkedInfo.checkedKeys)
  emit('check', data as ScTreeOption, checkedInfo as ScTreeCheckedInfo)
}

const filterNode = (value: string, data: Record<string, any>) => {
  if (!value) return true
  return String(data[labelKey.value] ?? '').includes(value)
}

// el-tree 没有公开的展开/收起全部方法，只能靠内部 store.nodesMap 遍历
const toggleAllExpanded = (expanded: boolean) => {
  const nodesMap = (treeRef.value as any)?.store?.nodesMap ?? {}
  Object.values(nodesMap).forEach((node: any) => {
    node.expanded = expanded
  })
}

const expandAll = () => toggleAllExpanded(true)
const collapseAll = () => toggleAllExpanded(false)

const collectAllKeys = (
  list: Array<Record<string, any>>
): Array<string | number> => {
  const keys: Array<string | number> = []
  const walk = (nodes: Array<Record<string, any>>) => {
    nodes.forEach(node => {
      keys.push(node[props.nodeKey])
      const children = node[childrenKey.value]
      if (children?.length) walk(children)
    })
  }
  walk(list)
  return keys
}

const checkAll = () => {
  const allKeys = collectAllKeys(props.options ?? [])
  treeRef.value?.setCheckedKeys(allKeys, false)
  emit('update:modelValue', allKeys)
}

const uncheckAll = () => {
  treeRef.value?.setCheckedKeys([], false)
  emit('update:modelValue', [])
}

const maxHeightStyle = computed(() =>
  typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
)

defineExpose<ScTreeInstance>({ expandAll, collapseAll, checkAll, uncheckAll })
</script>

<template>
  <div class="sc-tree" :class="{ 'is-disabled': disabled }">
    <el-input
      v-if="filterable"
      v-model="filterText"
      placeholder="输入关键字搜索"
      clearable
      class="sc-tree__filter"
    />
    <div class="sc-tree__container" :style="{ maxHeight: maxHeightStyle }">
      <el-tree
        ref="treeRef"
        :data="options"
        :props="fieldNames"
        :node-key="nodeKey"
        show-checkbox
        :check-strictly="checkStrictly"
        :default-expand-all="defaultExpandAll"
        :default-checked-keys="modelValue"
        :filter-node-method="filterNode"
        :empty-text="emptyText"
        @check="handleCheck"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sc-tree {
  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  &__filter {
    margin-bottom: 8px;
  }

  &__container {
    overflow-y: auto;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--el-border-radius-base);
    padding: 8px;
    scrollbar-width: thin;
    scrollbar-color: var(--el-fill-color-dark) transparent;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--el-fill-color-dark);
      border-radius: 3px;
      &:hover {
        background: var(--el-text-color-disabled);
      }
    }
  }
}
</style>
