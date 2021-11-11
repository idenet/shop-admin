<template>
  <app-dialog-form
    :title="props.attrId ? '编辑商品规格' : '添加商品规格'"
    width="80%"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    :confirm="handleConfirm"
  >
    <el-form ref="form" :model="formData" :rules="formRules" v-loading="formLoading">
      <el-form-item label="规格模板名称" label-width="120px" prop="rule_name">
        <el-input type="text" v-model="formData.rule_name" />
      </el-form-item>
      <!-- 规格列表 -->
      <el-form-item
        label-width="120px"
        v-for="(item, index) in formData.spec"
        :key="item.value"
        prop="spec"
      >
        <el-tag closable>{{ item.value }}</el-tag>
        <div class="list">
          <el-tag
            closable
            v-for="$item in item.detail"
            :key="$item"
            style="margin-right: 10px;"
          >{{ $item }}</el-tag>
          <el-input type="text" v-model="detailValue">
            <template #append>
              <el-button type="primary" @click="addSpec(index)">添加</el-button>
            </template>
          </el-input>
        </div>
      </el-form-item>
      <!-- 添加规格按钮 -->
      <el-form-item label-width="120px" v-if="!showAdd">
        <el-button type="primary" @click="showAdd = true;">添加新规格</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="specObj" :rules="speRule" ref="specRef" v-if="showAdd">
      <el-form-item label="规格名称" label-width="120px" prop="value">
        <el-input v-model="specObj.value" placeholder="请输入规格"></el-input>
      </el-form-item>
      <el-form-item label="规格值" prop="detail">
        <el-input v-model="specObj.detail" placeholder="请输入规格值"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindSpeObj">确定</el-button>
        <el-button @click="showAdd = false; specRef?.resetFields()">取消</el-button>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang='ts' setup>
import { getAttrRule, setAttrRule } from '@/api/attr';
import { IElForm, IFormRule } from '@/types/element-plus';
import { ElMessage } from 'element-plus';
import { PropType, ref } from 'vue';

const props = defineProps({
  attrId: {
    type: Number as PropType<number>,
    default: 0,
  },
})

const specObj = ref<IspeOne>({
  value: '',
  detail: '',
})
const formLoading = ref(false)
const formData = ref<IFormData>({
  rule_name: '',
  spec: [],
})
const showAdd = ref(false)

interface EmitsType {
  (e: 'success'): void
  (e: 'update:attr-id', value: number): void
}
const emit = defineEmits<EmitsType>()

const form = ref<IElForm | null>(null)
const specRef = ref<IElForm | null>(null)
const detailValue = ref('')
const formRules: IFormRule = {
  rule_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
}
const speRule: IFormRule = {
  value: [
    { required: true, message: '请输入规格名称', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请输入规格值', trigger: 'blur' },
  ],
}

const bindSpeObj = async () => {
  const valid = await specRef.value?.validate()
  if (!valid) return
  let obj = {
    value: specObj.value.value,
    detail: [specObj.value.detail],
  }
  formData.value.spec.push(obj)
  specRef.value?.resetFields()
  specRef.value?.clearValidate()
  showAdd.value = false
}

const addSpec = (index: number) => {
  let arr = formData.value.spec[index].detail
  if (!arr.includes(detailValue.value)) {
    formData.value.spec[index].detail.push(detailValue.value)
  }
  detailValue.value = ''
}

// 关闭弹窗
const handleDialogClosed = () => {
  form.value?.resetFields()
  formData.value.spec = []
  form.value?.clearValidate()
  emit('update:attr-id', 0)
}

// 打开弹窗
const handleDialogOpen = () => {
  if (props.attrId) {
    loadAttrRule()
  }
}
// 确认
const handleConfirm = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  let arr = formData.value.spec
  if (arr.length == 0) {
    ElMessage.error('请输入至少一个规格')
    return
  }
  await setAttrRule(props.attrId, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}

const loadAttrRule = async () => {
  formLoading.value = true
  const data = await getAttrRule(props.attrId).finally(() => {
    formLoading.value = false
  })
  const { rule_name, spec } = data.info
  formData.value.rule_name = rule_name
  formData.value.spec = spec
}
</script>

<style lang='scss' scoped>
.el-input {
  width: 160px;
}
</style>
