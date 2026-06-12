<script setup lang="ts">
import type { ScBaseFormInstance, ScBaseFormProps } from './types/scBaseForm.ts'
import type { FormInstance, FormRules } from 'element-plus'
import {
  ScInput,
  ScSelect,
  ScRadio,
  ScCheckbox,
  ScSwitch,
  ScDatePicker,
  ScDateRangePicker
} from '../ScBaseFormItems'
import { ArrowUp } from '@element-plus/icons-vue'

defineOptions({ name: 'ScBaseForm' })

const props = withDefaults(defineProps<ScBaseFormProps>(), {
  labelWidth: '110px',
  inline: false,
  isGroup: false,
  columns: 2
})

// 表单规则
const formRules = computed<FormRules>(() => {
  return props.formItems.reduce((acc, item) => {
    if (item.rules) {
      acc[String(item.prop)] = Array.isArray(item.rules) ? item.rules : [item.rules]
    }
    return acc
  }, {} as FormRules)
})

// 组件映射表
const componentMap = {
  input: ScInput,
  select: ScSelect,
  date: ScDatePicker,
  dateRange: ScDateRangePicker,
  radio: ScRadio,
  checkbox: ScCheckbox,
  switch: ScSwitch
} as const

const scBaseFormRef = useTemplateRef<FormInstance>('scBaseFormRef')

// 分组聚合
const DEFAULT_GROUP = '基本信息'

// 计算分组表单项
const groupedItems = computed(() => {
  if (!props.isGroup) return null
  const map = new Map<string, typeof props.formItems>()
  props.formItems.forEach(item => {
    const key = item.groupName ?? DEFAULT_GROUP
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  })
  return map
})

// 折叠状态
const collapsedMap = reactive<Record<string, boolean>>({})

// 初始化展开/收缩
const initCollapsedMap = () => {
  if (!groupedItems.value) return
  groupedItems.value.forEach((_, groupName) => {
    if (!(groupName in collapsedMap)) {
      collapsedMap[groupName] = false
    }
  })
}

watch(groupedItems, initCollapsedMap, { immediate: true })

const toggleGroup = (groupName: string) => {
  collapsedMap[groupName] = !collapsedMap[groupName]
}

// 表单校验处理
const handleValidate = async () => {
  try {
    return await scBaseFormRef.value!.validate()
  } catch (errors: any) {
    Object.keys(errors).forEach(prop => {
      const item = props.formItems.find(i => i.prop === prop)
      const key = item?.groupName ?? DEFAULT_GROUP
      if (key in collapsedMap) {
        collapsedMap[key] = false
      }
    })
    throw errors
  }
}

defineExpose<ScBaseFormInstance>({
  validate: handleValidate,
  resetFields: () => scBaseFormRef.value!.resetFields(),
  clearValidate: props => scBaseFormRef.value!.clearValidate(props)
})
</script>

<template>
  <el-form
    ref="scBaseFormRef"
    :model="modelValue"
    :label-width="labelWidth"
    :inline="inline"
    :rules="formRules"
  >
    <!-- 分组模式 -->
    <template v-if="isGroup && groupedItems">
      <div v-for="[groupName, items] in groupedItems" :key="groupName" class="form-group">
        <div class="form-group__header" @click="toggleGroup(groupName)">
          <span class="form-group__title">{{ groupName }}</span>
          <el-icon class="form-group__icon" :class="{ 'is-collapsed': collapsedMap[groupName] }">
            <ArrowUp />
          </el-icon>
        </div>
        <div
          v-show="!collapsedMap[groupName]"
          class="form-group__body"
          :style="{ '--form-columns': columns }"
        >
          <el-form-item
            v-for="item in items"
            v-show="!item.hide?.(modelValue)"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :style="item.colSpan ? { 'grid-column': `span ${item.colSpan}` } : {}"
          >
            <slot
              v-if="item.customSlot"
              :name="`custom-${item.customSlot}`"
              :item="item"
              :data="modelValue"
            />
            <component
              v-else-if="item.type && componentMap[item.type]"
              :is="componentMap[item.type]"
              v-bind="item.componentProps"
              :modelValue="modelValue[item.prop]"
              @update:modelValue="modelValue[item.prop] = $event"
            />
          </el-form-item>
        </div>
      </div>
    </template>

    <!-- 非分组模式 -->
    <template v-else>
      <div class="form-body" :style="{ '--form-columns': columns }">
        <el-form-item
          v-for="item in formItems"
          v-show="!item.hide?.(modelValue)"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :style="item.colSpan ? { 'grid-column': `span ${item.colSpan}` } : {}"
        >
          <slot
            v-if="item.customSlot"
            :name="`custom-${item.customSlot}`"
            :item="item"
            :data="modelValue"
          />
          <component
            v-else-if="item.type && componentMap[item.type]"
            :is="componentMap[item.type]"
            v-bind="item.componentProps"
            :modelValue="modelValue[item.prop]"
            @update:modelValue="modelValue[item.prop] = $event"
          />
        </el-form-item>
      </div>
    </template>
  </el-form>
</template>

<style scoped lang="scss">
.form-group {
  margin-bottom: 8px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 12px;
    border-left: 3px solid var(--el-color-primary);
    background-color: var(--el-fill-color-light);
    cursor: pointer;
    user-select: none;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  &__icon {
    transition: transform 0.2s;

    &.is-collapsed {
      transform: rotate(180deg);
    }
  }

  &__body {
    padding: 0 12px;
  }
}

.form-body,
.form-group__body {
  display: grid;
  grid-template-columns: repeat(var(--form-columns, 2), 1fr);
  column-gap: 16px;
  align-items: start;
}
</style>
