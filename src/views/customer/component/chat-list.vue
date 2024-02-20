<template>
  <div class="chat-list-all-box">
    <ChatListTitle @search="searchList" />
    <ChatListTabs @change="listCs" ref="chatTabs" />
    <!--中间聊天框的主题内容-->
    <el-scrollbar class="chat-list-box" @click="_cancel" style="height: 90vh">
      <!--聊天会话框 -->
      <div
        v-for="(item, index) in chatListStore.chatList"
        class="chat-item"
        :class="[color(item), borderStyle(item), toTopStyle(item)]"
        :key="item.sessionId"
        @click="clickChatBox(index, item as any)"
        :data-index="index"
        :data-session="item.sessionId"
        v-contextmenu:contextmenu
        v-show="chatListStore.chatList && chatListStore.chatList.length > 0"
      >
        <div class="context-id" v-show="false">{{ item.sessionId }}</div>
        <div class="context-index" v-show="false">{{ index }}</div>
        <el-badge
          :value="item?.unreadNum && item?.unreadNum > 0 ? item?.unreadNum : ''"
          :max="state.maxMessage"
        >
          <div class="chat-left">
            <img
              :src="item.userInfo?.headerImgUrl"
              class="default-header-img"
              v-img-error:headerImgUrl-user
            />
          </div>
        </el-badge>

        <div class="chat-right">
          <div class="chat-title">
            <span class="chat-right-title overhide">{{ item.userInfo?.nickName ?? 'unknow' }}</span>
            <el-tag effect="plain" class="eft-class" size="small" v-if="item.thirdApp">{{
              item.thirdApp
            }}</el-tag>
            <span style="font-size: 0.75rem; color: #bfbfbf">{{ formatTime_HHmm(item) }}</span>
          </div>
          <div class="text-div">
            <p class="text-ov">{{ formatLastMessage(item) }}</p>
            <p
              class="text-time"
              v-if="!lastTimeIfMySelf(item) && time_range_gt_5(item)"
              style="color: red"
            >
              {{ $t('CHAT.has_wait') }} {{ _formatTime(item) }}
            </p>
            <p
              class="text-time"
              v-if="!lastTimeIfMySelf(item) && time_range_1_5(item)"
              style="color: orange"
            >
              {{ $t('CHAT.has_wait') }}{{ _formatTime(item) }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="no-message-box"
        v-if="!chatListStore.chatList || chatListStore.chatList.length < 1"
      >
        <img src="@/assets/no-message.png" />

        <span v-t="'CHAT.no_message'"></span>
      </div>
      <!-- 右击功能键-->
      <v-contextmenu @show="doShow" ref="contextmenu">
        <v-contextmenu-item @click="_minuteHandle" style="cursor: pointer">{{
          state.messTitle
        }}</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item @click="_function1" style="cursor: pointer">{{
          state.toTop
        }}</v-contextmenu-item>
      </v-contextmenu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance, onUnmounted } from 'vue'
import { _ } from '@xr-util/util'
import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
import ChatListTitle from './chat-list-title.vue'
import { useChatListStore, useSessionUserStore, useMessageStore, useUserStore } from '@/stores'
import type { IGetSessionUserInfoParam, SessionListByCSResponse } from '@/server/session_request'
import { MsgType } from '@/server/session_request'

import { timeUtilNowMoment, timeUtilMoment, timeMinuteSecond } from '@/utils/timeUtil'
import ChatListTabs from './chat-list-tabs.vue'
import { ThirdApp } from '@/server/third_request'

const chatListStore = useChatListStore()
const sessionUserStore = useSessionUserStore()
const messageStore = useMessageStore()
const userStore = useUserStore()
//@ts-ignore
const { Bus, $t } = getCurrentInstance()?.appContext.config.globalProperties

let intervalTime: number | undefined = undefined

const chatTabs = ref()

const state = reactive({
  style: '',
  //改变背景白色
  count: '',
  maxMessage: 99,
  isShowRight: false,
  currentSessionId: '',
  //改变聊天边框
  borderCount: -1,
  contextMenuShow: false,
  messTitle: $t('CHAT.unread_message'),
  toTop: $t('CHAT.to_top'),
  currentTime: timeUtilNowMoment()
})
Bus.on('finish', () => {
  useMessageStore().switchMessage()
})

