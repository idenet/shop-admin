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
      </template>
      <el-table
        :data="rulelist"
        stripe
        border
        style="width: 100%"
        :disabled="listLoading"
        v-loading="listLoading"
      >
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
  <dialogAttrTemplateVue v-model="visible"></dialogAttrTemplateVue>
</template>

<script lang='ts' setup>
import { getRuleList } from '@/api/attr';
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

</script>

<style lang='scss' scoped>
</style>
