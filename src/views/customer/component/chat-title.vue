<!-- 标题头 -->
<template>
  <div class="chat-title">
    <span>{{ messageStore.senderName }}</span>

    <div>
      <!-- <div v-if="websocketStore.isConnected" style="margin-left: 0.5rem">
        <i class="iconfont online-icon">&#xe612;</i>
      </div> -->
      <div v-if="!websocketStore.isConnected" style="margin-left: 0.5rem">
        <i class="iconfont offline-icon">&#xe613;</i>
        <span style="font-size: 14px; margin-right: 6px">{{ $t('CHAT.error_net') }}</span>
        <el-button type="danger" size="small" @click="reconnect">{{
          $t('CHAT.reconnect')
        }}</el-button>
      </div>
    </div>

    <!-- 功能类的 -->
    <div class="chat-function j-row-center">
      <iconpark-icon name="translate" style="font-size: 20px"></iconpark-icon>
      <el-switch
        v-model="messageStore.translationSwitch"
        style="margin-right: 1rem"
        @change="translateChange"
      />

      <div style="margin-right: 1rem" class="j-center">
        <transferCustomer />
      </div>
      <el-popconfirm :title="$t('CHAT.sure_end_check')" @confirm="sureFinishSession">
        <template #reference>
          <i class="iconfont icon-menu end-session-button">&#xe605;</i>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore, useWebSocketStore, useChatListStore } from '@/stores'
import { finishedSession, translateSwitch } from '@/server/session_request'
//会话转接
import transferCustomer from './transfer-customer.vue'
import { getCurrentInstance } from 'vue'

const messageStore = useMessageStore()
const websocketStore = useWebSocketStore()
const chatListStore = useChatListStore()
//@ts-ignore
const { Bus } = getCurrentInstance()?.appContext.config.globalProperties

const reconnect = () => {
  websocketStore.connect()
  websocketStore.keepHeart()
  //重新拉取聊天记录
  messageStore.refreshMsgHistory()
}

/**
 * 是否确定结束会话
 */
const sureFinishSession = async () => {
  //确定
  await finishedSession({
    sessionId: messageStore.sessionId
  })
  //查询列表
  await chatListStore.init()
  //事件监听
  await Bus.emit('finish')
}

/**
 * 改变开关
 */
const translateChange = async (val: boolean) => {
  messageStore.setTranslation(val)
  chatListStore.setTranslation(messageStore.sessionId, val)
  //同时告诉后端，这里是否需要翻译
  await translateSwitch({
    sessionId: messageStore.sessionId,
    translationSwitch: val
  }).then((res) => {
    if (!res || res.code != '0') {
      messageStore.setTranslation(!val)
      chatListStore.setTranslation(messageStore.sessionId, !val)
    }
    messageStore.refreshMsgHistory()
  })
}
</script>

<style lang="scss" scoped>
.chat-title {
  width: 100%;

  min-height: 82px;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  //   background: linear-gradient(to right, var(--xr-color-primary), var(--xr-color-green));
  background-color: #fafbfc;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  span {
    font-size: 1.125rem;
    font-weight: 500;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    color: #434343;
    line-height: 26px;
  }

  .online-icon {
    color: rgba(50, 202, 100);
    font-size: 0.75rem;
  }
  .offline-icon {
    color: red;
    font-size: 0.75rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  .chat-function {
    .chat-function-span {
      color: #434343;
      font-size: 0.875rem;
      margin-right: 0.25rem;
    }
    .icon-menu {
      font-size: 1.75rem;
      cursor: pointer;
    }
  }
  .end-session-button {
    color: #ff6b6b;
  }
}
</style>
