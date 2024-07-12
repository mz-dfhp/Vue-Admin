<script setup lang="ts">
import { useRouter } from 'vue-router'

defineExpose({
  name: 'keep-one-page-info',
})
const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <el-card shadow="hover">
      <div>缓存组件一(详情页)</div>
    </el-card>
    <br>
    <el-card shadow="hover">
      <div>看左侧菜单</div>
    </el-card>
    <br>
    <el-card shadow="hover">
      <el-button type="primary" @click="goBack">
        返回
      </el-button>
    </el-card>
  </div>
</template>

<style scoped></style>
