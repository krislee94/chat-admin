<template>
  <div class="add-dialog-box">
    <el-dialog
      title="新增快捷回复"
      v-model="props.dialogFormVisible"
      center
      width="30%"
      @close="close"
    >
      <el-input v-model="input" placeholder="请输入快捷回复内容" clearable />
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
import { ref } from 'vue'

const input = ref('')

const props = defineProps({
  dialogFormVisible: {
    type: Boolean
  }
})
const emit = defineEmits(['close', 'submit'])

//关闭监听
const close = () => {
  emit('close')
  input.value = ''
}
//用户点击提交
const submit = () => {
  emit('submit', input.value)
}
</script>

<style lang="scss" scoped></style>
