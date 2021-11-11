<template>
  <page-container>
    <app-card>
      <template #header>数据筛选</template>
      <el-form :inline="true" ref="form" :model="listParams" @submit.prevent="handleQuery">
        <el-form-item label="用户名称">
          <el-input v-model="listParams.account" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listParams.store_name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="评价状态">
          <el-select v-model="listParams.is_reply" placeholder="请选择" clearable>
            <el-option label="全部" value />
            <el-option label="显示" :value="1" />
            <el-option label="隐藏" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <!-- <template #header>
        <el-button type="primary" @click="visible = true">添加虚拟评论</el-button>
      </template>-->
      <el-table
        :data="replylist"
        stripe
        border
        style="width: 100%"
        :disabled="listLoading"
        v-loading="listLoading"
      >
        <el-table-column prop="id" label="评论ID" />
        <el-table-column label="商品信息">
          <template #default="{ row }">
            <el-image style="width: 50px; height: 50px" :src="row.image" fit="fill"></el-image>
            <span>{{ row.store_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="用户名称" />
        <el-table-column prop="score" sortable label="评分" />
        <el-table-column prop="comment" label="评论内容" />
        <!-- <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
            <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>-->
      </el-table>
      <app-pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :total="listCount"
        :load-list="loadList"
        :disabled="listLoading"
      ></app-pagination>
    </app-card>
  </page-container>
</template>

<script lang='ts' setup>
import { getReplyList } from '@/api/apply';
import { onMounted, ref } from 'vue';

const listParams = ref<replyParams>({
  page: 1,
  limit: 15,
  account: '',
  is_reply: '',
  store_name: '',
  data: '',
  product_id: '0',
})
const listLoading = ref(false)
const listCount = ref(0)
const replylist = ref<replyList[]>([])
const visible = ref(false)

onMounted(() => {
  loadList()
})

const handleQuery = () => {
  loadList()
}

const loadList = async () => {
  listLoading.value = true
  const { count, list } = await getReplyList(listParams.value).finally(() => {
    listLoading.value = false
  })
  replylist.value = list
  listCount.value = count
}

</script>

<style lang='scss' scoped>
</style>
