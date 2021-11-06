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
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDownBold } from '@element-plus/icons'
</script>

<style lang="scss" scoped>
</style>
