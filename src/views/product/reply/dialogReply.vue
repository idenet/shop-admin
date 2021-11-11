<template>
  <app-dialog-form
    :title="props.cateId ? '编辑分类' : '添加分类'"
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
      <el-form-item label="商品" prop="image">
        <div class="fc-upload-btn" v-if="!formData.image.image">
          <el-icon>
            <plus />
          </el-icon>
        </div>
        <div v-else>
          <el-image style="width: 100px; height: 100px" :src="formData.image.image" fit="fill"></el-image>
          <el-icon size="25">
            <circle-close />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
        <div class="fc-upload-btn" v-if="!formData.avatar">
          <el-icon>
            <plus />
          </el-icon>
        </div>
        <div v-else>
          <el-image style="width: 100px; height: 100px" :src="formData.avatar" fit="fill"></el-image>
          <el-icon size="25">
            <circle-close />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item label="用户名称" prop="nickname" required>
        <el-input v-model="formData.nickname" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="评价文字" prop="comment" required>
        <el-input v-model="formData.comment" placeholder="请输入评价文字" />
      </el-form-item>
      <el-form-item label="商品分数" prop="product_score">
        <el-rate v-model="formData.product_score"></el-rate>
      </el-form-item>
      <el-form-item label="服务分数" prop="service_score">
        <el-rate v-model="formData.service_score"></el-rate>
      </el-form-item>
      <el-form-item label="评论图片" prop="pics">
        <div class="fc-upload-btn" v-if="formData.pics.length == 0">
          <el-icon>
            <plus />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item label="评论时间" prop="add_time">
        <el-date-picker v-model="formData.add_time" type="datetime" placeholder="请选择时间"></el-date-picker>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang='ts' setup>
import { IFormRule } from '@/types/element-plus';
import { reactive, ref } from 'vue';

const formData = reactive<replyPostData>({
  image: {} as Iimage,
  nickname: '',
  add_time: '',
  avatar: '',
  pics: [],
  comment: '',
  product_score: 0,
  service_score: 0,
})
const formRules: IFormRule = {
  image: [
    { required: true, message: '请选择商品', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请选择头像', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
  ],
  comment: [
    { required: true, message: '请输入评价文字', trigger: 'blur' },
  ],
  product_score: [
    { required: true, message: '商品分数', trigger: 'blur' },
  ],
  service_score: [
    { required: true, message: '服务', trigger: 'blur' },
  ],
  pics: [
    { required: true, message: '图片', trigger: 'blur' },
  ],
}

const formLoading = ref(false)

</script>

<style lang='scss' scoped>
</style>
