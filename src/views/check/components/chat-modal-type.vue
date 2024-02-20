<template>
  <div class="chat-modal-type">
    <!-- 文本 -->
    <div v-if="props.chatInfo && props.chatInfo.msgType == MsgType.Text" class="message-text">
      {{ props.chatInfo.body }}
    </div>

    <div class="message-text" v-if="props.chatInfo && props.chatInfo?.msgType == MsgType.RichText">
      <div v-html="textValue" v-viewer></div>
    </div>

    <!-- 图片 -->
    <div v-if="props.chatInfo && props.chatInfo.msgType == MsgType.Image" class="mssage-img">
      <img :src="props.chatInfo.body" v-viewer />
    </div>

    <!-- 视频 -->
    <div v-if="props.chatInfo && props.chatInfo.msgType == MsgType.Video" class="mssage-video">
      <video controls>
        <source :src="props.chatInfo.body" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- 语音 -->
    <div v-if="props.chatInfo && props.chatInfo.msgType == MsgType.Audio" class="message-audio">
      <audio controls>
        <source :src="props.chatInfo.body" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>

    <!-- 文件 -->
    <div v-if="props.chatInfo && props.chatInfo.msgType == MsgType.File" class="message-file">
      <img src="@/assets/file-show.png" />
      <a :href="props.chatInfo.body" class="color-upload-text">点击下载</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SessionChatRecordResponse } from '@/server/check_request'
import { MsgType } from '@/server/check_request'
import { PropType, ref } from 'vue'
//@ts-ignore
import he from 'he'

const props = defineProps({
  chatInfo: {
    type: Object as PropType<SessionChatRecordResponse>
  }
})

const textValue = ref()

const init = () => {
  if (props.chatInfo && props.chatInfo.msgType && props.chatInfo.msgType == MsgType.RichText) {
    textValue.value = props.chatInfo.body
    if (props.chatInfo?.recordFileKeys && props.chatInfo?.recordFileKeys.length > 0) {
      for (let i = 0; i < props.chatInfo?.recordFileKeys.length; i++) {
        const { fileKey, fileUrl } = props.chatInfo?.recordFileKeys[i]
        if (fileKey && fileUrl) {
          textValue.value = textValue.value.replace(/src="(.*?)"/g, (match: any, url: any) => {
            url = he.decode(url)
            //@ts-ignore
            const found: any = props.chatInfo?.recordFileKeys.find(
              (item: any) => item.fileKey === url
            )
            if (found) {
              return `src="${found.fileUrl}"`
            }
            return match
          })
        }
      }
    }
  }
}

init()
</script>

<style lang="scss" scoped>
.chat-modal-type {
  .message-text {
    overflow-wrap: anywhere;
    max-width: 35vw;
  }

  .mssage-img {
    img {
      width: 50%;
    }
  }
  .message-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 3.125rem;
      height: 3.75rem;
    }
  }
}
</style>
