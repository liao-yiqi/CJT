import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const isCollapsed = ref(false)
  const isFullscreen = ref(false)

  const sidebarWidth = computed(() => (isCollapsed.value ? '64px' : '220px'))

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }

  return { isCollapsed, isFullscreen, sidebarWidth, toggleSidebar, toggleFullscreen }
})
