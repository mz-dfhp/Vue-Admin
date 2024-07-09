import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

const pid = 'STORE__SETTING'
export const useSettingStore = defineStore(
  pid,
  () => {
    const isDark = ref(false)
    function toggleDark() {
      isDark.value = !isDark.value
    }
    return {
      isDark,
      toggleDark,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

export const settingStoreWithout = () => useSettingStore(store)
