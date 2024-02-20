<template>
  <el-dialog :title="$t('t_reply_set_title')">
    <span v-t="'t_reply_set_timeout_span'"></span>

    <div>
      <span></span>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const open = () => {
  visible.value = true
}
//抛出API方法
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
