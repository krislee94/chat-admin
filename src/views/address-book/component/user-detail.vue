<template>
  <div class="user-detail-style">
    <UserInfoVue />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useAddressStore, useSessionUserStore } from '@/stores'
import UserInfoVue from '@/views/customer/component/chat-user-info.vue'

const addressStore = useAddressStore()
const sessionUserStore = useSessionUserStore()

watch(
  () => addressStore.userId,
  (newValue, _) => {
    if (newValue) {
      sessionUserStore.queryUserInfo(addressStore.userId)
    }
  }
)
</script>

<style lang="scss" scoped>
.user-detail-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 5vw 10vw;
}
</style>
