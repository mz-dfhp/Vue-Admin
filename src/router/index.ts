import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'
import { basicsRoutes } from './basicsRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
  },
  ...basicsRoutes,
]

const router = createRouter({
  history: import.meta.env.MODE === 'github-io' ? createWebHashHistory() : createWebHistory(),
  routes,
})

createRouterPermissions(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
