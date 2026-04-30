<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 取出 /redirect 后面的真实路径，立即跳回去
// 例如：/redirect/dashboard/list → /dashboard/list
const realPath = route.path.replace(/^\/redirect/, '') || '/'
router.replace(realPath)
</script>

<template>
  <div />
</template>
