import type { RouteRecordRaw } from 'vue-router'

export const basicsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index.vue'),
    meta: {
      title: '刷新',
    },
  },
]
