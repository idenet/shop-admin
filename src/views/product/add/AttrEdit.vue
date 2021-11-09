<template>
  <el-form label-position="top" label-width="50px">
    <app-draggable v-model="props.modelValue" :options="{
      handle: '.el-icon-menu'
    }">
      <el-form-item :label="item.value" v-for="(item, index) in data" :key="item.value">
        <template #label>
          <el-icon class="el-icon-menu">
            <Menu />
          </el-icon>
        </template>
        <div>
          <el-tag closable effect="dark" @close="data?.splice(index, 1)">{{ item.value }}</el-tag>
        </div>
        <div>
          <app-draggable v-model="item.detail" style="display: inline-block">
            <el-tag
              v-for="(detail , detailIndex) in item.detail"
              :key="detail"
              closable
              effect="plain"
              @close="item.detail.splice(detailIndex, 1)"
            >{{ detail }}</el-tag>
          </app-draggable>
          <el-input
            class="input-new-tag"
            v-if="item.inputVisible"
            v-model="item.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.prevent="handleInputConfirm(item)"
            @blur.prevent="handleInputConfirm(item)"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput(item)">+ New Tag</el-button>
        </div>
      </el-form-item>
    </app-draggable>
    <el-form-item v-if="!isAdd">
      <el-button type="primary" @click="isAdd = true">添加新规格</el-button>
      <el-button type="success" @click="handleGenerate">立即生成</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-form :model="attrForm" :rules="formRules" ref="form" inline>
        <el-form-item label="规格名称" prop="value">
          <el-input v-model="attrForm.value" />
        </el-form-item>
        <el-form-item label="规格值" prop="detail">
          <el-input v-model="attrForm.detail[0]" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddAttr">确认</el-button>
          <el-button @click="isAdd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { generateAttr } from '@/api/product';
import { AttrRuleValue } from '@/api/types/product';
import { PropType, ref, watch, nextTick } from 'vue';
import { Menu } from '@element-plus/icons';
import { IElForm } from '@/types/element-plus';

const emit = defineEmits(['confirm', 'update:model-value'])

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => { },
  },
})
interface AttValue extends AttrRuleValue {
  inputVisible: boolean
  inputValue: string
}

const data = ref<AttValue[]>()

const saveTagInput = ref<HTMLInputElement | null>(null)


watch(() => props.modelValue, value => {
  const temp = JSON.parse(JSON.stringify(value)) as AttValue[]
  data.value = temp.map(item => ({ ...item, inputVisible: false, inputValue: '' }))
}, {
  deep: true,
  immediate: true,
})

watch(data, value => {
  emit('update:model-value', value)
}, {
  deep: true,
})

const attrForm = ref({
  value: '',
  detail: [''],
})

const isAdd = ref(false)

const formRules = {
  value: [
    { required: true, message: '请输入规则名称', trigger: 'change' },
  ],
  detail: [
    { required: true, message: '请输入规则值', trigger: 'change' },
  ],
}

const form = ref<IElForm | null>(null)

const handleGenerate = async () => {
  const data = await generateAttr(0, 1, {
    attrs: props.modelValue,
  })
  emit('confirm', data.info)
}

const handleInputConfirm = (item: AttValue) => {
  if (item.inputValue.length) {
    item.detail.push(item.inputValue)
  }
  item.inputVisible = false
  item.inputValue = ''
}

const showInput = async (item: AttValue) => {
  item.inputVisible = true
  await nextTick()
  saveTagInput.value?.focus()
}

const handleAddAttr = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  props.modelValue.push({
    value: attrForm.value.value,
    detail: attrForm.value.detail,
    inputVisible: false,
    inputValue: '',
  })
  isAdd.value = false
  form.value?.resetFields()
}
</script>

<style lang='scss' scoped>
.el-icon-menu {
  font-size: 20px;
  cursor: move;
}
.detail-item {
  margin-right: 10px;
}

.el-form-item {
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
