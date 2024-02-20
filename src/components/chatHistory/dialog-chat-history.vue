<template>
  <el-dialog v-model="visible" width="58%" center destroy-on-close>
    <ChatHistory
      :record-id="recordId"
      :session-id="sessionId"
      :sensitive-type="sensitiveType"
      v-if="sessionId"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatHistory from '@/components/chatHistory/chat-history.vue'

const visible = ref(false)

const recordId = ref()
const sessionId = ref()
const sensitiveType = ref(false)

interface IChatHistoryParam {
  recordId?: string
  sessionId?: string
  sensitiveType?: boolean
}
const open = (item?: IChatHistoryParam) => {
  if (item && item.recordId) {
    recordId.value = item.recordId
  } else {
    recordId.value = ''
  }

  if (item && item.sensitiveType) {
    sensitiveType.value = item.sensitiveType
  } else {
    sensitiveType.value = false
  }

  if (item && item.sessionId) {
    sessionId.value = item.sessionId
  } else {
    sessionId.value = ''
  }

  //打开dialog
  visible.value = true
}

defineExpose({ open })
</script>

<style scoped lang="scss"></style>
