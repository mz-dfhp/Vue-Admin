import { ref } from 'vue'
import { defineStore } from 'pinia'
import store from '@/store'
import type { IPermission } from '@/interface'

const pid = 'STORE__MENU'
export const useMenuStore = defineStore(pid, () => {
  const menuList = ref<IPermission[]>([])
  function setMenusList(list: IPermission[]) {
    function sortList(list: IPermission[]) {
      return list.slice(0).sort((a, b) => (a?.sort || 1) - (b?.sort || 0))
    }
    menuList.value = sortList(list)
  }
  return {
    menuList,
    setMenusList,
  }
})

export const menuStoreWithout = () => useMenuStore(store)
