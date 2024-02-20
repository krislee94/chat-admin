<template>
  <div class="voico-pop-box" :id="id">
    <div class="voice-controls">
      <el-button
        type="primary"
        v-if="!finished && !playing"
        @click="play"
        size="small"
        style="border-radius: 50%; width: 1.5rem; height: 1.5rem"
      >
        <icon-park type="play-one" theme="outline" size="20" fill="#fff" />
      </el-button>
      <el-button
        type="success"
        v-if="finished && !playing"
        @click="replay"
        size="small"
        style="border-radius: 50%; width: 1.5rem; height: 1.5rem"
      >
        <icon-park type="replay-music" theme="outline" size="20" fill="#fff" />
      </el-button>
      <el-button
        type="warning"
        v-if="playing"
        @click="pause"
        size="small"
        style="border-radius: 50%; width: 1.5rem; height: 1.5rem"
      >
        <icon-park type="pause" theme="outline" size="20" fill="#fff" />
      </el-button>
    </div>
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
    <div style="width: 30px">{{ durationTime }}</div>
  </div>
</template>

<script lang="ts" setup>
//语音消息 组件 展示

import { ref, watchEffect, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { IllestWaveformProps } from '1llest-waveform-vue'
import { IllestWaveform } from '1llest-waveform-vue'
import { IconPark } from '@icon-park/vue-next/es/all'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})
const id = ref(Math.random() + '')

const waveformRef = ref<typeof IllestWaveform | null>(null)

const waveOptions = reactive<IllestWaveformProps>({
  url: props.url
})

onMounted(() => {
  getCurrentTime()
})

const init = ref(false)
const fetched = ref(false)
const playing = ref(false)
const finished = ref(false)
const ready = ref(false)
const currentTime = ref('0:00')
const durationTime = ref('0:00')

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
</script>

<style lang="scss" scoped>
.voico-pop-box {
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  padding-left: 1rem;
  padding-right: 1rem;

  .voice-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
