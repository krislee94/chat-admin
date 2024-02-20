<template>
  <div class="chat-modal">
    <el-dialog v-model="visible" :title="$t('CHECKMODULE.session_record')" @close="cancel">
      <el-divider>{{ _formatTime() }}</el-divider>
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="(item, index) in state.messageData" class="message-item">
          <div v-if="index > 0" class="split-line"></div>
          <div class="j-row-center" style="width: 100%; min-height: 2.8125rem">
            <img
              :src="item.senderInfo?.headerImgUrl"
              class="default-header-img"
              v-if="item.senderInfo?.userType === SendUserType.CustomerService"
              v-img-error:headerImgUrl-employee
            />

            <img
              :src="item.senderInfo?.headerImgUrl"
              class="default-header-img"
              v-if="item.senderInfo?.userType === SendUserType.User"
              v-img-error:headerImgUrl-user
            />

            <div
              style="margin-left: 1rem; width: 100%"
              v-if="item.senderInfo?.userType !== SendUserType.System"
              class="j-row-center j-row-between"
            >
              <div class="j-column">
                <span class="user-name-style">{{ item.senderInfo?.name }} </span>
                <div>
                  <ChatModalType :chat-info="item" />
                  <div v-if="item.containSensitiveKeyword" class="j-row-center">
                    <i class="iconfont" style="color: #d81e06; font-size: 1rem">&#xe613;</i>
                    <span>{{ $t('BUSINESS.illegal_content') }}</span
                    ><span style="color: rgba(13, 110, 253, 1)">{{ item.sensitiveKeyword }}</span
                    ><span>{{ $t('BUSINESS.block') }}</span>
                  </div>
                  <!-- 消息时间 -->
                </div>
              </div>
              <p style="font-size: 12px; color: #bfbfbf">{{ _formatTimeV2(item.sendTime) }}</p>
            </div>

            <!-- 系统消息-->
            <div class="j-row system-box" v-if="item.senderInfo?.userType === SendUserType.System">
              <span>{{ item.body }}</span>
            </div>
          </div>
        </li>
      </ul>
      <el-divider @click="_queryMessage" v-if="!noMore" style="cursor: pointer">{{
        $t('CHECKMODULE.click_more')
      }}</el-divider>
      <el-divider v-if="noMore">{{ $t('CHECKMODULE.no_more') }}</el-divider>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import {
  queryHistoryRecord,
  ISessionChatRecordRequest,
  SessionChatRecordResponse,
  SendUserType
} from '@/server/check_request'
import { moment } from '@xr-util/util'
import ChatModalType from './chat-modal-type.vue'
import { timeUtilMoment } from '@/utils/timeUtil'

const props = defineProps({
  sessionId: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: '会话记录'
  }
})
const visible = ref(false)
const size = ref(20)
const noMore = ref(false)

interface IStateParam {
  messageData: SessionChatRecordResponse[]
  messageLength: number
}
const state: IStateParam = reactive({
  messageData: [],
  messageLength: 0
})
watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)
watch(
  () => props.sessionId,
  (newValue, _) => {
    console.log(newValue, _)
    if (newValue) {
      _query()
    }
  }
)
const emit = defineEmits(['cancel', 'confirm'])
const _query = async () => {
  if (!props.sessionId) return
  const param: ISessionChatRecordRequest = {
    sessionId: props.sessionId,
    size: size.value
  }
  await queryHistoryRecord(param).then((res) => {
    if (res && res.code == '0') {
      if (res.data?.length == 0) {
        noMore.value = true
      }
      state.messageData = res?.data ?? []
      state.messageLength = res?.data?.length ?? 0

      console.log(state.messageData)
    }
  })
}
_query()
const _queryMessage = async () => {
  const len = state.messageLength
  size.value = size.value + 20
  await _query()
  if (state.messageLength > len) {
    noMore.value = false
  } else {
    noMore.value = true
  }
}
const _formatTime = (): string => {
  if (state.messageData && state.messageData[0]) {
    return moment(state.messageData[0].createTime).format('YYYY-MM-DD')
  }

  return ''
}
const cancel = () => {
  emit('cancel')
  state.messageData = []
  state.messageLength = 0
  noMore.value = false
}

const _formatTimeV2 = (value: string | undefined) => {
  if (!value) return ''

  if (value) {
    return timeUtilMoment(value).format('HH:mm:ss')
  }
}
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
/* 滚动条样式 */
.infinite-list::-webkit-scrollbar {
  width: 0.3rem; /* 滚动条宽度 */
}

.infinite-list::-webkit-scrollbar-track {
  background-color: var(--vt-c-white); /* 滚动条轨道背景色 */
}

.infinite-list::-webkit-scrollbar-thumb {
  background-color: #ccc; /* 滚动条颜色 */
  border-radius: 3px; /* 滚动条圆角 */
}

.infinite-list::-webkit-scrollbar-thumb:hover {
  background-color: #999; /* 滚动条悬停颜色 */
}
.message-item {
  padding: 0 2rem 2rem 2rem;
  .split-line {
    height: 1px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 2rem;
  }
  .user-name-style {
    font-size: 0.875rem;
    color: #bfbfbf;
  }
  .message-body {
    overflow-wrap: anywhere;
    max-width: 35vw;
  }
}
.system-box {
  background-color: #f5f5f5;
  padding: 0 1rem;
  border-radius: 1rem;
  border: solid 0.01rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  font-size: 0.75rem;
}
</style>
