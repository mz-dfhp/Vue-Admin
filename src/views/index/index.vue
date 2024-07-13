<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: location.pathname,
})

const inputValue = ref('')
</script>

<template>
  <div class="h-[75vh]">
    index
    <el-input v-model="inputValue" placeholder="" />
  </div>
</template>

<style scoped lang="scss"></style>
