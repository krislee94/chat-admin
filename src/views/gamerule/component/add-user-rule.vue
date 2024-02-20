<template>
  <el-dialog title="添加指定匹配" v-model="visible" width="30%" @close="cancel">
    <el-form v-model="form" label-width="90px">
      <el-form-item label="用户ID">
        <el-input v-model="form.userId" />
      </el-form-item>
      <el-form-item label="坐席短号">
        <el-input v-model="form.employeeShortId" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const visible = ref(false)

const form = reactive({
  employeeShortId: '',
  userId: ''
})
watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)

const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  emit('confirm', form)
}
</script>

<style lang="scss" scoped></style>
