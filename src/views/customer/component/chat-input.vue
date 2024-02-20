<template>
  <div
    class="chat-input-box"
    :style="richStore.inputHeight"
    @drop="dropHandler"
    @dragover="handleDragOver"
    dropzone="copy"
  >
    <!-- 功能按键 -->
    <div class="chat-function">
      <div class="icon-function">
        <Recorder style="margin-right: 1rem; margin-top: 5px" @send-media="sendMedia" />
        <icon-park
          type="text-style-one"
          theme="outline"
          size="20"
          fill="#8b8b8b"
          style="margin-right: 1rem; cursor: pointer"
          @click="() => richStore.setVisible(true)"
          v-show="!richStore.visible"
        />
        <icon-park
          type="text-style-one"
          theme="outline"
          size="20"
          fill="#1977FD"
          style="margin-right: 1rem; cursor: pointer"
          @click="() => richStore.setVisible(false)"
          v-show="richStore.visible"
        />
        <sessionFastReply @sub="getInputValue" />
        <!-- emoji表情包 -->
        <discord-picker
          class="discord"
          :value="state.emjioValue"
          gif-format="md"
          colors="#fff"
          theme="gradient"
          @update:value="state.emjioValue"
          apiKey=""
          @emoji="setEmoji"
        />
        <UploadFile
          :acceptType="state.imgAcceptType"
          :message-type="MessageType.Image"
          icon="img"
          @send-media="sendMedia"
        />
        <UploadFile
          :accept-type="state.fileAcceptType"
          icon="file"
          :message-type="MessageType.File"
          @send-media="sendMedia"
        />
        <div class="j-center">
          <icon-park
            type="setting-config"
            style="margin-right: 1rem; margin-left: 1rem; cursor: pointer"
            theme="outline"
            size="20"
            fill="#8b8b8b"
            @click="visible = true"
          />
        </div>
        <!-- <screenshot theme="outline" size="24" fill="#333"/> -->
        <!-- <div @click="cropperImg">
          <icon-park
            type="screenshot"
            style="margin-right: 1rem; cursor: pointer"
            theme="outline"
            size="20"
            fill="#8b8b8b"
          />
        </div> -->
      </div>
    </div>
    <!-- input框 -->
    <div class="inputDeep" v-if="!richStore.visible">
      <el-input
        class="borderNone"
        ref="inputRef"
        v-model="state.textarea"
        type="textarea"
        maxlength="500"
        :placeholder="
          hotKeyStore.sendKey == 'Enter'
            ? 'Enter to send'
            : hotKeyStore.sendKey == 'Shift+Enter'
            ? 'Shift+Enter to send'
            : 'Ctrl+Enter to send'
        "
        resize="none"
        size="large"
        :autofocus="true"
        input-style="font-size:0.875rem;color:#000"
        @input="listernChange"
        @keydown.enter.prevent.exact="chargeEnterOrNewLineByEnter"
        @keydown.meta.enter.exact="chargeEnterOrNewLineByCtrl"
        @keydown.ctrl.enter.exact="chargeEnterOrNewLineByCtrl"
        @keydown.shift.enter.exact="chargeShiftEnter"
      />
    </div>

    <!-- 富文本输入框 -->
    <div class="rich-input" v-if="richStore.visible">
      <rich-input @sendMsg="enterInput()" />
    </div>

    <div class="send-button" :class="[sendColor]" @click="enterInput()">
      <iconpark-icon
        name="telegram-913k5pge"
        style="font-size: 20px; color: #bfbfbf"
        v-if="!sendFlag"
      ></iconpark-icon>

      <iconpark-icon
        name="telegram"
        style="font-size: 20px; color: #1977fd"
        v-if="sendFlag"
      ></iconpark-icon>
    </div>
    <!-- <el-button type="primary" @click="enterInput" >发送</el-button> -->

    <fast :show="visible" @cancel="cancel" @confirm="confirm" />
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import DiscordPicker from '@/components/DiscordPicker.vue'
import UploadFile from '@/components/upload-file/index.vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import sessionFastReply from './session-fast-reply.vue'
import fast from '@/views/loginSetting/component/fast.vue'
// import
import { IMessageSendParam, MessageType, sendMessage } from '@/server/message_request'
import { updateFastSet } from '@/server/user_fast_request'
import {
  useChatListStore,
  useCropperStore,
  useHotKeyStore,
  useMessageStore,
  useRichStore
} from '@/stores'
import { _ } from '@xr-util/util'
import { messageSuccess } from '@xr-util/xr-ui'
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import RichInput from './rich-input.vue'
import { copyKeyBoard } from '@/utils/keyboard'
import { hasHtmlTags } from '@/utils/check'
import Recorder from '@/components/audio-record/index.vue'
import { uploadFileAndDownload } from '@/utils/file2bite'
//@ts-ignore
import he from 'he'

