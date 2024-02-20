<template>
  <div class="chat-message">
    <ChatTitle />
    <AlertSure />
    <div class="chat-scroll" ref="chatListId" :style="richStore.scrollHeight">
      <div class="no-more-box">
        <span v-if="!messageStore.isNeedUpdate">{{ $t('CHAT.no_more') }}</span>
        <span
          v-if="messageStore.isNeedUpdate"
          @click="() => messageStore.appendMsgHistory()"
          style="cursor: pointer"
          >{{ $t('CHAT.click_more') }}</span
        >
      </div>
      <div v-for="item in messageStore.data" :key="item.id">
        <div>
          <div style="height: 1rem"></div>
          <!--发送者-->
          <div class="sender-box" v-if="item.userType === UserType.User">
            <div
              class="sender-box2 customer-box"
              @mouseover="onMouseOver(item.id)"
              @mouseleave="onMouseLeave(item.id)"
            >
              <img
                :src="messageStore.senderImg"
                class="default-header-img"
                v-img-error:headerImgUrl-employee
              />
              <div class="sender-text">
                <LeftPop
                  :text="item.content"
                  :show-type="item.messageType"
                  :translationText="item.translationText"
                  :withdraw="item?.withdraw ?? false"
                  :single-trans="item?.singleTrans ?? ''"
                />
              </div>

              <div v-if="itemShow(item.id) && !item.withdraw" class="flex row icon-func-style-left">
                <!-- 翻译 -->
                <div
                  class="flex alignCenter justifyCenter border-light box-style"
                  v-if="item.messageType == 'TEXT' || item.messageType == 'RICH_TEXT'"
                >
                  <icon-park
                    type="translation"
                    theme="outline"
                    size="15"
                    fill="#000"
                    @mouseover="onTranslateMouseover"
                    v-if="translateFlag"
                  ></icon-park>
                  <icon-park
                    type="translation"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    @mouseleave="onTranslateMouseleave"
                    v-if="!translateFlag"
                    @click="translateMes(item)"
                  ></icon-park>
                </div>
                <!-- 转发 -->
                <div class="flex alignCenter justifyCenter border-light box-style">
                  <icon-park
                    type="share"
                    theme="outline"
                    size="15"
                    fill="#000"
                    v-show="!shareFlag"
                    @mouseover="onShareIconOver"
                  />
                  <icon-park
                    type="share"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    v-show="shareFlag"
                    @click="showShareBtn(item)"
                    @mouseleave="onShareIconLeave"
                  />
                </div>
                <!-- 复制 -->
                <div class="flex alignCenter justifyCenter border-light box-style">
                  <icon-park
                    type="copy"
                    theme="outline"
                    size="15"
                    fill="#000"
                    v-show="!copyFlag"
                    @mouseover="copyFlag = true"
                  />
                  <icon-park
                    type="copy"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    @mouseleave="copyFlag = false"
                    v-show="copyFlag"
                    @click="copyContent(item)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div style="height: 1rem"></div>
          <!--接受者 -->
          <div class="geter-box" v-if="item.userType === UserType.CustomerService">
            <div
              class="geter-box2 customer-box"
              @mouseover="onMouseOver(item.id)"
              @mouseleave="onMouseLeave(item.id)"
            >
              <div v-if="itemShow(item.id) && !item.withdraw" class="flex row icon-func-style">
                <!-- 撤回 -->
                <div class="flex alignCenter justifyCenter border-light box-style">
                  <icon-park
                    type="undo"
                    theme="outline"
                    size="15"
                    fill="#000"
                    @mouseover="onIconMouseover"
                    v-show="showUndo"
                  ></icon-park>
                  <icon-park
                    type="undo"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    @mouseleave="onIconUndoMouseleave"
                    v-show="!showUndo"
                    @click="undoRecordId(item)"
                  ></icon-park>
                </div>
                <!-- 翻译 -->
                <div
                  class="flex alignCenter justifyCenter border-light box-style"
                  v-if="item.messageType == 'TEXT' || item.messageType == 'RICH_TEXT'"
                >
                  <icon-park
                    type="translation"
                    theme="outline"
                    size="15"
                    fill="#000"
                    @mouseover="onTranslateMouseover"
                    v-show="translateFlag"
                  ></icon-park>
                  <icon-park
                    type="translation"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    @mouseleave="onTranslateMouseleave"
                    v-show="!translateFlag"
                    @click="translateMes(item)"
                  ></icon-park>
                </div>
                <!-- 转发-->
                <div class="flex alignCenter justifyCenter border-light box-style">
                  <icon-park
                    type="share"
                    theme="outline"
                    size="15"
                    fill="#000"
                    v-show="!shareFlag"
                    @mouseover="onShareIconOver"
                  />
                  <icon-park
                    type="share"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    v-show="shareFlag"
                    @click="showShareBtn(item)"
                    @mouseleave="onShareIconLeave"
                  />
                </div>
                <div class="flex alignCenter justifyCenter border-light box-style">
                  <icon-park
                    type="copy"
                    theme="outline"
                    size="15"
                    fill="#000"
                    v-show="!copyFlag"
                    @mouseover="copyFlag = true"
                  />
                  <icon-park
                    type="copy"
                    theme="outline"
                    size="15"
                    fill="#1977FD"
                    @mouseleave="copyFlag = false"
                    v-show="copyFlag"
                    @click="copyContent(item)"
                  />
                </div>
              </div>
              <RightPop
                :text="item.content"
                :show-type="item.messageType"
                :withdraw="item?.withdraw ?? false"
                :record="item?.recordFileKeys ?? []"
                :single-trans="item?.singleTrans ?? ''"
              />
            </div>
            <img
              :src="userStore.headerImgUrl"
              class="default-header-img"
              v-img-error:headerImgUrl-user
            />
          </div>

          <!-- 系统消息-->
          <div class="system-info-box" v-if="item.userType === UserType.System">
            <span style="border-radius: 2rem; padding: 0 1rem">{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>

    <ChatInput />

    <TransferMessage ref="transMessage" :record-id="recordId" :message-type="msgType" />
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore, useUserStore, useRichStore } from '@/stores'
import ChatTitle from './chat-title.vue'
import RightPop from '@/components/chat-pop/right-pop.vue'
import LeftPop from '@/components/chat-pop/left-pop.vue'
import ChatInput from './chat-input.vue'
import { UserType, translateOne } from '@/server/session_request'
import { ref, onUpdated, watch } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { widthDrawMessage, IMessageUserWithdrawRequest } from '@/server/message_request'
import AlertSure from '@/components/alert/index.vue'

