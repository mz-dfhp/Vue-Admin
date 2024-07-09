import { ref } from 'vue'

import { defineStore } from 'pinia'
import store from '@/store'

interface IUserInfo {
  username: string
  avatar: string
}
const pid = 'STORE__USER'
export const useUserStore = defineStore(
  pid,
  () => {
    const token = ref('')
    const userInfo = ref<IUserInfo>({
      username: 'admin',
      avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
      paths: ['userState.token'],
    },
  },
)

export const userStoreWithout = () => useUserStore(store)
