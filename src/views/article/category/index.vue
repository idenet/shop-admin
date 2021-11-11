<template>
  <page-container>
    <app-card>
      <template #header>数据筛选</template>
      <el-form :inline="true" ref="form" :model="listParams" @submit.prevent="handleQuery">
        <el-form-item label="是否显示">
          <el-select v-model="listParams.status" placeholder="请选择" clearable>
            <el-option label="全部" value />
            <el-option label="显示" :value="1" />
            <el-option label="隐藏" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类昵称">
          <el-input v-model="listParams.title" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button type="primary">添加文章分类</el-button>
      </template>
      <el-table
        :data="categoryList"
        stripe
        border
        style="width: 100%"
        :disabled="listLoading"
        v-loading="listLoading"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="分类昵称" />
        <el-table-column label="分类图片">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.image" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
            <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :total="listCount"
        :load-list="categoryList"
        :disabled="listLoading"
      ></app-pagination>
    </app-card>
  </page-container>
</template>

<script lang='ts' setup>
import { getCategoryList } from '@/api/article';
import { onMounted, ref } from 'vue';

const listParams = ref<cateParams>({
  page: 1,
  limit: 20,
  status: '',
  title: '',
})
const listLoading = ref(false)
const categoryList = ref<cateList[]>([])
const listCount = ref(0)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  listLoading.value = true
  const { count, list } = await getCategoryList(listParams.value).finally(() => {
    listLoading.value = false
  })
  categoryList.value = list
  listCount.value = count
}

</script>

<style lang='scss' scoped>
</style>
