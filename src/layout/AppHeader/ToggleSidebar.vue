<template>
  <el-icon size="24" @click="handleCollapse">
    <Fold />
  </el-icon>
</template>

<script lang="ts" setup>
import { Fold } from '@element-plus/icons'
import { useStore } from '@/store'
// import { computed } from 'vue'

const store = useStore()

// const collapseIcon = computed(() => {
//   return !store.state.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
// })

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped>
</style>
