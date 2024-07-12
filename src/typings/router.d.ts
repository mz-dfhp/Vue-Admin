declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    keepAlive?: boolean
    activeMenu?: string
    hide?: boolean
    sort?: number
  }
}
