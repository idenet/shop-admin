<template>
  <app-dialog-form :title="props.id ? '编辑分类' : '添加分类'">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="父级">
        <el-select v-model="formData.pid" placeholder="请选择父级">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="cate_name" required>
        <el-input v-model="formData.cate_name" placeholder="请输入管理员密码" />
      </el-form-item>
      <el-form-item label="分类图标(180*180)">
        <div class="fc-upload-btn">
          <el-icon>
            <plus />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item label="PC分类大图(468*340)"></el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model.number="formData.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.is_show">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang='ts' setup>
import { getRoles } from '@/api/classify';
import { ISelectOptions } from '@/api/types/form';
import { IFormRule } from '@/types/element-plus';
import { onMounted, PropType, ref } from 'vue';
import { Plus } from '@element-plus/icons';

const props = defineProps({
  id: {
    type: Number as PropType<number | null>,
    default: null,
  },
})

const formData = ref({
  cate_name: '',
  big_pic: '',
  pic: '',
  pid: 0,
  sort: 0,
  is_show: 0,
})

const formLoading = ref(false)

const roles = ref<ISelectOptions[]>([])

const formRules: IFormRule = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
}

onMounted(() => {
  loadRoles()
})

const loadRoles = async () => {
  const data = await getRoles()
  roles.value = data
}



</script>

<style lang='scss' scoped>
.fc-upload-btn {
  display: inline-block;
  width: 58px;
  height: 58px;
  text-align: center;
  line-height: 58px;
  border: 1px solid #c0ccda;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
  margin-right: 4px;
  box-sizing: border-box;
}
</style>
