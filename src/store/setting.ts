import { ref, watch } from 'vue'

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
    const tabName = ref<TabName>('etherealize')
    function setTabName(data: TabName) {
      tabName.value = data
    }
    const themeColor = ref('rgb(22, 119, 255)')
    function setThemeColor(data: string) {
      themeColor.value = data
      const el: HTMLElement = document.documentElement
      const colors: Record<string, number> = {
        '--el-color-primary': 1,
        '--el-color-primary-light-3': 0.7,
        '--el-color-primary-light-5': 0.5,
        '--el-color-primary-light-7': 0.3,
        '--el-color-primary-light-8': 0.2,
        '--el-color-primary-light-9': 0.1,
        '--el-color-primary-dark-2': 1,
      }
      Object.keys(colors).forEach((item: string) => {
        el.style.setProperty(
          item,
          `${data.replace(')', '')},${colors[item]})`,
        )
      })
      el.style.setProperty('--el-text-color-secondary', data)
      themeColor.value = data
    }
    watch(themeColor, (value) => {
      if (value) {
        setThemeColor(value)
      }
    }, {
      immediate: true,
    })

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
