import type { ScRouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const staticRoutes: Array<ScRouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/test1',
        component: () => import('@/views/test/test1.vue'),
        meta: { title: '测试菜单1' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/test2',
        component: () => import('@/views/test/test2.vue'),
        meta: { title: '测试菜单2' }
      }
    ]
  },
  {
    path: '/first',
    component: Layout,
    meta: { title: '多级菜单' },
    children: [
      {
        path: 'test3',
        name: 'test3',
        component: () => import('@/views/test/test3.vue'),
        meta: { title: '测试菜单3' }
      },
      {
        path: 'test4',
        name: 'test4',
        component: () => import('@/views/test/test4.vue'),
        meta: { title: '测试菜单4' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  }
]
