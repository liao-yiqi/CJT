import type { Router } from 'vue-router'
import { getToken } from './auth'
import { useUserStore } from '@/store/modules/user-store.ts'
import { ElMessage } from 'element-plus'
import { isRelogin } from './request/handler/errorHandler'
import {
  useGenerateProcessRouterStore,
  useGenerateRoutesStore
} from '@/store/modules/router-store.ts'
import { isHttp } from './validate'
import NProgress from 'nprogress'
import pageLoader from '@/utils/pageLoader'
import { useGlobalStore } from '@/store/modules/global-store.ts'

const whiteList = new Set(['/login'])

export const beforeEach = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    const isProcess = to.fullPath.startsWith('/process')
    NProgress.start()
    if (!useGlobalStore().existLoading) {
      pageLoader.show()
      useGlobalStore().setExistLoading(true)
    }
    if (getToken()) {
      document.title = import.meta.env.VITE_APP_TITLE
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        try {
          await useUserStore().handleGetUserInfo()
          isRelogin.show = false
          const accessRoutes = await useGenerateRoutesStore().generateRoutes()
          accessRoutes.forEach(r => {
            if (!isHttp(r.path)) {
              router.addRoute(r)
            }
          })
          // 如果为项目流程路由，预加载子路由
          if (isProcess) {
            const processRoutes = await useGenerateProcessRouterStore().generateProcessRouter()
            processRoutes.forEach(r => {
              router.addRoute('process', r)
            })
          }
          next({ ...to, replace: true })
        } catch (error) {
          await useUserStore().handleLogout()
          ElMessage({
            message: String(error),
            type: 'error',
            plain: true
          })
          next({ path: '/' })
        }
      } else {
        const isNeedLoadProcessRouter =
          isProcess && useGenerateProcessRouterStore().sidebarRouters.length === 0
        if (isNeedLoadProcessRouter) {
          try {
            const processRoutes = await useGenerateProcessRouterStore().generateProcessRouter()
            processRoutes.forEach(r => {
              router.addRoute('process', r)
            })
            next({ ...to, replace: true })
          } catch (error) {
            console.error('加载项目流程路由失败', error)
            return next(false)
          }
        }
        return next()
      }
    } else {
      if (whiteList.has(to.path)) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  })
}

export const afterEach = (router: Router) => {
  router.afterEach(() => {
    if (useGlobalStore().existLoading) pageLoader.hide()
    NProgress.done()
  })
}
