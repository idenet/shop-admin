<template>
  <el-dropdown>
    <el-space class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon>
        <ArrowDownBold />
      </el-icon>
    </el-space>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handlLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDownBold } from '@element-plus/icons'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const store = useStore()

const handlLogout = () => {
  // 退出提示
  ElMessageBox.confirm(
    '确认退出吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      // 退出请求
      await logout()
      // 清除用户登录信息
      store.commit('setUser', null)
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
      // 跳转登录页
      router.push({ name: 'login' })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出已取消',
      })
    })
}

</script>

<style lang="scss" scoped>
</style>
