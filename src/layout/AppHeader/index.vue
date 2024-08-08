<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
import { useUserStore } from '@/store/user'
import { useRefresh } from '@/hooks/useRefresh'
import { loginOut } from '@/api'

const route = useRoute()
const { refresh } = useRefresh()
const settingStore = useSettingStore()
const { isDark, collapsed } = storeToRefs(settingStore)
const { toggleDark, setCollapsed } = settingStore

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const { isFullscreen, toggle } = useFullscreen()

function goGithub() {
  window.open('https://github.com/mz-dfhp/Vue-Admin')
}
</script>

<template>
  <div class="h-[60px] flex items-center justify-between px-[20px]">
    <div
      class="cursor-pointer  text-[18px] flex-shrink-0"
      :class="collapsed ? 'icon-[bi--text-indent-left]' : 'icon-[bi--text-indent-right]'"
      @click="setCollapsed(!collapsed)"
    />
    <el-breadcrumb separator="/" class="ml-[20px] overflow-hidden w-0 lg:w-auto">
      <el-breadcrumb-item
        v-for="item in route.meta.breadcrumb"
        :key="item.path"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ml-auto flex items-center justify-around px-[25px]">
      <!-- <div
        class="icon-[bi--arrow-left-right] ml-[20px] cursor-pointer transition-all hover:scale-[1.2]"
      /> -->
      <div
        class="icon-[bi--github] ml-[20px] cursor-pointer transition-all hover:scale-[1.2]"
        @click="goGithub"
      />
      <div
        class="ml-[20px] cursor-pointer hover:scale-[1.2] transition-all"
        :class="isFullscreen ? 'icon-[bi--fullscreen-exit]' : 'icon-[bi--arrows-angle-expand]'"
        @click="toggle"
      />
      <div
        class="ml-[20px] cursor-pointer hover:scale-[1.2] transition-all`"
        :class="isDark ? 'icon-[bi--moon]' : 'icon-[bi--sun]'"
        @click="toggleDark"
      />
      <div
        class="icon-[bi--arrow-repeat] ml-[20px] cursor-pointer text-[16px] transition-all hover:scale-[1.2]"
        @click="refresh"
      />
    </div>
    <div>
      <el-dropdown>
        <div class=" flex-shrink-0 h-[40px] flex items-center justify-center cursor-pointer rounded-[8px] px-[5px] hover:bg-gray-100">
          <span class="mr-[10px]">{{ userInfo.username || '-' }}</span>
          <el-avatar :size="30" :src="userInfo.avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