import TransferMessage from './tansfer-message.vue'
import { messageSuccess } from '@xr-util/xr-ui'
import { Base64 } from 'js-base64'

const chatListId = ref()
const messageStore = useMessageStore()
const userStore = useUserStore()
const richStore = useRichStore()

const transMessage = ref()

const showUndo = ref(true)
const translateFlag = ref(true)
const shareFlag = ref(false)
const copyFlag = ref(false)
const recordId = ref('')
const msgType = ref('')

//这里使用ref代理更新，会导致onUpdated重复触发,修改onUpdated触发条件
// let currentId = '-1'
const currentId = ref('-1')
let scrollMessageHeight = chatListId.value?.scrollHeight

onUpdated(() => {
  let scrollHeight = chatListId.value?.scrollHeight
  console.log(scrollHeight, scrollMessageHeight)
  if (scrollMessageHeight == scrollHeight) {
    return
  } else {
    if (scrollHeight && scrollMessageHeight != scrollHeight) {
      scrollMessageHeight = scrollHeight
      chatListId.value.scrollTop = scrollHeight
    }
  }
})

//这里不走scroll监听了，有可能有问题，接口回馈速度比较慢。
// const handleScroll = () => {
//   console.log(chatListId.value.scrollTop)
//   if (chatListId.value?.scrollTop && chatListId.value?.scrollTop < 10) {
//     console.log('11111')
//     messageStore.queryCsHistory()
//   }
// }

