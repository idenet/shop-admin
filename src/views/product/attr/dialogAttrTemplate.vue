<template>
  <app-dialog-form title="添加商品规格" width="80%">
    <el-form ref="form" :model="formData" :rules="formRules" v-loading="formLoading">
      <el-form-item label="规格模板名称" required label-width="120px">
        <el-input type="text" v-model="formData.rule_name" />
      </el-form-item>
      <el-form-item label-width="120px" v-for="item in formData.spec" :key="item.value"></el-form-item>
      <el-form-item label-width="120px" v-if="!showAdd">
        <el-button type="primary" @click="showAdd = true">添加新规格</el-button>
      </el-form-item>
      <el-form-item label-width="0px" v-else>
        <el-form :inline="true" :model="specObj" :rules="speRule">
          <el-form-item label="规格名称" label-width="120px">
            <el-input v-model="specObj.value" placeholder="请输入规格"></el-input>
          </el-form-item>
          <el-form-item label="规格值">
            <el-input v-model="specObj.detail" placeholder="请输入规格值"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="bindSpeObj">确定</el-button>
            <el-button @click="showAdd = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang='ts' setup>
import { IFormRule } from '@/types/element-plus';
import { ref } from 'vue';

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
const formRules: IFormRule = {
  cate_name: [
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

const bindSpeObj = () => {
  let obj = {
    value: specObj.value.value,
    detail: [specObj.value.detail],
  }
  formData.value.spec.push(obj)
  showAdd.value = false
}

</script>

<style lang='scss' scoped>
.el-input {
  width: 160px;
}
</style>
