import { cloneDeep } from 'lodash-es'
import { asyncRoutes } from './asyncRoutes'
import router from '@/router'
import { routerStoreWithout } from '@/store/router'
import { menuStoreWithout } from '@/store/menu'
import { userStoreWithout } from '@/store/user'
import { getUserInfo } from '@/api/user'
import { diffRoutes, flatSystemRoutes } from '@/utils/router'

export async function setAsyncRoutes() {
  const routerStore = routerStoreWithout()
  const menuStore = menuStoreWithout()
  const userStore = userStoreWithout()
  // 获取用户信息
  const userInfo = await getUserInfo(userStore.token)
  // 保存用户信息
  await userStore.setUserInfo(userInfo)
  // 过滤路由后扁平化路由 处理二级以上 keep-alive
  const flatRoutes = flatSystemRoutes(cloneDeep(asyncRoutes))
  console.log(flatRoutes)

  // TODO
  //
  // 对路由进行对比 过滤无权限的路由
  const result = await diffRoutes(cloneDeep(flatRoutes), userInfo.permission)
  // 生成用来注册路由
  await routerStore.setRouterList(asyncRoutes || result)
  // 生成左侧菜单栏
  await menuStore.setMenusList(userInfo.permission)
  // 处理完addRoute
  routerStore.routerList.forEach((item) => {
    router.addRoute(item)
  })
}
