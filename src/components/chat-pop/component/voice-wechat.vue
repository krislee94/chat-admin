<template>
  <div
    :class="props.leftOrRight == 'right' ? 'voice-wechat-box' : 'voice-left-box'"
    @click="playAudio"
    :id="id"
    :style="widthStyle"
  >
    <div v-if="props.leftOrRight == 'right'">
      <img src="@/assets/jing-voice-right.png" v-if="isPlaying == 1 || isPlaying == 3" />
      <img src="@/assets/dong-voice-right.gif" v-if="isPlaying == 2" />
    </div>

    <div v-if="props.leftOrRight == 'left'">
      <img src="@/assets/jing-voice-left.png" v-if="isPlaying == 1 || isPlaying == 3" />
      <img src="@/assets/dong-voice-left.gif" v-if="isPlaying == 2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const id = ref(Math.random() + '')
const widthStyle = ref()
const duration = ref()

const isPlaying = ref(1)
const fetched = ref(false)

const props = defineProps({
  url: {
    type: String
  },

  leftOrRight: {
    type: String,
    required: true
  }
})
const audioInstance = new Audio(`${props.url}`)
onMounted(() => {
  audioInstance.addEventListener('ended', () => {
    console.log('播放完成....')
    isPlaying.value = 1
  })

  audioInstance.addEventListener('loadedmetadata', () => {
    fetched.value = true
  })

  audioInstance.addEventListener('canplay', () => {
    countAudioTime(audioInstance)
  })
})

const countAudioTime = async (audio: any) => {
  while (isNaN(audio.duration) || audio.duration === Infinity) {
    // 延迟一会 不然网页都卡死
    await new Promise((resolve) => setTimeout(resolve, 200)) // 设置随机播放时间，模拟调进度条
    audio.currentTime = 10000000 * Math.random()
  }
  console.log('音频的总时长:', audio.duration)
  duration.value = audio.duration || 0

  if (audio.duration && audio.duration > 0) {
    if (audio.duration > 0 && audio.duration < 10) {
      widthStyle.value = `width: 5vw`
    } else if (audio.duration >= 10 && audio.duration < 30) {
      widthStyle.value = `width:10vw`
    } else if (audio.duration >= 30 && audio.duration < 60) {
      widthStyle.value = `width:15vw`
    } else if (audio.duration >= 60) {
      widthStyle.value = `width:18vw`
    }
  }
}

const playAudio = async () => {
  audioInstance.currentTime = 0
  audioInstance.play()
  isPlaying.value = 2
  //   if (isPlaying.value == 2) {
  //     audioInstance.pause()
  //     isPlaying.value = 3
  //   } else if (isPlaying.value == 1 || isPlaying.value == 2) {
  //     audioInstance.play()
  //     isPlaying.value = 2
  //   }
}

// audioInstance.addEventListener('loadedmetadata', () => {
//   let dur = audioInstance.duration
//   console.log('：' + props.url + dur + '秒')
// })
</script>

<style lang="scss" scoped>
.voice-wechat-box {
  display: flex;
  flex-direction: column;
  background-color: #e6f0ff;
  min-height: 1.875rem;
  align-items: flex-end;
  max-width: 15vw;
  padding: 0.875rem 0.75rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  img {
    width: 20px;
    height: 20px;
  }
}

.voice-left-box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 1.875rem;
  align-items: flex-start;
  max-width: 20vw;
  padding: 0.875rem 0.75rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