onMounted(async () => {
  await chatListStore.init().then((res) => {
    if (chatListStore.chatList && chatListStore.chatList.length > 0) {
      state.count = chatListStore.chatList[0]?.sessionId + '' ?? ''
    }
  })
  if (chatListStore.chatList && chatListStore.chatList.length > 0) {
    chatListStore.setCurrentSessionId(chatListStore.chatList[0].sessionId + '')
    clickChatBox(0, chatListStore.chatList[0] as any)
  }

  intervalTime = setInterval(() => {
    state.currentTime = timeUtilNowMoment()
  }, 1000 * 60)
})

const searchList = (value: string) => {
  let obj: any = {
    userNickName: value
  }

  if (chatTabs.value.activeName && chatTabs.value.activeName == 'zalo') {
    obj.thirdApp = ThirdApp.Zalo
  }
  chatListStore.searchSessionList(obj)
}

const listCs = (val: string) => {
  let obj: any = {}
  if (val && val == 'zalo') {
    obj.thirdApp = ThirdApp.Zalo
  }
  chatListStore.searchSessionList(obj)
}

//----------------------- 状态值 ------------------------------------

const contextmenu = ref()
const clickChatBox = async (
  index: number,
  item: { sessionId: any; translationSwitch: boolean; userInfo: { userId: any } }
) => {
  if (!item.sessionId) return
  console.log(item)
  //改变背景色
  state.count = item.sessionId
  //加载。
  messageStore.setParams({
    sessionId: item.sessionId,
    userId: item?.userInfo.userId,
    recordId: '',
    isNeedUpdate: true
  })
  messageStore.setTranslation(item.translationSwitch)
  //清空messageStore.data
  messageStore.clearData()
  //用户点击了头像（查询处理）
  _query(item)
  chatListStore.setCurrentSessionId(item.sessionId + '')
  //未读消息，已读。
  await chatListStore.sessionAllRead(item.sessionId + '')
}

const _query = (item: { sessionId: any; userInfo: { userId: any } }) => {
  //查看聊天信息内容
  const param: IGetSessionUserInfoParam = {
    sessionId: item.sessionId,
    userId: item.userInfo?.userId
  }
  //查询用户信息和标签
  sessionUserStore.init(param)
  //查询用户聊天消息内容
  messageStore.refreshMsgHistory()
}

const color = (item: any) => {
  if (state.count === item.sessionId) {
    return 'active'
  }
}

/**
 * 显示边框操作
 * @param index
 */
const borderStyle = (item: any) => {
  if (state.borderCount == item.sessionId) {
    return 'border-style'
  }
}

const toTopStyle = (item: any) => {
  if (item?.topPlace) {
    return 'top-place'
  }
  return ''
}
const doShow = (e: any) => {
  if (e) {
    const currentIndex = e.getAttribute('data-index')
    const currentSession = e.getAttribute('data-session')
    if (currentSession && chatListStore.chatList) {
      chatListStore.chatList.forEach((item) => {
        if (item && item.sessionId == currentSession) {
          // isExected = true
          if (item.unreadNum && item.unreadNum > 0) {
            state.messTitle = $t('xr_message_read')
          } else {
            state.messTitle = $t('CHAT.unread_message')
          }

          if (item && item?.topPlace) {
            state.toTop = $t('xr_cancel_top')
          } else if (item && !item.topPlace) {
            state.toTop = $t('CHAT.to_top')
          }
        }
      })
    }

    if (!_.isEmpty(currentIndex)) {
      state.borderCount = currentSession
      console.log(state.borderCount)
    }
    if (!_.isEmpty(currentSession)) {
      state.currentSessionId = currentSession
    }
  }
}

/**
 * 添加到待处理
 */
const _minuteHandle = async () => {
  if (state.messTitle.indexOf($t('CHAT.unread_message')) > -1) {
    if (state.borderCount) {
      chatListStore.setUnReadItem(state.borderCount + '')
    }
  } else if (state.messTitle.indexOf($t('xr_message_read')) > -1) {
    if (state.borderCount) {
      await chatListStore.sessionAllRead(state.borderCount + '')
    }
  }
}
/**
 * 置顶和取消置顶
 */
const _function1 = (): void => {
  if (state.borderCount && state?.toTop == $t('CHAT.to_top')) {
    chatListStore.sessionToTop(state.borderCount + '')
  } else if (state.borderCount && state.toTop.indexOf($t('xr_cancel_top')) > -1) {
    chatListStore.sessionToBottom(state.borderCount + '')
  }
}

