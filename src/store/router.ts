import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

const pid = 'STORE__ROUTER'
export const useRouterStore = defineStore(
  pid,
  () => {
    const routerList = ref([])
    return {
      routerList,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const routerStoreWithout = () => useRouterStore(store)
