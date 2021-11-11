  <template>
  <page-container>
    <app-card>
      <template #header>数据筛选</template>
      <el-form :inline="true" ref="form" :model="listParams" @submit.prevent="handleQuery">
        <el-form-item label="规格名称">
          <el-input v-model="listParams.rule_name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button type="primary" @click="visible = true">添加商品规格</el-button>
        <el-button @click="bindDeleteAll" :disabled="listLoading">批量删除</el-button>
      </template>
      <el-table
        :data="rulelist"
        stripe
        border
        style="width: 100%"
        :disabled="listLoading"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="rule_name" label="规格名称" />
        <el-table-column prop="attr_name" label="商品规格" />
        <el-table-column label="商品属性">
          <template #default="{ row }">
            <span v-for="item in row.attr_value" :key="item">{{ item }}</span>
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
        :load-list="loadRuleList"
        :disabled="listLoading"
      ></app-pagination>
    </app-card>
  </page-container>
  <dialogAttrTemplateVue v-model="visible" @success="success" v-model:attr-id="attrId"></dialogAttrTemplateVue>
</template>

<script lang='ts' setup>
import { deleteRule, getRuleList } from '@/api/attr';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import dialogAttrTemplateVue from './dialogAttrTemplate.vue';

const listParams = ref<ruleParams>({
  page: 0,
  limit: 15,
  rule_name: '',
})

const rulelist = ref<ruleList[]>([])
const listCount = ref<number>()
const listLoading = ref(false)
const attrId = ref<number>(0)
const ids = ref<string>('')

const visible = ref(false)

onMounted(() => {
  loadRuleList()
})

const loadRuleList = async () => {
  listLoading.value = false
  const { count, list } = await getRuleList(listParams.value).finally(() => {
    listLoading.value = false
  })
  rulelist.value = list
  listCount.value = count
}

const handleQuery = () => {
  loadRuleList()
}

const handleSelectionChange = (e: ruleList[]) => {
  let arr = e.map(v => v.id)
  ids.value = arr.join(',')
}

const bindDeleteAll = () => {
  _deleteRule(ids.value)

}

// 点击单个删除
const handleDelete = (id: number) => {
  _deleteRule(id + '')
}
// 删除
const _deleteRule = async (ids: string) => {
  await deleteRule(ids)
  loadRuleList()
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}

// 保存成功
const success = () => {
  visible.value = false
  loadRuleList()
}

// 点击编辑
const handleUpdate = (id: number) => {
  attrId.value = id
  visible.value = true
}

</script>

<style lang='scss' scoped>
</style>
