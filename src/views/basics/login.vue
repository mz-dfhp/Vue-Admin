<script setup lang="ts">
import { useRouter } from 'vue-router'
import { h, reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useUserStore } from '@/store/user'
import LoginSvg from '@/assets/login-bg.svg'

const { setToken } = useUserStore()
const UserIcon = h('div', {
  className: 'icon-[bi--person]',
  style: {
    fontSize: '20px',
    color: '#333333',
    flexShrink: '0',
  },
})
const passwordIcon = h('div', {
  className: 'icon-[bi--bag-dash]',
  style: {
    fontSize: '20px',
    color: '#333333',
    flexShrink: '0',
  },
})

const FormRef = ref<FormInstance>()
const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})
const router = useRouter()
async function submitForm() {
  await FormRef?.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (loginForm.username !== 'admin' || loginForm.password !== '123456') {
        ElMessage.error('登录失败')
        return
      }
      loading.value = true
      setToken(loginForm.username)
      loading.value = false
      router.replace({
        path: '/',
      })
    }
    else {
      loading.value = false
    }
  })
}
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center px-[20px]"
    style="background: linear-gradient(94deg, #232d3c, #162b5b, #20469c, #2863e3)"
  >
    <div class="h-[554px] w-full flex overflow-hidden rounded-[10px] lg:w-[960px] bg-white">
      <div class="w-0 flex items-center justify-center overflow-hidden lg:flex-1 lg:overflow-visible">
        <img :width="382" :height="382" :src="LoginSvg">
      </div>
      <div class="flex flex-1 bg-white">
        <el-form
          ref="FormRef"
          class="m-auto overflow-hidden rounded-8px bg-#ffffff p-30px w-225px h-270px"
          :model="loginForm"
          label-position="top"
          size="large"
          @submit.prevent="submitForm"
        >
          <el-form-item>
            <div className="pb-[20px] text-center text-[22px] text-[#5B86E5] font-bold w-full">
              Vue-Admin
            </div>
          </el-form-item>
          <el-form-item
            prop="username"
            :rules="{
              required: true,
              message: 'Please input username',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="loginForm.username"
              placeholder="admin"
              :prefix-icon="UserIcon"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="{
              required: true,
              message: 'Please input password',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="123456"
              :prefix-icon="passwordIcon"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              native-type="submit"
              type="primary"
              class="w-full"
              color="#1677ff"
              :loading="loading"
            >
              login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
