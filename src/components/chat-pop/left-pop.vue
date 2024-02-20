<template>
  <div class="left-pop-all-box" v-if="!props.withdraw">
    <!-- <div class="arrow"></div> -->
    <div
      class="left-pop-box"
      v-if="
        props.showType &&
        (props.showType == MessageType.Text || props.showType == MessageType.RichText)
      "
    >
      <p style="white-space: pre-wrap">{{ textValue }}</p>
      <p v-if="translationText" style="white-space: pre-wrap">{{ translationText }}</p>

      <div v-if="props.singleTrans">
        <el-divider />
        <p style="white-space: pre-wrap">{{ props.singleTrans }}</p>
      </div>
    </div>

    <div class="left-img-box" v-if="props.showType && props.showType == MessageType.Image">
      <img :src="textValue" class="img-style" v-viewer />
    </div>
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
      <img src="@/assets/file-show.png" />
      <a :href="textValue" class="color-upload-text">{{ $t('CHAT.click_download') }}</a>
    </div>
  </div>

  <div class="left-pop-all-box" v-if="props.withdraw">
    <div class="left-pop-box">
      <p style="white-space: pre-wrap">{{ $t('COMMON.withdraw_message') }}</p>
    </div>
  </div>

  <div v-if="props.showType && props.showType == MessageType.Voice">
    <VoiceWechat :url="textValue" left-or-right="left" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MessageType } from '@/server/message_request'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/stores'
import VoiceWechat from './component/voice-wechat.vue'
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  translationText: {
    type: String,
    required: false
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
  singleTrans: {
    type: String,
    required: false
  }
})

const textValue = ref(props.text)
const translationText = ref()
const translationSpan = ref('translation')

const checkTextNewLine = () => {
  // if (props.text && props.showType == MessageType.Text) {
  //   textValue.value = props.text.replace(/\n/g, '<br/>')
  // }
  if (props.translationText && props.showType == MessageType.Text) {
    if (useUserStore().language == 'English') {
      translationSpan.value = 'translation:'
    } else {
      translationSpan.value = '译文：'
    }
    translationText.value =
      '\n' + translationSpan.value + props.translationText.replace(/\n/g, '<br/>')
  }
}
checkTextNewLine()
</script>

<style lang="scss" scoped>
.left-pop-all-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.75rem;
  .left-pop-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffffff;
    min-height: 3rem;
    max-width: 30vw;
    // align-items: center;
    padding: 0.875rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #f1f2f6;

    p {
      color: rgb(14, 25, 12);
      font-size: 0.875rem;
      word-wrap: break-word;
      white-space: pre-wrap;
      max-width: 28vw;
    }
  }
  .left-img-box {
    display: flex;
    flex-direction: row;
    border: 1px solid #f5f5f5;
    min-height: 1.875rem;
    align-items: center;
    max-width: 30vw;
    padding: 0.5vw;
  }
  .arrow {
    height: 0;
    width: 0;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    border-color: transparent #fff transparent transparent;
    border-style: solid;
    border-width: 5px;
  }
  .img-style {
    width: 40%;
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
}
</style>
