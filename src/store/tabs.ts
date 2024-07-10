import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

interface Tabs {
  key: string
  label: string
  closable: boolean
}

const pid = 'STORE__TABS'
export const useTabsStore = defineStore(
  pid,
  () => {
    const tabsList = ref<Tabs[]>([])

    function addTabs(data: Tabs) {
      tabsList.value = tabsList.value.concat(data)
    }
    function closeLeftTabs(key: string) {
      const i = tabsList.value.findIndex(item => item.key === key)
      tabsList.value = tabsList.value.filter((item, index) => index >= i || !item.closable)
    }
    function closeRightTabs(key: string) {
      const i = tabsList.value.findIndex(item => item.key === key)
      tabsList.value = tabsList.value.filter((item, index) => index <= i || !item.closable)
    }
    function closeCurrentTabs(key: string) {
      tabsList.value = tabsList.value.filter(item => item.key !== key || !item.closable)
    }
    function closeOtherTabs(key: string) {
      tabsList.value = tabsList.value.filter(item => item.key === key || !item.closable)
    }
    function closeAllTabs() {
      tabsList.value = tabsList.value.filter(item => !item.closable)
    }
    return {
      tabsList,
      addTabs,
      closeLeftTabs,
      closeRightTabs,
      closeCurrentTabs,
      closeOtherTabs,
      closeAllTabs,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const tabsStoreWithout = () => useTabsStore(store)
