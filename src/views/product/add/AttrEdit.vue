<template>
  <el-form label-position="top" label-width="50px">
    <el-form-item :label="item.value" v-for="item in props.modelValue" :key="item.value">
      <template #label>
        <el-icon>
          <Menu />
        </el-icon>
      </template>
      <div>
        <el-tag closable effect="dark">{{ item.value }}</el-tag>
      </div>
      <div>
        <el-tag v-for="detail in item.detail" :key="detail" closable effect="plain">{{ detail }}</el-tag>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">添加新规格</el-button>
      <el-button type="success" @click="handleGenerate">立即生成</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { generateAttr } from '@/api/product';
import { AttrRuleValue } from '@/api/types/product';
import { PropType } from 'vue';
import { Menu } from '@element-plus/icons';

const emit = defineEmits(['confirm'])

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => { },
  },
})

const handleGenerate = async () => {
  const data = await generateAttr(0, 1, {
    attrs: props.modelValue,
  })
  emit('confirm', data.info)
}
</script>

<style lang='scss' scoped>
</style>
