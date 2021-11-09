<template>
  <app-card>
    <template #header>数据筛选</template>
    <el-form :inline="true" ref="form" :model="listParams" @submit.prevent="handleQuery">
      <el-form-item label="商品分类">
        <el-select v-model="listParams.pid" placeholder="请选择" clearable>
          <el-option
            :label="item.cate_name"
            :value="item.pid"
            v-for="item in classifyList"
            :key="item.pid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="listParams.is_show" placeholder="请选择" clearable>
          <el-option label="全部" value />
          <el-option label="显示" :value="1" />
          <el-option label="隐藏" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称">
        <el-input v-model="listParams.cate_name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit">查询</el-button>
      </el-form-item>
    </el-form>
  </app-card>
  <app-card>
    <template #header>
      <el-button type="primary">添加分类</el-button>
    </template>
    <vxe-table
      :data="categoryList"
      row-id="id"
      :tree-config="{ children: 'children' }"
      v-loading="listLoading"
    >
      <vxe-column field="id" title="ID"></vxe-column>
      <vxe-column field="cate_name" title="分类名称" tree-node></vxe-column>
      <vxe-column title="分类图标">
        <template #default="{ row }">
          <el-image style="width: 40px; height: 40px" :src="row.pic"></el-image>
        </template>
      </vxe-column>
      <vxe-column field="sort" title="排序"></vxe-column>
      <vxe-column title="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row.statusLoading"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </vxe-column>
      <vxe-column title="操作" min-width="100" fixed="right" align="center">
        <template #default="scope">
          <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>
  </app-card>
</template>


<script lang='ts' setup>
import { getCategoryList } from '@/api/classify';
import { CategoryList, CateGoryParams } from '@/api/types/classify';
import { onMounted, reactive, ref } from 'vue';


const listParams = reactive({
  page: 0,
  limit: 15,
  pid: '',
  cate_name: '',
  is_show: '' as CateGoryParams['is_show'],
})

const classifyList = ref<{
  cate_name: string,
  pid: number
}[]>([])
const listLoading = ref(true)


onMounted(() => {
  loadCategoryList()
})
const categoryList = ref<CategoryList[]>([])

const loadCategoryList = async () => {
  listLoading.value = true
  const { list } = await getCategoryList(listParams).finally(() => {
    listLoading.value = false
  })
  categoryList.value = list
  classifyList.value = list.map(item => ({ cate_name: item.cate_name, pid: item.id }))
}

const handleQuery = () => {
  loadCategoryList()
}

const handleStatusChange = () => {

}

//编辑
const handleUpdate = () => {

}

// 删除成功
const handleDelete = () => {

}

</script>

<style lang='scss' scoped>
</style>
