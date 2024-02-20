<template>
  <div class="right-chat-box">
    <el-tabs
      v-model="state.activeIndex"
      @tab-click="handleClick"
      class="tabs-cow"
      style="--el-tabs-header-height: 82px"
    >
      <el-tab-pane :label="$t('CHAT.user_info')" name="1"><ChatUserInfo /></el-tab-pane>
      <el-tab-pane :label="$t('CHAT.fast_reply')" name="2"
        ><FastReply :is-in-chat="true"
      /></el-tab-pane>
      <el-tab-pane :label="$t('t_message_search')" name="3"><MessageSearch /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import ChatUserInfo from './chat-user-info.vue'
import type { TabsPaneContext } from 'element-plus'
import customerFast from './customer-fast.vue'
import MessageSearch from '@/views/customer/component/message-search.vue'
import FastReply from '@/views/setting/component/fast-reply.vue'

const state = reactive({
  activeIndex: '1'
})

/**
 * 用户选择
 *
 * @param index
 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.right-chat-box {
  width: 27vw;
  height: 100%;
  min-width: 388.8px;
  background-color: #fff;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.08);
}
:deep(.el-tabs__nav-scroll) {
  padding-left: 1rem;
}
</style>
