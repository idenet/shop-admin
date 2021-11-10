<template>
  <el-menu
    :unique-opened="true"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#bcc0c5"
    active-text-color="#2d8cf0"
    :collapse="store.state.isCollapse"
    router
  >
    <el-menu-item index="/">
      <i class="el-icon-menu" />
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <i class="el-icon-location" />
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <i class="el-icon-menu" />
        <template #title>商品列表</template>
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <i class="el-icon-menu" />
        <template #title>商品分类</template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <i class="el-icon-menu" />
        <template #title>商品规格</template>
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <i class="el-icon-menu" />
        <template #title>商品评论</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/setting">
      <template #title>
        <i class="el-icon-location" />
        <span>权限管理</span>
      </template>
      <el-menu-item index="/setting/system_admin/index">
        <i class="el-icon-menu" />
        <template #title>管理员</template>
      </el-menu-item>
      <el-menu-item index="/setting/system_role/index">
        <i class="el-icon-menu" />
        <template #title>角色</template>
      </el-menu-item>
      <el-menu-item index="/setting/system_menus/index">
        <i class="el-icon-menu" />
        <template #title>规则</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/system">
      <template #title>
        <i class="el-icon-location" />
        <span>维护</span>
      </template>
      <el-menu-item index="/system/file/index">
        <i class="el-icon-menu" />
        <template #title>附件管理</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>

import { useStore } from '@/store';
const store = useStore()

</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
