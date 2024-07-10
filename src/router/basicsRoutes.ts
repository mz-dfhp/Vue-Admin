import type { RouteRecordRaw } from 'vue-router'

export const basicsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/basics/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/basics/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/basics/redirect.vue'),
    meta: {
      title: '刷新',
    },
  },
]
