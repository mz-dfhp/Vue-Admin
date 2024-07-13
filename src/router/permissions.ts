import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { setAsyncRoutes } from './setRoutes'
import { useKeepAliveStore } from '@/store/keepAlive'
import 'nprogress/nprogress.css'
import { userStoreWithout } from '@/store/user'
import { routerStoreWithout } from '@/store/router'

export function createRouterPermissions(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = userStoreWithout()
    const routeStore = routerStoreWithout()
    const token = userStore.token
    const routeLength = routeStore.routerList.length
    NProgress.start()
    // 如果有token
    if (token) {
      if (to.path === '/login') {
        next({
          path: '/index',
        })
      }
      else {
        if (routeLength === 0) {
          await setAsyncRoutes()
          return next({ ...to, replace: true })
        }
        next()
      }
    }
    else {
      if (to.path !== '/login') {
        return next({
          path: '/login',
          replace: true,
        })
      }
      next()
    }
  })

  router.afterEach((to) => {
    const keepAliveStore = useKeepAliveStore()
    if (to.meta.keepAlive) {
      keepAliveStore.addKeepAlive(to.path)
    }
    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
