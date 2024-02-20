<template>
  <div class="show-dialog">
    <el-dialog :title="props.title" v-model="props.show" @close="close">
      <el-input
        v-model="input"
        :placeholder="props.replyItem.content ? props.replyItem.content : ''"
        clearable
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="info" @click="close"> 取消 </el-button>
          <el-button type="primary" @click="submit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'

interface IReplyParam {
  content: string
}
const input = ref('')

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  show: {
    type: Boolean,
    required: true,
    default: false
  },
  placeholder: {
    required: false,
    default: '请输入'
  },
  replyItem: {
    type: true,
    required: false
  }
})
const emit = defineEmits(['close', 'submit'])
const close = () => {
  emit('close')
  input.value = ''
}
const submit = () => {
  emit('submit', input.value)
  nextTick(() => {
    input.value = ''
  })
}
</script>

<style lang="scss" scoped></style>
