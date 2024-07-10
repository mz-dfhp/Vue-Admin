<script setup lang="ts" name="AppMain">
import { storeToRefs } from 'pinia'
import { useKeepAliveStore } from '@/store/keepAlive'
import { useSettingStore } from '@/store/setting'

const { keepList } = storeToRefs(useKeepAliveStore())
const { transitionName } = storeToRefs(useSettingStore())
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" appear :name="transitionName">
      <keep-alive :include="keepList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="scss"></style>
