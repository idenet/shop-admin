<template>
  <el-icon size="24">
    <full-screen @click="toggleFullScreen" />
  </el-icon>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons'
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
