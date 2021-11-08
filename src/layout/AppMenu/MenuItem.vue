<template>
  <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
    <template #title>
      <el-icon size="24">
        <Menu />
      </el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <MenuItem v-for="subMenu in menu.children" :key="subMenu.path" :menu="subMenu" />
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <el-icon size="24">
      <Menu />
    </el-icon>
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang='ts' setup>
import { IMenu } from '@/api/types/common';
import { PropType, ref } from 'vue';
import { Menu } from '@element-plus/icons';

const props = defineProps({
  menu: {
    type: Object as PropType<IMenu>,
    required: true,
  },
})
const menu = ref(props.menu)
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
