<script setup lang="ts"></script>

<template>
  <div
    class="h-full w-full flex justify-center items-center flex-col"
    style="background: linear-gradient(25deg, #094089, #7e536a, #bb6947, #f38100)"
  >
    <div class="animate-bounce text-[30px]">
      404
    </div>
    <el-button type="primary" @click="$router.push('/')">
      去首页
    </el-button>
  </div>
</template>

<style scoped lang="scss"></style>
