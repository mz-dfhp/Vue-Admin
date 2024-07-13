<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useRefresh } from '@/hooks/useRefresh'
import { useTabsStore } from '@/store/tabs'
import { PageEnum } from '@/enums/page'

const route = useRoute()
const router = useRouter()

const { refresh } = useRefresh()
const tabsStore = useTabsStore()
const { tabsList } = storeToRefs(tabsStore)
const { addTabs, closeLeftTabs, closeRightTabs, closeCurrentTabs, closeOtherTabs, closeAllTabs } = tabsStore

const activeKey = ref('')
const operateList = [
  { id: 1, title: '刷新当前', icon: 'icon-[bi--arrow-repeat]' },
  { id: 2, title: '关闭当前', icon: 'icon-[bi--x-lg]' },
  { id: 3, title: '关闭其他', icon: 'icon-[bi--x-lg]' },
  { id: 4, title: '关闭左侧', icon: 'icon-[bi--arrow-left-circle]' },
  { id: 5, title: '关闭右侧', icon: 'icon-[bi--arrow-right-circle]' },
  { id: 6, title: '关闭全部', icon: 'icon-[bi--x-lg]' },
] as const

function operateDisabled(id: typeof operateList[number]['id']) {
  const findIndex = tabsList.value.findIndex(
    item => item.key === activeKey.value,
  )
  switch (id) {
    case 1:
      return false
    case 2:
      return PageEnum.ROOT_INDEX === activeKey.value
    case 3:
      return tabsList.value.length === 2 || tabsList.value.length === 1
    case 4:
      return !(findIndex > 1)
    case 5:
      return !(tabsList.value.length > findIndex + 1)
    case 6:
      return tabsList.value.length <= 1
    default:
      return false
  }
}

function onTabRemove(key: string) {
  const index = tabsList.value.findIndex(item => item.key === key)
  const navigateIndex = index + (tabsList.value.length - 1 === index ? -1 : 1)
  router.push({
    path: tabsList.value[navigateIndex].key,
    replace: true,
  })
  closeCurrentTabs(key)
}

function onTabClick(e: { paneName: string }) {
  router.push({
    path: e.paneName,
  })
}

function handleCommand(id: typeof operateList[number]['id']) {
  switch (id) {
    case 1:
      refresh()
      break
    case 2:
      onTabRemove(activeKey.value)
      break
    case 3:
      closeOtherTabs(activeKey.value)
      break
    case 4:
      closeLeftTabs(activeKey.value)
      break
    case 5:
      closeRightTabs(activeKey.value)
      break
    case 6:
      router.push(PageEnum.ROOT_INDEX)
      closeAllTabs()
      break
    default:
      break
  }
}

watch(() => route.path, () => {
  if (route.path !== activeKey.value) {
    const index = tabsList.value.findIndex(item => item.key === location.pathname)
    if (index === -1) {
      addTabs({
        key: route.path,
        label: route.meta.title as string || Math.random().toFixed(5),
        closable: route.path !== PageEnum.ROOT_INDEX,
      })
    }
    activeKey.value = route.path
  }
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex items-center overflow-hidden px-[5px]">
    <div class="flex-1 overflow-hidden">
      <el-tabs
        v-model="activeKey"
        type="card"
        @tab-remove="onTabRemove"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.key"
          :label="item.label"
          :name="item.key"
          :closable="item.closable"
        />
      </el-tabs>
    </div>
    <el-dropdown @command="handleCommand">
      <div
        class="icon-[bi--grid-fill] ml-auto w-[50px] flex-shrink-0 cursor-pointer text-[16px]"
      />
      <template #dropdown>
        <el-dropdown-item
          v-for="(item, index) in operateList"
          :key="index"
          :disabled="operateDisabled(item.id)"
          :command="item.id"
        >
          <div className="flex items-center">
            <div>{{ item.title }}</div>
            <div class="ml-[5px]" :class="item.icon" />
          </div>
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-scrollbar__wrap) {
  overflow: hidden;
}
:deep(.el-tabs) {
  .el-tabs__header {
    margin: 0;
    border-bottom: none;
    .el-tabs__nav-scroll {
      padding: 0;
      .el-tabs__nav {
        border: none !important;
      }
    }
  }
}
</style>