import html2canvas from 'html2canvas'
import { Base64 } from 'js-base64'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const chatListStore = useChatListStore()
const messageStore = useMessageStore()
const hotKeyStore = useHotKeyStore()
const richStore = useRichStore()
const cropperStore = useCropperStore()

const sendFlag = ref(false)
const sendColor = ref()
const hoverFlag = ref(false)
const inputRef = ref()
const visible = ref(false)

const state = reactive({
  emjioValue: '',
  textarea: '',
  imgAcceptType:
    '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP,.AVI,.MP4,.WMV,.MOV,.FLV,.MKV,.RMVB,.MPEG,.3GP',
  fileAcceptType:
    '.pdf, .doc, .docx, .xls, .xlsx,.mp3, .mp4, .mov, .wav ,.aac ,.wma, .ogg ,.flac,.ppt,.pptx'
})

watch(
  () => messageStore.fastReply,
  (newValue, _) => {
    if (newValue) {
      //接受到消息直接发送
      enterInput(newValue)
      autoGetFocus()
    }
  }
)

copyKeyBoard()

watch(
  () => richStore.textarea,
  (newValue, _) => {
    state.textarea = richStore.textarea
    if (richStore.textarea && !sendFlag.value) {
      sendFlag.value = true
      sendColor.value = 'send-style'
    } else if (!richStore.textarea && sendFlag.value) {
      sendFlag.value = false
      sendColor.value = ''
    }
  }
)
//document
const element = document.querySelector('.send-button')
//增加事件监听
element &&
  element.addEventListener('mouseenter', () => {
    element.classList.add('hover')
    hoverFlag.value = true
  })
element &&
  element.addEventListener('mouseleave', () => {
    element.classList.remove('hover')
    hoverFlag.value = false
  })

const setEmoji = (emoji: any) => {
  // console.log(emoji)
  state.textarea = state.textarea + emoji
  autoGetFocus()
}

/**
 * 监听文本输入
 * @param value
 */
const listernChange = (value: any) => {
  richStore.setTextArea(value)
}

const insertNewLine = () => {
  const selectEnd = getElInputFocus()

  if (state.textarea && selectEnd > -1) {
    let str = state.textarea
    state.textarea = str.slice(0, selectEnd) + '\n' + str.slice(selectEnd)
  }

  // state.textarea = state.textarea + '<br/>'
}
/**
 * 空消息校验
 * @param str
 */
function validateString(str: string) {
  return /^[\s\n]*$/.test(str)
}
/**
 * 用户输入enter事件
 * @param value
 */
const enterInput = async (inputValue?: string) => {
  messageStore.clearFastReply()
  if (!chatListStore.currentSessionId) return
  console.log(state.textarea)
  if (validateString(state.textarea) && !inputValue) {
    // messageWarning('空消息不可发送')
    return
  }
  const param: IMessageSendParam = {
    messageType: MessageType.Text,
    msg: inputValue ? inputValue : state.textarea,
    sessionId: chatListStore.currentSessionId
  }
  if (hasHtmlTags(state.textarea)) {
    param.messageType = MessageType.RichText
    param.recordFileKeys = richStore.recordFileKey

    if (!_.isEmpty(richStore.recordFileKey)) {
      let arr = richStore.recordFileKey
      for (let i = 0; i < arr.length; i++) {
        const { fileKey, fileUrl } = arr[i]

        if (fileKey && fileUrl) {
          state.textarea = state.textarea.replace(/src="(.*?)"/g, (match, url) => {
            url = he.decode(url)
            const found = arr.find((item) => item.fileUrl == url)
            if (found) {
              return `src="${found.fileKey}"`
            }
            return match
          })
        }
      }

      console.log(state.textarea)
    }

    param.msg = inputValue ? inputValue : Base64.encode(state.textarea)
  }

  const tempMsg = state.textarea
  const tempEmoji = state.emjioValue
  //清除输入框内容
  state.textarea = ''
  //emoji表情包清空
  state.emjioValue = ''
  await sendMessage(param).then((res) => {
    if (res && res.code == '0') {
      console.log(`消息发送成功 : ${param.sessionId},内容为：${param.msg}`)
    } else {
      state.textarea = tempMsg
      state.emjioValue = tempEmoji
    }
  })

  richStore.clearTextarea()
}

