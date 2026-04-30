<template>
  <!-- Element Plus：el-icon- 前缀，如 el-icon-AddLocation -->
  <el-icon v-if="elIconComponent" class="menu-icon">
    <component :is="elIconComponent" />
  </el-icon>
  <!-- 本地 SVG：无前缀，如 dashboard、user-info -->
  <SvgIcon v-else-if="icon" :name="icon" size="1em" class="menu-icon" />
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const props = defineProps<{
  icon?: string
}>()

// 去掉 el-icon- 前缀后取组件名，如 el-icon-AddLocation → AddLocation
const elIconComponent = computed(() => {
  if (!props.icon?.startsWith('el-icon-')) return null
  const name = props.icon.replace('el-icon-', '')
  return (ElementPlusIconsVue as Record<string, any>)[name] ?? null
})
</script>

<style lang="scss" scoped>
.menu-icon {
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
}
</style>
