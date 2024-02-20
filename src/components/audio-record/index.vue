<template>
  <div class="recorder-box">
    <div class="cursor-pointer">
      <icon-park
        type="voice"
        theme="outline"
        fill="#8b8b8b"
        size="19"
        @click="startRecord"
        v-if="recordRef && !recordRef.visible"
      />

      <icon-park
        type="voice"
        theme="outline"
        fill="#1977FD"
        size="19"
        v-if="recordRef && recordRef.visible"
      />
    </div>
    <Modal ref="recordRef" @confirm="getConfirmInfo" />
  </div>
</template>

<script lang="ts" setup>
import { noticeError, noticeSuccess } from '@xr-util/xr-ui'
import { ref } from 'vue'
import Modal from './component/modal.vue'
import { IconPark } from '@icon-park/vue-next/es/all'

const emit = defineEmits(['sendMedia'])

const recordRef = ref()
//开始录音
const startRecord = () => {
  recordRef.value.open()
}

//同时出发sendMedia方法
const getConfirmInfo = (res: any) => {
  emit('sendMedia', {
    key: res.key,
    type: res.type,
    fileUrl: res.url
  })
}
</script>

<style lang="scss" scoped></style>
