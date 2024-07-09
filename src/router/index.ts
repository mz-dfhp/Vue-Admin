import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
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
