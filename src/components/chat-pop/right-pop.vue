<template>
  <div class="right-pop-all-box" v-if="!props.withdraw">
    <div class="right-pop-box" v-if="props.showType && props.showType == MessageType.Text">
      <p style="white-space: pre-wrap">{{ textValue }}</p>

      <div v-if="props.singleTrans">
        <el-divider />
        <p style="white-space: pre-wrap">{{ translateText }}</p>
      </div>
    </div>
    <div class="right-pop-box" v-if="props.showType && props.showType == MessageType.RichText">
      <div v-html="textValue" v-viewer></div>

      <div v-if="props.singleTrans">
        <el-divider />
        <div style="white-space: pre-wrap" v-html="translateText"></div>
      </div>
    </div>

    <img
      :src="textValue"
      class="img-style"
      v-viewer
      v-if="props.showType && props.showType == MessageType.Image"
      alt=""
    />

    <div class="video-box" v-if="props.showType && props.showType == MessageType.Video">
      <!-- <参考文档>：https://videojs.com/guides/options/#poster -->
      <video controls>
        <source :src="textValue" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="audio-box" v-if="props.showType && props.showType == MessageType.Audio">
      <audio controls>
        <source :src="textValue" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>

    <div class="file-box" v-if="props.showType && props.showType == MessageType.File">
      <img src="@/assets/file-show.png" alt="" />
      <a :href="textValue" class="color-upload-text">{{ $t('CHAT.click_download') }}</a>
    </div>
    <!-- <div class="arrow"></div> -->

    <div
      class="loading-box"
      v-if="props.showType && props.showType == MessageType.Loading"
      v-loading="loading"
    >
      <span>{{ $t('CHAT.file_uploading') }}</span>
    </div>
  </div>

  <!--消息撤回 -->
  <div class="right-pop-all-box" v-if="props.withdraw">
    <div class="right-pop-box">
      <p style="white-space: pre-wrap">{{ $t('COMMON.withdraw_message') }}</p>
    </div>
  </div>

  <!-- 语音消息 -->
  <div v-if="props.showType && props.showType == MessageType.Voice">
    <VoiceWechat :url="textValue" left-or-right="right" />
  </div>
</template>

<script lang="ts" setup>
import { MessageType } from '@/server/message_request'
import VoiceWechat from './component/voice-wechat.vue'
import { ref, watch } from 'vue'
//@ts-ignore
import he from 'he'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  showType: {
    type: String,
    required: true
  },
  withdraw: {
    type: Boolean,
    required: true,
    default: false
  },
  record: {
    type: Array,
    required: false
  },
  singleTrans: {
    type: String,
    required: false
  }
})
const textValue = ref()
const loading = ref(true)
//翻译之后的文本，这里主要针对的是富文本内容
const translateText = ref()

const checkTextNewLine = () => {
  //文本给到textValue
  textValue.value = props.text
  if (props?.showType && props?.showType == MessageType.RichText) {
    if (props.record && props.record.length > 0) {
      for (let i = 0; i < props.record.length; i++) {
        //@ts-ignore
        const { fileKey, fileUrl } = props.record[i]
        if (fileUrl && fileKey) {
          textValue.value = textValue.value.replace(/src="(.*?)"/g, (match: any, url: any) => {
            url = he.decode(url)
            //@ts-ignore
            const found: any = props?.record.find((item: any) => item.fileKey === url)
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
checkTextNewLine()

watch(
  () => props.singleTrans,
  (newValue) => {
    if (newValue) {
      translateText.value = newValue
      if (props?.showType && props?.showType == MessageType.RichText) {
        if (props.record && props.record.length > 0) {
          for (let i = 0; i < props.record.length; i++) {
            //@ts-ignore
            const { fileKey, fileUrl } = props.record[i]
            if (fileUrl && fileKey) {
              translateText.value = translateText.value.replace(
                /src="(.*?)"/g,
                (match: any, url: any) => {
                  url = he.decode(url)
                  //@ts-ignore
                  const found: any = props?.record.find((item: any) => item.fileKey === url)
                  if (found) {
                    return `src="${found.fileUrl}"`
                  }
                  return match
                }
              )
            }
          }
        }
      }
    }
  }
)
</script>

<style lang="scss" scoped>
.right-pop-all-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  min-height: 3rem;
  margin-right: 0.75rem;
  max-width: 80%;
  .right-pop-box {
    display: flex;
    flex-direction: column;
    background-color: #e6f0ff;
    min-height: 1.875rem;
    align-items: center;
    max-width: 30vw;
    padding: 0.875rem 0.75rem;
    border-radius: 0.5rem;
    p {
      color: #434343;
      font-size: 0.875rem;
      word-wrap: break-word;
      white-space: pre-wrap;
      max-width: 28vw;
    }
  }

  .arrow {
    height: 0;
    width: 0;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent transparent rgb(149, 236, 105);
    border-style: solid;
    border-width: 5px;
  }
  .img-style {
    width: 70%;
    height: auto;
  }
  .file-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 3.125rem;
      height: 3.75rem;
    }
  }
  .video-box {
    width: 100%;
  }
  .voice-box {
    min-width: 20vw;
  }
}
</style>
