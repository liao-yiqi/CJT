<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <div>test1{{ count }} <el-button @click="count++">+</el-button></div>
</template>

<style lang="scss" scoped></style>
