<template>
  <div class="flex cursor-pointer row" style="margin-top: 1rem; justify-content: flex-end">
    <div class="cursor-pointer left-btn" @click="cancel">
      <icon-park type="close" theme="outline" fill="red" />
    </div>

    <div class="cursor-pointer right-btn" @click="sureConfirm">
      <icon-park type="check" theme="outline" fill="#fff" size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'

const emit = defineEmits(['cancel', 'confirm'])

const cancel = () => {
  emit('cancel')
}
const sureConfirm = () => {
  emit('confirm')
}
</script>

<style scoped lang="scss"></style>
