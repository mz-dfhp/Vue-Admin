<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import AppSubMenu from '../AppSubMenu/index.vue'
import Logo from '@/assets/vue.svg'
import { useRouterStore } from '@/store/router'

const props = withDefaults(defineProps<{ collapsed: boolean }>(), {
  collapsed: false,
})

const routerStore = useRouterStore()
const { menuList } = storeToRefs(routerStore)

const route = useRoute()
const activeMenu = ref('')

watch(
  () => route.name,
  () => {
    activeMenu.value = route.path
  },
  {
    immediate: true,
  },
)
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
    <el-menu
      :default-active="activeMenu"
      :collapse="props.collapsed"
      unique-opened
    >
      <AppSubMenu :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<style scoped lang="scss"></style>
