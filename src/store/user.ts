import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'
import type { IUserInfo } from '@/interface'

const pid = 'STORE__USER'
export const useUserStore = defineStore(
  pid,
  () => {
    const token = ref('')
    const userInfo = ref<IUserInfo>({
      username: 'admin',
      avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      permission: [],
    })
    function setToken(data: string) {
      token.value = data
    }
    function setUserInfo(data: IUserInfo) {
      userInfo.value = data
    }
    return {
      token,
      userInfo,
      setToken,
      setUserInfo,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['token'],
    },
  },
)

export const userStoreWithout = () => useUserStore(store)
