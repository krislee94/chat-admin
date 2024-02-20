<template>
  <div class="message-chat-box">
    <ChatList />
    <ChatMessage
      v-if="chatListStore.chatList && chatListStore.chatList.length > 0 && messageStore.sessionId"
    />
    <!-- <RightBox /> -->
    <right-chat
      v-if="chatListStore.chatList && chatListStore.chatList.length > 0 && messageStore.sessionId"
    />

    <div
      class="no-chat"
      v-if="!chatListStore.chatList || chatListStore.chatList.length < 1 || !messageStore.sessionId"
    >
      <img src="@/assets/empty-chat-v1.png" />

      <span class="span-1">{{ $t('CHAT.no_chat') }}</span>
      <span class="span-2"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatList from './chat-list.vue'
import ChatMessage from './chat-message.vue'
import RightChat from './right-chat.vue'
import { useChatListStore, useMessageStore } from '@/stores'

const chatListStore = useChatListStore()
const messageStore = useMessageStore()
</script>

<style lang="scss" scoped>
.message-chat-box {
  // width: ;
  width: 100%;
  height: 100%;
  border-top-right-radius: var(--main-border-radius);
  border-bottom-right-radius: var(--main-border-radius);
  display: flex;
  flex-direction: row;
  background-color: #fafbfc;
  position: relative;

  .no-chat {
    width: 90vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fafbfc;

    img {
      width: 8.5rem;
      height: 7.56rem;
    }
    .span-1 {
      color: #434343;
      font-size: 0.875rem;
      margin-top: 1.0625rem;
      margin-right: 1rem;
    }
    .span-2 {
      color: #bfbfbf;
      font-size: 0.875rem;
      margin-top: 0.625rem;
    }
  }
}
</style>