const _cancel = () => {
  state.borderCount = -1
}
const time_range_1_5 = (item: any): boolean => {
  let time = moment(state.currentTime).valueOf() - getTime(item)
  return time >= 60 * 1000 && time <= 5 * 60 * 1000
}
const time_range_gt_5 = (item: any): boolean => {
  let time = moment(state.currentTime).valueOf() - getTime(item)
  return time > 5 * 60 * 1000
}
const _formatTime = (item: any) => {
  return moment(getTime(item)).fromNow(true)
}

const formatTime_HHmm = (item: any) => {
  return timeMinuteSecond(getTime(item))
}

const getTime = (item: any): any => {
  if (item.lastMsg?.sendTime) {
    return moment(item.lastMsg?.sendTime).valueOf()
  } else if (item.createTime) {
    return timeUtilMoment(item.createTime).valueOf()
  }
  return ''
}

const lastTimeIfMySelf = (item: any) => {
  return item.lastMsg?.senderInfo?.id === userStore.id
}

//format LAST MESSAGE
const formatLastMessage = (item: SessionListByCSResponse) => {
  if (item && item.lastMsg) {
    let title = ''

    if (item.lastMsg && item.lastMsg.withDraw) {
      title = $t('t_withdraw')
      return title
    }

    if (item.lastMsg.msgType == MsgType.Tip || item.lastMsg.msgType == MsgType.Text) {
      return item.lastMsg?.body
    }

    if (item.lastMsg.msgType == MsgType.RichText) {
      return removeTags(item.lastMsg.body)
    }

    if (item.lastMsg.msgType == MsgType.Audio) {
      title = $t('t_audio')
    } else if (item.lastMsg.msgType == MsgType.Video) {
      title = $t('t_video')
    } else if (item.lastMsg.msgType == MsgType.Image) {
      title = $t('t_img')
    } else if (item.lastMsg.msgType == MsgType.File) {
      title = $t('t_file')
    } else if (item.lastMsg.msgType == MsgType.Voice) {
      title = $t('t_voice')
    }

    return `[${title}]`
  }
}

const removeTags = (value?: string) => {
  if (!value) return ''
  const imgPattern = /<img.*?>/g
  const audioPattern = /<audio.*?>/g
  const videoPattern = /<video.*?>/g
  const ptagPattern = /<p.*?>/g
  const xpPattern = /<\/p.*?>/g
  // const voicePattern

  let result = value
    .replace(ptagPattern, '')
    .replace(xpPattern, '')
    .replace(imgPattern, `[${$t('t_img')}]`)
    .replace(audioPattern, `[${$t('t_audio')}]`)
    .replace(videoPattern, `[${$t('t_video')}]`)

  //清空所有htmltag
  return removeHtmlTags(result)
}

function removeHtmlTags(value: string) {
  return value.replace(/<[^>]+>/g, '')
}

onUnmounted(() => {
  intervalTime && clearInterval(intervalTime)
})
</script>

<style lang="scss" scoped>
.chat-list-all-box {
  background: #fff;
  width: 19vw;
  min-width: 241px;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.08);
  height: 99vh;
  .chat-list-box {
    width: 100%;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;

    .chat-item {
      width: 100%;
      height: 4.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 6px;
      margin-top: 1px;
      position: relative;

      .chat-left {
        width: 3vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .chat-item-img {
        width: 1.875rem;
        height: 1.875rem;
      }

      .chat-right {
        width: 13.5vw;
        margin-left: 1vw;
        padding-right: 0.3125rem;
        .chat-title {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .chat-right-title {
          font-weight: 500;
          color: black;
          width: 8.5vw;
        }
      }
    }

    .chat-item:hover {
      background-color: #f0f0f0;
    }
  }

  .no-message-box {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.08);
    img {
      width: 3.1875rem;
      height: 2.6875rem;
    }

    span {
      margin-top: 1rem;
      font-size: 0.875rem;

      color: #bfbfbf;
    }
  }
  .active {
    background: #e6f0ff;
  }
  .text-div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .text-ov {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.75rem;
      color: #bfbfbf;
      max-width: 15rem;
    }
    .text-time {
      font-size: 0.75rem;
      min-width: 4.5rem;
      text-align: right;
    }
  }

  .border-style {
    border: 1px solid var(--xr-main-color) !important;
    border-radius: var(--xr-min-border-radius) !important;
    // background: linear-gradient(to right, #ffffff 0%, #f9f9f9 10%, #f2f2f2 25%, #fafafa 50%);
  }
}

.top-place {
  background-color: #fafafa;
}

.eft-class {
  position: absolute;
  right: 2.8125rem;
}
</style>
