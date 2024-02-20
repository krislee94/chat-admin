<template>
  <el-dialog v-model="visible" width="30%" :modal="false" :destroy-on-close="true" @close="close">
    <div class="luyin-box">
      <div class="cursor-pointer btn-box status-1" v-if="status == 1" @click="toRecorder">
        <!-- <div class="wave"></div> -->
        <icon-park type="microphone" theme="outline" size="30" fill="#fff" />
        <span class="text-span">{{ $t('t_click_to_audio') }}</span>
      </div>

      <div class="cursor-pointer btn-box status-2" v-if="status == 2" @click="toStop">
        <!-- <div class="wave"></div> -->
        <icon-park type="pause-one" theme="outline" size="30" fill="#fff" />
        <span class="text-span">{{ $t('t_click_to_stop') }}</span>
      </div>

      <div class="cursor-pointer btn-box status-3" v-if="status == 3">
        <icon-park type="loading" theme="outline" size="30" fill="#fff" />
        <span class="text-span">{{ $t('t_file_loading') }}</span>
      </div>

      <div
        class="cursor-pointer btn-box2"
        style="background: #409eff"
        v-if="status == 4 && !finished && !playing"
        @click="play"
      >
        <icon-park type="play-one" theme="outline" size="30" fill="#fff" />
      </div>

      <div
        class="cursor-pointer btn-box2"
        style="background: #67c23a"
        v-if="status == 4 && finished && !playing"
        @click="replay"
      >
        <icon-park type="replay-music" theme="outline" size="30" fill="#fff" />
      </div>
      <div
        class="cursor-pointer btn-box2"
        style="background: #e6a23c"
        v-if="status == 4 && playing"
        @click="pause"
      >
        <icon-park type="pause" theme="outline" size="30" fill="#fff" />
      </div>

      <div class="cursor-pointer btn-box status-5" v-if="status == 5">
        <icon-park type="emotion-unhappy " theme="outline" size="24" fill="#fff" />
        <span class="text-span">{{ $t('t_file_upload_fail') }}</span>
      </div>

      <div
        v-if="recorderRef.audioUrl"
        style="width: 100%; height: 40px; background-color: rgb(243, 244, 246)"
      >
        <IllestWaveform
          ref="waveformRef"
          v-bind="waveOptions"
          @on-init="initHandler"
          @on-fetched="fetchedHandler"
          @on-ready="readyHandler"
          @on-play="(v: boolean) => (playing = v)"
          @on-pause="(v: boolean) => (playing = v)"
          @on-finish="finishHandler"
          @on-click="clickHandler"
          maskColor="#000"
          cursor-color="#3bb2b8"
          line-color="#a1a1aa"
        />

        <div class="flex row au-box">
          <div style="margin-right: 20px">{{ currentTime }} / {{ durationTime }}</div>
        </div>
      </div>

      <div class="send-box" v-if="status == 4">
        <el-button @click="reupload">{{ $t('t_file_reupload') }}</el-button>
        <el-button type="primary" plain @click="sendMsg"
          >{{ $t('t_send_voice_message') }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, reactive, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { noticeError } from '@xr-util/xr-ui'
import { uploadAudioFunc, blobToByteArray } from '@/utils/file2bite'
import type { IllestWaveformProps } from '1llest-waveform-vue'
import { IllestWaveform } from '1llest-waveform-vue'
import { MessageType } from '@/server/message_request'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext?.config.globalProperties

const emit = defineEmits(['confirm'])

const visible = ref(false)
//1为初始状态
const status = ref(1)
const waveformRef = ref<typeof IllestWaveform | null>(null)

const init = ref(false)
const fetched = ref(false)
const playing = ref(false)
const finished = ref(false)
const ready = ref(false)
const currentTime = ref('0:00')
const durationTime = ref('0:00')

interface IRecoderRefParam {
  isRecording: boolean
  mediaRecorder: any
  chunks: any[]
  audioUrl?: string
}

const senderInfo = reactive({
  key: '',
  type: MessageType.Voice,
  url: ''
})

const recorderRef: IRecoderRefParam = reactive({
  isRecording: false,
  mediaRecorder: null,
  chunks: [],
  audioUrl: ''
})

const waveOptions = reactive<IllestWaveformProps>({
  url: ''
})

//打开的方法
const open = () => {
  visible.value = true
}

const toRecorder = () => {
  //重新校验一下
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      //添加MediaRecorder对象。
      recorderRef.mediaRecorder = new MediaRecorder(stream)
      recorderRef.mediaRecorder.addEventListener('dataavailable', (e: any) => {
        console.log(e)
        if (e.data.size > 0) {
          recorderRef.chunks.push(e.data)
        }
      })

      recorderRef.mediaRecorder.start()
      recorderRef.isRecording = true
      status.value = 2
    })
    .catch((error) => {
      noticeError({
        title: `Warning`,
        message: `Error accessing microphone:', ${error}`
      })
    })
}

