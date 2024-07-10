<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './AppHeader/index.vue'
import AppMain from './AppMain/index.vue'
import AppTabs from './AppTabs/index.vue'
import AppMenu from './AppMenu/index.vue'

const collapsed = ref(false)
</script>

<template>
  <el-container class="w-full h-full">
    <el-aside width="0px">
      <AppMenu :collapsed="collapsed" />
    </el-aside>
    <el-container>
      <el-header class="h-auto px-0 leading-none">
        <AppHeader v-model:collapsed="collapsed" />
        <AppTabs />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
