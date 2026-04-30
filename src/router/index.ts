import { afterEach, beforeEach } from '@/utils/routerInterceptor'
import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './modules/staticRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

beforeEach(router)
afterEach(router)

export default router
