import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

type TTransitionName = 'fade' | 'slide-fade' | 'zoom' | 'fade-transform'

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

    return {
      isDark,
      toggleDark,
      transitionName,
      setTransitionName,
      collapsed,
      setCollapsed,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const settingStoreWithout = () => useSettingStore(store)
