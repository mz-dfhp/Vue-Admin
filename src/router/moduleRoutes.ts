import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../views/**/*.vue')
console.log(modules)
const modulesRoutes: Array<RouteRecordRaw> = []
Object.keys(modules).forEach((fileName) => {
  modulesRoutes.push({
    path: fileName.replace('../views', '').replace('.vue', ''),
    component: modules[fileName],
  })
})

console.log(modulesRoutes)
