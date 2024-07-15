<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue'
import { useSettingStore } from '@/store/setting'

const { width } = useWindowSize()

const settingStore = useSettingStore()
const { isDark } = storeToRefs(useSettingStore())
const { setCollapsed } = settingStore

watch(width, (newVal) => {
  if (newVal < 768) {
    setCollapsed(true)
  }
  else {
    setCollapsed(false)
  }
}, {
  immediate: true,
})

watch(isDark, (newVal) => {
  const html = document.querySelector('html')
  html?.classList.add(newVal ? 'dark' : 'light')
  html?.classList.remove(newVal ? 'light' : 'dark')
}, {
  immediate: true,
})
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
