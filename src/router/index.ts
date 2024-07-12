import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'
import { basicsRoutes } from './basicsRoutes'
import { asyncRoutes } from './asyncRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: asyncRoutes,
  },
  ...basicsRoutes,
]

const router = createRouter({
  history: import.meta.env.MODE === 'github' ? createWebHashHistory() : createWebHistory(),
  routes,
})

createRouterPermissions(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
