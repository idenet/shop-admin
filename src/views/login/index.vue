<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="form"
      :model="user"
      size="medium"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img class="login-logo" src="/assets/login_logo.png" alt="拉勾心选" />
      </div>
      <el-form-item prop="account">
        <el-input v-model="user.account" placeholder="请输入用户名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="user.pwd" type="password" placeholder="请输入密码">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input v-model="user.imgcode" placeholder="请输入验证码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Key />
              </el-icon>
            </template>
          </el-input>
          <img class="imgcode" alt="验证码" :src="captchaCode" @click="loadCaptcha" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-button" type="primary" :loading="loading" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getCaptcha, login } from '@/api/common'
import { useRouter, useRoute } from 'vue-router'
import type { IElForm, IFormRule } from '@/types/element-plus'
import { Key, Lock, User } from '@element-plus/icons'
import { store } from '@/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const captchaCode = ref('')

// 自动关联 ref = 'form'
const form = ref<IElForm | null>(null)

const user = reactive({
  account: 'zce',
  pwd: 'wanglei',
  imgcode: '',
})

const loading = ref(false)

const rules = ref<IFormRule>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' },
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' },
  ],
})

onMounted(() => {
  loadCaptcha()
})

const loadCaptcha = async () => {
  const data = await getCaptcha()
  captchaCode.value = URL.createObjectURL(data)
}

const handleSubmit = async () => {
  // 表单验证
  const valid = await form.value?.validate()
  if (!valid) {
    return false
  }
  // 验证通过， 展示loading
  loading.value = true
  // 请求提交
  const data = await login(user).catch(() => {
    loadCaptcha() // 刷新验证码
  }).finally(() => {
    loading.value = false
  })
  if (!data) return

  ElMessage.success('登录成功')
  // 存储用户登录信息
  store.commit('setUser', { ...data.user_info, token: data.token })
  // 存储menu信息
  store.commit('setMenus', data.menus)
  let redirect = route.query.redirect || '/'
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect)
  // 处理响应
}
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
