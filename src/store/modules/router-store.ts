import type { PermissionState, RouterData } from '@/router'
import type { ScRouteRecordRaw } from 'vue-router'
import { staticRoutes } from '@/router/modules/staticRoutes'
import { sessionStorage } from '@/utils/storage'
import { PROJECT_ID_KEY } from '@/constant/globalVariables'
import { getRouters } from '@/api/system/menu-api.ts'
import Layout from '@/layout/index.vue'

// 对views文件夹下的所有.vue文件进行自动导入
const modules = import.meta.glob('@/views/**/*.vue')

export const useGenerateRoutesStore = defineStore('generateRoutes', () => {
  const routers = reactive<PermissionState>({
    routes: [],
    addRoutes: [],
    sidebarRouters: []
  })

  const setRoutes = (routes: Array<ScRouteRecordRaw>) => {
    routers.routes = staticRoutes.concat(routes)
    routers.addRoutes = routes
  }

  const setSidebarRouters = (routes: Array<ScRouteRecordRaw>) => {
    routers.sidebarRouters = routes
  }

  const generateRoutes = () => {
    return new Promise<Array<ScRouteRecordRaw>>(async resolve => {
      const subjectId = sessionStorage.get(PROJECT_ID_KEY)
      const { data } = await getRouters(subjectId)
      const sidebarData: Array<ScRouteRecordRaw> = JSON.parse(
        JSON.stringify(data)
      ) as Array<ScRouteRecordRaw>
      const routerData: Array<ScRouteRecordRaw> = JSON.parse(
        JSON.stringify(data)
      ) as Array<ScRouteRecordRaw>
      const sidebarRoutes = filterAsyncRoutes(sidebarData)
      const rewriteRoute = filterAsyncRoutes(routerData, true)
      setRoutes(rewriteRoute)
      setSidebarRouters(staticRoutes.concat(sidebarRoutes))
      resolve(rewriteRoute)
    })
  }

  return {
    routers,
    generateRoutes
  }
})

const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

const filterAsyncRoutes = (routesMap: Array<ScRouteRecordRaw>, type = false) => {
  return routesMap.filter((r: ScRouteRecordRaw) => {
    if (type && r.children) {
      r.children = filterChildren(r.children)
    }
    if (r.component) {
      if (isString(r.component)) {
        if (r.component === 'Layout') {
          // @ts-ignore
          r.component = Layout
        } else {
          const view = loadView(r.component)
          r.component = view || (() => import('@/views/error/404.vue'))
        }
      }
    }
    if (r.children !== null && r.children && r.children.length) {
      r.children = filterAsyncRoutes(r.children, type)
    } else {
      if (!r.children || r.children.length === 0) {
        delete r.children
      }
    }
    return true
  })
}

const filterChildren = (childrenMap: Array<ScRouteRecordRaw>, lastRouter?: ScRouteRecordRaw) => {
  let children: Array<ScRouteRecordRaw> = []
  childrenMap.forEach(i => {
    if (lastRouter) {
      i.path = `${lastRouter.path.replace(/\/$/, '')}/${i.path.replace(/^\//, '')}`
      if (i.children && i.children.length) {
        children = children.concat(filterChildren(i.children, i))
        return
      }
    }
    children = children.concat(i)
  })
  return children
}

const loadView = (view: string): (() => Promise<any>) | undefined => {
  const match = Object.keys(modules).find(path => path.includes(`/views/${view}.vue`))
  return match ? modules[match] : undefined
}

export const useGenerateProcessRouterStore = defineStore('generateProcessRouter', () => {
  const sidebarRouters = ref<Array<RouterData>>([])

  const setSidebarRouters = (routes: Array<RouterData>) => {
    sidebarRouters.value = routes
  }

  const generateProcessRouter = () => {
    return new Promise<Array<ScRouteRecordRaw>>(async resolve => {
      const subjectId = sessionStorage.get(PROJECT_ID_KEY)
      const { data } = await getRouters({ isSubjectMenu: '2', subjectId })
      const sidebarData: Array<RouterData> = JSON.parse(JSON.stringify(data)) as Array<RouterData>
      setSidebarRouters(sidebarData)
      const processSidebarRoutes = generatePrrcessRoutes(sidebarData)
      resolve(processSidebarRoutes)
    })
  }

  return {
    sidebarRouters,
    generateProcessRouter
  }
})

// 将后端返回数据进行处理，生成路由
function generatePrrcessRoutes(routes: RouterData[], basePath = ''): ScRouteRecordRaw[] {
  const result: ScRouteRecordRaw[] = []
  routes.forEach(item => {
    if (item.hidden) return
    const fullPath = basePath ? `${basePath}/${item.path}` : item.path
    if (item.component === 'Layout') {
      if (item.children && item.children.length > 0) {
        result.push(...generatePrrcessRoutes(item.children, fullPath))
      }
    } else {
      const componentPath = `/src/views/${item.component}.vue`
      if (modules[componentPath]) {
        result.push({
          path: fullPath,
          name: item.name,
          component: modules[componentPath],
          meta: item.meta
        } as unknown as ScRouteRecordRaw)
      } else {
        console.warn(`组件路径不存在: ${componentPath}`)
      }
      if (item.children && item.children.length > 0) {
        result.push(...generatePrrcessRoutes(item.children, fullPath))
      }
    }
  })
  return result
}
