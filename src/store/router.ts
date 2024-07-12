import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

const pid = 'STORE__ROUTER'
export const useRouterStore = defineStore(
  pid,
  () => {
    const routerList = ref([])
    const menuList = ref([
      {
        title: '首页',
        path: '/index',
      },
      {
        title: '缓存',
        path: '/keep',
        children: [
          {
            title: '缓存页面',
            path: '/keep/details',
          },
        ],
      },
      ...Array.from({ length: 20 }, (_, i) => ({
        title: `demo${i}`,
        path: `/demo${i}`,
      })),
    ])
    return {
      routerList,
      menuList,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const routerStoreWithout = () => useRouterStore(store)
