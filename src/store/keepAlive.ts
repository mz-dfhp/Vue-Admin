import { ref } from 'vue'
import { defineStore } from 'pinia'
import store from '@/store'

const pid = 'STORE__KEEPALIVE'
export const useKeepAliveStore = defineStore(pid, () => {
  const keepList = ref<string[]>([])

  function addKeepAlive(data: string) {
    keepList.value = Array.from(new Set([...keepList.value, data]))
  }

  function removeKeepAlive(data: string) {
    console.log(data)
    keepList.value = keepList.value.filter(item => item !== data)
  }

  return {
    keepList,
    addKeepAlive,
    removeKeepAlive,
  }
})
export const keepAliveStoreWithout = () => useKeepAliveStore(store)
