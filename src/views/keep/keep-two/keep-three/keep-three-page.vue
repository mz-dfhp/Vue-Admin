<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: location.pathname,
})
const input = ref('')
</script>

<template>
  <div>
    <el-card shadow="hover">
      <div>缓存组件三</div>
    </el-card>
    <br>
    <el-card shadow="hover">
      <el-input v-model="input" placeholder="Please input" />
    </el-card>
  </div>
</template>

<style scoped></style>