//
const toStop = async () => {
  //点击停止录音、上传录音文件
  recorderRef.mediaRecorder.stop()
  recorderRef.isRecording = false
  status.value = 3
  // 处理chunk

  try {
    setTimeout(async () => {
      const blob = new Blob(recorderRef.chunks, { type: 'audio/webm' })
      //将blob变成ByteArray;
      console.log(blob)

      await blobToByteArray(blob)
        .then((btyeStream) => {
          uploadAudioFunc(btyeStream)
            .then((res) => {
              console.log(res)
              if (res && res.url && res.key) {
                recorderRef.audioUrl = res.url
                waveOptions.url = res.url
                recorderRef.chunks = []
                status.value = 4
                senderInfo.key = res.key
                senderInfo.url = res.url
              }
            })
            .then(() => {
              getCurrentTime()
            })
        })
        .catch((error) => {
          status.value = 5
        })
    }, 500)
  } catch (e) {
    console.log('e', e)
    status.value == 5
  }
}

//------------------------------音频文件方法---------------------------------

const getCurrentTime = () => {
  watchEffect(() => {
    const current = waveformRef.value!.getCurrentTime()
    currentTime.value = current
  })
}

const initHandler = (v: boolean) => {
  init.value = v
}

const fetchedHandler = (v: boolean) => {
  fetched.value = v
}

const readyHandler = (v: boolean) => {
  ready.value = v
  getDuration()
}

const finishHandler = (v: boolean) => {
  finished.value = v
}

const clickHandler = (el: Ref<HTMLElement>) => {
  console.log(el)
}

const play = () => {
  waveformRef.value!.play()
}

const replay = () => {
  waveformRef.value!.replay()
}

const pause = () => {
  waveformRef.value!.pause()
}

const getDuration = () => {
  const duration = waveformRef.value!.getDuration()
  durationTime.value = duration
}

const reupload = () => {
  //状态设置为1
  status.value = 1
  recorderRef.audioUrl = ''
  recorderRef.chunks = []
  recorderRef.isRecording = false
  recorderRef.mediaRecorder = null

  //设备重置；

  init.value = false
  fetched.value = false
  playing.value = false
  finished.value = false
  ready.value = false
  ready.value = false
  currentTime.value = '0:00'
  durationTime.value = '0:00'

  //senderInfo重置
  senderInfo.key = ''
  senderInfo.url = ''
}
//----------------------------------------------------------------
const close = () => {
  reupload()
}

/**
 * 发送消息的方法
 */
const sendMsg = () => {
  emit('confirm', {
    type: senderInfo.type,
    key: senderInfo.key,
    url: senderInfo.url
  })

  visible.value = false
}

//抛出api.
defineExpose({ open, visible })
</script>

<style lang="scss" scoped>
.luyin-box {
  width: 100%;
  min-height: 16.5rem;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .btn-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 6.6875rem;
    height: 6.6875rem;
    border-radius: 50%;
    animation: circleAnimation 2s linear infinite;
  }
  .btn-box2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 6.6875rem;
    height: 6.6875rem;
    border-radius: 50%;
  }
  .status-1 {
    background: radial-gradient(rgba(64, 149, 229, 1) 0%, rgba(117, 249, 253, 1) 100%);
  }
  .status-2 {
    background-image: radial-gradient(rgba(240, 20, 0, 1) 0%, rgba(222, 134, 143, 1) 100%);
  }
  .status-3 {
    background-image: linear-gradient(135deg, #b3ffab, #12fff7);
  }
  .status-4 {
    background-image: linear-gradient(135deg, #3bb2b8, #42e695);
  }

  .status-5 {
    background-image: linear-gradient(135deg, #fce38a, #f38181);
  }
  @keyframes circleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .text-span {
    color: #fff;
    font-size: 0.75rem;
    margin-top: 5px;
  }

  .au-box {
    width: 100%;
    justify-content: flex-end;
    color: #5e5e5e;
    align-items: center;

    margin-top: 0.625rem;
  }

  .send-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
}
</style>
