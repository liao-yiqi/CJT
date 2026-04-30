<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs'

const tabsStore = useTabsStore()
const cachedViews = computed(() => tabsStore.cachedViews)
</script>

<template>
  <main class="app-main">
    <el-scrollbar class="app-main__scrollbar">
      <div class="app-main__content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </main>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  overflow: hidden;
  background-color: var(--content-bg); // #f7f8fa

  &__scrollbar {
    height: 100%;

    :deep(.el-scrollbar__thumb) {
      background-color: var(--card-border); // #e8edf5
      border-radius: 4px;

      &:hover {
        background-color: var(--text-muted); // #9aa0b0
      }
    }
  }

  &__content {
    padding: 16px;
    min-height: 100%;
    box-sizing: border-box;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
