<script setup lang="ts">
interface Props {
  content: string
  clickable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  clickable: true
})

const emit = defineEmits<{
  click: []
}>()

const textRef = ref<HTMLElement>()
const isOverflow = ref(false)

const checkOverflow = () => {
  const el = textRef.value
  if (!el) return
  isOverflow.value = el.scrollWidth > el.clientWidth
}

let observer: ResizeObserver | null = null

onMounted(() => {
  nextTick(checkOverflow)
  if (textRef.value) {
    observer = new ResizeObserver(checkOverflow)
    observer.observe(textRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

const handleClick = () => {
  if (props.clickable) emit('click')
}
</script>

<template>
  <el-tooltip :content="content" :disabled="!isOverflow" placement="top">
    <span
      ref="textRef"
      class="ellipsis-link"
      :class="{ 'is-clickable': clickable }"
      @click="handleClick"
    >
      {{ content }}
    </span>
  </el-tooltip>
</template>

<style scoped lang="scss">
.ellipsis-link {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;

  &.is-clickable {
    color: var(--el-color-primary);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
