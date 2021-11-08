<template>
  <el-icon>
    <menu />
  </el-icon>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#5c6b77',
  },
  size: {
    type: Number,
    default: 16,
  },
})

const styles = computed(() => {
  return {
    fontSize: `${props.size}px`,
    color: props.color,
  }
})
</script>

<style lang="scss">
</style>
