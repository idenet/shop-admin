<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    background
    :total="listCount"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[2, 3, 4]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  ></el-pagination>
</template>

<script lang='ts' setup>

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  listCount: {
    type: Number,
    default: 0,
  },
  loadList: {
    type: Function,
    default: () => { },
  },
})

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', size: number): void
}
const emit = defineEmits<EmitsType>()

const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}

const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}
</script>

<style lang='scss' scoped>
</style>
