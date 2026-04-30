<script setup lang="ts">
defineProps<{
  name: string
  size?: string
}>()
</script>

<template>
  <svg class="svg-icon" :style="{ width: size, height: size }" aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  fill: currentColor;
  vertical-align: -0.15em;
  flex-shrink: 0;
}
</style>
