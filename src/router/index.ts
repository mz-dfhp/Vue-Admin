import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouterPermissions } from './permissions'
import { extensionRouter } from './extensionRouter'
import { basicsRoutes } from './basicsRoutes'

const routes: Array<RouteRecordRaw> = [
  ...basicsRoutes,
]

const router = createRouter({
  history: import.meta.env.MODE === 'github' ? createWebHashHistory() : createWebHistory(),
  routes,
})

createRouterPermissions(router)
extensionRouter(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
