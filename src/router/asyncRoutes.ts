import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/*.router.ts', {
  import: 'default',
  eager: true,
})
let modulesRoutes: Array<RouteRecordRaw> = []

Object.keys(modules).forEach((item) => {
  modulesRoutes = modulesRoutes.concat(modules[item] as RouteRecordRaw)
})

export const asyncRoutes: Array<RouteRecordRaw> = modulesRoutes
