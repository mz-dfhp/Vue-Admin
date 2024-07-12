import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import store from '@/store'

const pid = 'STORE__ROUTER'
export const useRouterStore = defineStore(
  pid,
  () => {
    const routerList = ref<any[]>([])

    function setRouterList(result: RouteRecordRaw[]) {
      routerList.value = result
    }
    return {
      routerList,
      setRouterList,
    }
  },
)

export const routerStoreWithout = () => useRouterStore(store)
