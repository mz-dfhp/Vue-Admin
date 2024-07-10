import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob(['../views/**/*.vue', '!../views/basics/*.vue'])
console.log(modules)
const asyncRoutes: Array<RouteRecordRaw> = []

Object.keys(modules).forEach((fileName) => {
  const path = fileName.replace('../views', '').replace('/index.vue', '').replace('.vue', '')
  asyncRoutes.push({
    path,
    component: modules[fileName],
    meta: {
      icon: 'icon-[bi--grid-fill]',
    },
  })
})
console.log(asyncRoutes)

export { asyncRoutes }
