import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface TBreadcrumb extends
  Omit<RouteMeta, 'title' | 'hide'>,
  Omit<RouteRecordRaw, 'path'> { }

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
