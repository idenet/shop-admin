<template>
  <app-dialog-form
    :title="props.id ? '编辑分类' : '添加分类'"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    :confirm="handleConfirm"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="160px"
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
        <el-input v-model="formData.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类图标(180*180)">
        <div class="fc-upload-btn" @click="emit('showDialog', 0)" v-if="!formData.pic">
          <el-icon>
            <plus />
          </el-icon>
        </div>
        <div v-else>
          <el-image style="width: 100px; height: 100px" :src="formData.pic" fit="fill"></el-image>
          <el-icon size="25" @click="bindDelete(0)">
            <circle-close />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item label="PC分类大图(468*340)">
        <div class="fc-upload-btn" v-if="!formData.big_pic" @click="emit('showDialog', 1)">
          <el-icon>
            <plus />
          </el-icon>
        </div>
        <div v-else>
          <el-image style="width: 100px; height: 100px" :src="formData.big_pic" fit="fill"></el-image>
          <el-icon size="25" @click="bindDelete(1)">
            <circle-close />
          </el-icon>
        </div>
      </el-form-item>
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
import { createClassify, eidtCategory, getEditCaterogy, getRoles } from '@/api/classify';
import { ISelectOptions } from '@/api/types/form';
import { IElForm, IFormRule } from '@/types/element-plus';
import { PropType, ref, watch } from 'vue';
import { Plus, CircleClose } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import { PostData } from '@/api/types/classify';

const props = defineProps({
  cateId: {
    type: Number as PropType<number | null>,
    default: null,
  },
  spic: {
    type: String,
    default: '',
  },
  bpic: {
    type: String,
    default: '',
  },
})

watch(() => props.spic, (value: string) => {
  formData.value.pic = value
})

watch(() => props.bpic, (value: string) => {
  formData.value.big_pic = value
})

interface EmitsType {
  (e: 'showDialog', value: number): void
  (e: 'update:cate-id', value: number | null): void
  (e: 'success'): void
}

const emit = defineEmits<EmitsType>()
const form = ref<IElForm | null>(null)
const formData = ref<PostData>({
  cate_name: '',
  big_pic: '',
  pic: '',
  pid: 0,
  sort: 0,
  is_show: 0 as 0 | 1,
})


const formLoading = ref(false)

const roles = ref<ISelectOptions[]>([])

const formRules: IFormRule = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
}


const handleDialogOpen = () => {
  if (props.cateId) {
    loadEditData()
  }
  loadRoles()
}

const handleConfirm = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  if (props.cateId) {
    await eidtCategory(props.cateId, formData.value)
  } else {
    await createClassify(formData.value)
  }

  emit('success')
  ElMessage.success('保存成功')
}

const handleDialogClosed = () => {
  emit('update:cate-id', null)
  form.value?.clearValidate()
  form.value?.resetFields()
}

const loadRoles = async () => {
  const data = await getRoles()
  roles.value = data
}

const loadEditData = async () => {
  const data = await getEditCaterogy(props.cateId as number)
  formData.value = data
}

// 删除图片
const bindDelete = (type: number) => {
  if (type == 0) {
    formData.value.pic = ''
  } else {
    formData.value.big_pic = ''
  }
}



</script>

<style lang='scss' scoped>
.fc-upload-btn {
  cursor: pointer;
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
