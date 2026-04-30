<script setup lang="ts">

</script>

<template>
  <div class="page-card">
    <div v-for="(_, i) in 5" :key="i" class="box">Home Page{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