const itemShow = (id: string) => {
  if (currentId.value == id) {
    return true
  }
  return false
}

//鼠标移动过去
const onMouseOver = (id: string) => {
  console.log(id)
  currentId.value = id
}
const onMouseLeave = (id: string) => {
  currentId.value = '-1'
}

const onIconMouseover = () => {
  showUndo.value = false
}
const onIconUndoMouseleave = () => {
  showUndo.value = true
}
//消息撤回
const undoRecordId = (item: any) => {
  //Proxy(Object) {id: '1660826470416465922', recordId: '1660826470416465922', userType: 'CUSTOMER_SERVICE', messageType: 'TEXT', content: '1', …}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false

  const param: IMessageUserWithdrawRequest = {
    recordId: item.id
  }

  widthDrawMessage(param)
}

const onTranslateMouseover = () => {
  translateFlag.value = false
}
const onTranslateMouseleave = () => {
  translateFlag.value = true
}
const translateMes = (item: any) => {
  console.log('翻译', item)
  if (!item.content) {
    return
  }
  let message = item.content
  if (item.messageType && item.messageType == 'RICH_TEXT') {
    message = Base64.encode(item.content)
  }
  //翻译
  translateOne({
    msg: message,
    msgType: item.messageType
  }).then((res) => {
    if (res.data) {
      messageStore.data = messageStore.data.map((i: any) => {
        if (i.id == item.id) {
          i.singleTrans = res.data
        }
        return i
      })
    }
  })
}

const onShareIconOver = () => {
  shareFlag.value = true
}
const onShareIconLeave = () => {
  shareFlag.value = false
}
const showShareBtn = (item: any) => {
  recordId.value = item.id
  msgType.value = item.messageType
  transMessage.value.open()
}
//复制功能
const copyContent = (item: any) => {
  if (!item.content) return
  navigator.clipboard
    .writeText(item.content)
    .then(() => messageSuccess('successfully copied to clipboard'))
    .catch((err) => console.error('Error in copying text: ', err))
}
</script>

<style lang="scss" scoped>
.chat-message {
  width: 50vw;
  height: 100%;
  background: #fafbfc;
  overflow: auto;

  .geter-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    // align-items: center;
    .geter-box2 {
      width: 60%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    img {
      margin-top: 4px;
    }
  }

  .sender-box2 {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .customer-box {
    cursor: pointer;
  }

  .sender-box {
    widows: 100%;
    display: flex;
    flex-direction: row;
    // align-items: center;
    .sender-text {
      max-width: 60%;
    }
    img {
      margin-top: 4px;
    }
  }
  .chat-scroll {
    padding: 1rem 0.7rem 1rem 1rem;
    overflow-y: scroll;
  }
  /* 滚动条样式 */
  .chat-scroll::-webkit-scrollbar {
    width: 0.3rem; /* 滚动条宽度 */
  }

  .chat-scroll::-webkit-scrollbar-track {
    background-color: var(--vt-c-white); /* 滚动条轨道背景色 */
  }

  .chat-scroll::-webkit-scrollbar-thumb {
    background-color: #ccc; /* 滚动条颜色 */
    border-radius: 3px; /* 滚动条圆角 */
  }

  .chat-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #999; /* 滚动条悬停颜色 */
  }

  .system-info-box {
    width: 100%;
    min-height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 0.75rem;
      color: #8c8c8c;
      line-height: 1.375rem;
      background-color: #f5f5f5;
    }
  }

  .no-more-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #d9d9d9;
    }
  }
  .icon-func-style {
    margin-right: 0.5rem;
    //min-width: 3rem;
  }
  .icon-func-style-left {
    margin-left: 0.5rem;
  }
  .box-style {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 4px;
  }
  .box-item {
    width: 100px;
  }
}
</style>
