<template>
  <div class="customer-box">
    <!-- 客服聊天盒子 -->
    <div class="chat-box">
      <MessageChat />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MessageChat from './component/message-chat.vue'
import { useWebSocketStore } from '@/stores'

const webSocketStore = useWebSocketStore()

webSocketStore.connect()
webSocketStore.keepHeart()
</script>

<style lang="scss" scoped>
.customer-box {
  width: 96vw;
  height: 100vh;
  background-color: #f5f5f5;

  .chat-box {
    width: 100%;
    height: 100%;
    // padding: var(--home-menu-padding-top);
    display: flex;
    flex-direction: row;
  }
}
</style>
