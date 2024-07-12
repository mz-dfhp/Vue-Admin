<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div class="h-[75vh]">
    details
    <el-input v-model="inputValue" placeholder="" />
  </div>
</template>

<style scoped lang="scss"></style>
