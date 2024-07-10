import { ref } from 'vue'
import { defineStore } from 'pinia'
import store from '@/store'

const pid = 'STORE__KEEPALIVE'
export const useKeepAliveStore = defineStore(pid, () => {
  const keepList = ref<string[]>([])

  function addKeepAlive(keepItem: string) {
    keepList.value = Array.from(new Set([...keepList.value, keepItem]))
  }

  function removeKeepAlive(keepItem: string) {
    keepList.value = keepList.value.filter(item => item !== keepItem)
  }

  return {
    keepList,
    addKeepAlive,
    removeKeepAlive,
  }
})
export const keepAliveStoreWithout = () => useKeepAliveStore(store)
