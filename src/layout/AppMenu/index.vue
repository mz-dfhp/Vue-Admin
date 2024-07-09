<script setup lang="ts">
import Logo from '@/assets/vue.svg'

const props = withDefaults(defineProps<{ collapsed: boolean }>(), {
  collapsed: false,
})
</script>

<template>
  <div class="h-full">
    <div class="h-[64px] w-full flex items-center justify-center">
      <img
        :src="Logo"
        class="logo mx-[10px] h-[32px] animate-bounce"
        alt="Vue logo"
      >
      <span v-if="!props.collapsed" class="overflow-hidden text-center">Vue-Admin</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
