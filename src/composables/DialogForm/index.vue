<template>
  <el-dialog
    center
    ref="dialog"
    width="50%"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { IElDialog } from '@/types/element-plus';
import { PropType, ref } from 'vue';

const dialog = ref<IElDialog | null>(null)
const confirmLoading = ref(false)
const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve(),
  },
})

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}
// interface EmitsType {
//   (e: 'confirm'): void
// }
// const emit = defineEmits<EmitsType>()

const handleConfirm = async () => {
  confirmLoading.value = true
  // emit('confirm')
  await props.confirm()
  confirmLoading.value = false
}
</script>

<style lang='scss' scoped>
</style>
