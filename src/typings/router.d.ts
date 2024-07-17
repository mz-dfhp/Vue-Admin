import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface TBreadcrumb extends
  Pick<RouteMeta, 'title' | 'hide'>,
  Pick<RouteRecordRaw, 'path'> { }

interface CustomRouteMeta {
  title: string
  icon?: string
  keepAlive?: boolean
  activeMenu?: string
  hide?: boolean
  sort?: number
  breadcrumb?: TBreadcrumb[]
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}
