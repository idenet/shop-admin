<template>
  <app-dialog-form
    title="选择图标"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    :confirm="handleConfirm"
  >
    <app-card>
      <template #header>
        <div class="upload">
          <el-button type="primary" @click="handleUpload">上传图片</el-button>
          <input type="file" name="file" multiple id="file" ref="fileRef" @change="handleChange" />
        </div>
        <el-button type="danger" @click="handleDelete" v-if="selectFileList.length > 0">删除图片</el-button>
      </template>
      <div class="scroll">
        <el-card
          v-for="item in fileList"
          :key="item.att_id"
          class="card"
          :body-style="{ padding: '0px' }"
        >
          <el-image
            class="img"
            :src="item.satt_dir"
            :class="item.select === true ? 'active' : ''"
            @click="bindSelectFile(item)"
          ></el-image>
          <div class="bottom">
            <span class="name" v-if="!item.showInput">{{ item.real_name }}</span>
            <input
              type="text"
              ref="inputRef"
              v-model="item.real_name"
              class="input"
              v-else
              @keyup.enter.prevent="handleInputConfirm(item)"
              @blur.prevent="handleInputConfirm(item)"
            />
            <el-icon class="icon" @click="bindShowInput(item)">
              <Edit />
            </el-icon>
          </div>
        </el-card>
      </div>
      <app-pagination
        v-model:page="fileParams.page"
        v-model:limit="fileParams.limit"
        :total="fileCount"
        :load-list="_getFileList"
        :disabled="loading"
      ></app-pagination>
    </app-card>
  </app-dialog-form>
</template>

<script lang='ts' setup>
import { Edit } from '@element-plus/icons';
import { fileDelete, fileUpload, getFileList, updateFileName } from '@/api/file';
import { FileItem, FileParams, IFileItem } from '@/api/types/file';
import { nextTick, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const fileList = ref<IFileItem[]>([])
const fileCount = ref<number | null>(null)
const loading = ref<boolean>(false)

const fileRef = ref<HTMLInputElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const selectFileList = ref<IFileItem[]>([])


const fileParams = reactive<FileParams>({
  pid: 0,
  page: 1,
  limit: 20,
})


interface EmitsType {
  (e: 'updatePic', value: IFileItem): void
}

const emit = defineEmits<EmitsType>()

// 关闭
const handleDialogOpen = () => {
  _getFileList()
}

const handleDialogClosed = () => {
  fileList.value = []
  selectFileList.value = []
}

const handleConfirm = () => {
  if (selectFileList.value.length !== 1) {
    ElMessage.error('只能选择一张图片')
    return
  }
  emit('updatePic', selectFileList.value[0])
}

const _getFileList = async () => {
  loading.value = true
  const { count, list } = await getFileList(fileParams).finally(() => {
    loading.value = false
  })
  fileList.value = list.map(item => ({ ...item, select: false, showInput: false }))
  fileCount.value = count
}

const handleUpload = () => {
  if (!fileRef.value) return
  fileRef.value.value = ''
  fileRef.value.click()
}


const bindSelectFile = (item: IFileItem) => {
  item.select = !item.select
  let index = selectFileList.value.findIndex(v => v.att_id === item.att_id)
  if (index !== -1) {
    selectFileList.value.splice(index, 1)
  } else {
    selectFileList.value.push(item)
  }
}

// 展示修改名字
const bindShowInput = async (item: IFileItem) => {
  item.showInput = true
  await nextTick()
  inputRef.value?.focus()
}

/**
 * 修改名称
 */
const handleInputConfirm = async (item: IFileItem) => {
  if (item.real_name.length) {
    await updateFileName(item.att_id, item.real_name)
    item.showInput = false
    _getFileList()
  }
}


// 删除图片
const handleDelete = () => {
  ElMessageBox.confirm('确定要删除选中图片吗？删除选中图片后将无法恢复，请谨慎操作！', '删除选中图片', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let ids = selectFileList.value.map(item => item.att_id)
    await fileDelete(ids.join(','))
    _getFileList()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

const handleChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  loading.value = true
  await createPromise(files).finally(() => {
    loading.value = false
  })
  _getFileList()
}

// 将所有图片生成promise
const createPromise = (files: FileList) => {
  let fns = Array.from(files).map(item => fileUpload(item))
  return Promise.all(fns)
}
</script>

<style lang='scss' scoped>
.card {
  width: 120px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.upload {
  width: 98px;
  height: 40px;
}
.input {
  width: 80px;
  height: 20px;
}

.icon {
  display: none;
}

.img {
  width: 120px;
  height: 100px;
  cursor: pointer;
  &.active {
    width: 116px;
    height: 96px;
    border: 2px solid #5fb878;
  }
}

#file {
  display: none;
}

.scroll {
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  overflow-y: auto;
}
.bottom {
  box-sizing: border-box;
  padding: 14px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    .icon {
      display: block;
      cursor: pointer;
    }
  }
  .name {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
    text-align: center;
  }
}
</style>
