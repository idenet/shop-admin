<template>
  <div id="editor" />
</template>

<script lang='ts' setup>

import { onMounted, ref, watch } from 'vue'
import E from 'wangeditor'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})


interface EmitsType {
  (e: 'update:model-value', value: string): void
}

const emit = defineEmits<EmitsType>()

const editor = ref<InstanceType<typeof E> | null>(null)

const unwatchModelValue = watch(() => props.modelValue, () => {
  editor.value?.txt.html(props.modelValue) // 必须在create之后
  unwatchModelValue()
})

onMounted(() => {
  initEditor()
})

const initEditor = () => {
  editor.value = new E('#editor')
  // 配置 onchange 回调函数
  editor.value.config.onchange = function (newHtml: string) {
    emit('update:model-value', newHtml)
  }

  editor.value.create()
  // editor.value.txt.html(props.modelValue) // 必须在create之后
}

</script>

<style lang='scss' scoped>
</style>
