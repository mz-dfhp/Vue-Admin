import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

type TTransitionName = 'fade' | 'slide-fade' | 'zoom' | 'fade-transform'
type TabName = 'card' | 'etherealize'

const pid = 'STORE__SETTING'
export const useSettingStore = defineStore(
  pid,
  () => {
    const isDark = ref(false)
    function toggleDark() {
      isDark.value = !isDark.value
    }
    const transitionName = ref<TTransitionName>('fade-transform')
    function setTransitionName(data: TTransitionName) {
      transitionName.value = data
    }
    const collapsed = ref(false)
    function setCollapsed(data: boolean) {
      collapsed.value = data
    }
    const tabName = ref<TabName>('card')
    function setTabName(data: TabName) {
      tabName.value = data
    }
    const themeColor = ref('')
    function setThemeColor(data: string) {
      themeColor.value = data
    }
    return {
      isDark,
      toggleDark,
      transitionName,
      setTransitionName,
      collapsed,
      setCollapsed,
      tabName,
      setTabName,
      themeColor,
      setThemeColor,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const settingStoreWithout = () => useSettingStore(store)
