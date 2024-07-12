<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import AppSubMenu from '../AppSubMenu/index.vue'
import Logo from '@/assets/vue.svg'
import { useMenuStore } from '@/store/menu'
import { useSettingStore } from '@/store/setting'

const { collapsed } = storeToRefs(useSettingStore())

const { menuList } = storeToRefs(useMenuStore())

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
    <div class="h-full flex flex-col">
      <div v-if="false" class="h-[64px] w-full flex items-center justify-center">
        <img
          :src="Logo"
          class="logo mx-[10px] h-[32px] animate-bounce"
          alt="Vue logo"
        >
        <span v-if="!collapsed" class="overflow-hidden text-center">Vue-Admin</span>
      </div>
      <el-scrollbar class="flex-1">
        <el-menu
          :default-active="activeMenu"
          :collapse="collapsed"
          unique-opened
        >
          <AppSubMenu :menu-list="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- TODO -->
  </div>
</template>

<style scoped lang="scss">
:deep(.el-menu) {
  border-right: none;
}
</style>