/**
 * 组织键盘默认 行为之后，需要重新赋予换行行为
 * */
const chargeEnterOrNewLineByEnter = () => {
  if (hotKeyStore.sendKey == 'Enter') {
    enterInput()
  }
  if (hotKeyStore.newLine == 'Enter') {
    insertNewLine()
  }
}
const chargeEnterOrNewLineByCtrl = () => {
  if (hotKeyStore.sendKey == 'Ctrl+Enter') {
    enterInput()
  }

  if (hotKeyStore.newLine == 'Ctrl+Enter') {
    insertNewLine()
  }
}

const chargeShiftEnter = () => {
  if (hotKeyStore.sendKey == 'Shift+Enter') {
    enterInput()
  }
  if (hotKeyStore.newLine == 'Shift+Enter') {
    insertNewLine()
  }
}

/**
 * 发送视频、图片、音频文件
 * @param value
 */
const sendMedia = async (value: any) => {
  console.log('sendMedia', value)
  if (value && value.type && value.fileUrl) {
    const param: IMessageSendParam = {
      messageType: value.type,
      msg: value.key,
      sessionId: chatListStore.currentSessionId
    }
    await sendMessage(param).then((res) => {
      if (res && res.code == '0') {
        console.log(`消息发送成功 : ${param.sessionId},内容为：${param.msg}`)
      }
    })
  }
}

const autoGetFocus = () => {
  inputRef.value.focus()
}

const getInputValue = (value: string) => {
  if (!value) return
  //输入框的值
  enterInput(value)

  autoGetFocus()
}

//取消
const cancel = () => {
  visible.value = false
}
//确认按钮
const confirm = async (value: any) => {
  await updateFastSet(value).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.shortcut_success'))
    }
  })
  await useHotKeyStore().getHotKeyDetail()
  visible.value = false
}

//截图
const cropperImg = () => {
  //@ts-ignore
  html2canvas(document.querySelector('body')).then((canvas) => {
    const base64 = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, '')
    cropperStore.setImgUrl(`data:image/jpeg;base64,${base64}`)
    // base64Img.value =
    console.log(cropperStore.imgUrl)
    cropperStore.setVisible(true)
  })
}

const dropHandler = (event: any) => {
  event.preventDefault()
  const files = event.dataTransfer.files
  if (files && files.length > 0) {
    //上传文件
    uploadFileAndDownload(files[0], false).then((res) => {
      console.log(res)
      if (res && res.type && res.url && res.key) {
        if (res.type == 'IMAGE') {
          //打开富文本
          richStore.setVisible(true)
          richStore.setHtmlTagIn(res.type, res.url, res.key)
        } else {
          sendMedia({
            type: res.type,
            fileUrl: res.url,
            key: res.key
          })
        }
      }
    })
  }
}
const handleDragOver = (event: any) => {
  event.preventDefault()
}

const getElInputFocus = (): number => {
  const inputEl = inputRef.value.$refs.textarea
  const selectionEnd = inputEl.selectionEnd
  return selectionEnd
}
</script>

<style lang="scss" scoped>
.chat-input-box {
  border: 1px solid #f1f2f6;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  border-radius: 1rem;
  margin: 0 1.5rem 1.5rem 1.5rem;
  padding: 0.75rem 0.75rem 2rem 0.75rem;
  background-color: #fff;
  position: relative;
  display: flex;

  .icon-function {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .chat-function {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0.4rem;
    right: 3rem;
    z-index: 1200;
  }

  .history-box {
    width: 6.375rem;
    height: 2rem;
    border-radius: 2;
    background-color: #f4f5f8;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    span {
      color: #434343;
      font-size: 14px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      margin-left: 3px;
    }
  }
  .discord {
    margin-top: 0 !important;
    margin-right: 1rem;
    width: 22px;
    height: 22px;
  }
  /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */

  .inputDeep {
    margin-top: 0.5rem;
  }
  .inputDeep :deep(.el-textarea__inner) {
    background-color: #ffffff;
    box-shadow: 0 0 0 0;
    border: none !important;
    width: 45vw;
  }

  .send-button {
    position: absolute;
    right: 1rem;
    bottom: 0.3rem;
    width: 2.75rem;
    height: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .send-button:hover {
    background-color: #f0f0f0;
    border-radius: 0.3125rem;
  }

  .hover {
    background-color: #1977fd;
  }

  .send-style {
    // background-color: #f0f0f0;
    border: 1px solid #1977fd;
    border-radius: 0.6rem;
  }
}
</style>
