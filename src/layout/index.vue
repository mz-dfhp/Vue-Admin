<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppHeader from './AppHeader/index.vue'
import AppMain from './AppMain/index.vue'
import AppTabs from './AppTabs/index.vue'
import AppMenu from './AppMenu/index.vue'
import { useSettingStore } from '@/store/setting'

const { collapsed } = storeToRefs(useSettingStore())
</script>

<template>
  <el-container class="w-full h-full">
    <el-aside :width="collapsed ? '64px' : '200px'" class="transition-all duration-600">
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header class="h-auto px-0 leading-none">
        <AppHeader />
        <AppTabs />
      </el-header>
      <el-main class="bg-[#f5f5f5]">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
