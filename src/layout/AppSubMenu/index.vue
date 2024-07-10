<script lang="ts" setup>
import { useRouter } from 'vue-router'
// eslint-disable-next-line import/no-self-import
import AppSubMenu from './index.vue'

const props = withDefaults(defineProps<{ menuList: any[] }>(), {
  menuList: () => [],
})

const router = useRouter()

function menuItemClick(e: any) {
  router.push({
    path: e.index,
  })
}
</script>

<template>
  <template v-for="item in props.menuList">
    <template v-if="item.children && item.children.length">
      <el-sub-menu :key="item.path" :index="item.path">
        <template #title>
          <div class="mx-[5px]" :class="item.icon ? 'icon-[bi--grid-fill]' : ''" />
          <span>{{ item.title }}</span>
        </template>
        <AppSubMenu :menu-list="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="item.path" :index="item.path" @click="menuItemClick">
        <div class="mx-[5px]" :class="item.icon ? 'icon-[bi--grid-fill]' : ''" />
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped lang="scss"></style>
