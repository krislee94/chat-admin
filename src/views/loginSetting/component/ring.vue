<template>
  <el-dialog
    v-model="visible"
    :title="$t('xr_ring_setting')"
    width="30%"
    style="border-radius: 0.625rem"
  >
    <!--系统铃声 -->
    <el-row :gutter="20" class="border-ring-style">
      <el-col :span="12">
        <div class="j-column inner-ring-box boder-ring">
          <span v-t="$t('xr_system_ring')"></span>

          <el-radio-group v-model="audioUrl" @change="changeRadio">
            <el-radio
              :label="item.key"
              v-for="item in userStore.audioSystemUrls"
              style-="width:100%"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="j-column inner-ring-box">
          <div class="j-row flexjustify">
            <span v-t="$t('xr_diy')"></span>
            <div class="j-row">
              <el-upload accept=".mp3,.wav,.aac,.wma,.ogg,.dsd" :before-upload="beforeUpload">
                <icon-park type="link-cloud-sucess" theme="outline" size="20" fill="#c2c6ce" />
              </el-upload>

              <div style="margin-left: 0.625rem; cursor: pointer" @click="clearOptions">
                <icon-park type="delete" theme="outline" size="18" fill="#c2c6ce" />
              </div>
            </div>
          </div>

          <el-radio-group v-model="audioUrl" @change="changeRadioNotSystem">
            <!-- <el-radio :key="diyAudio.key">{{ diyAudio.key?.slice(-8) }}</el-radio> -->
            <el-radio v-for="item in options" :label="item.key">{{ item.key.slice(-6) }}</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>

    <!--告警铃声 -->
    <el-row :gutter="20" class="border-ring-style" style="margin-top: 20px">
      <el-col :span="12">
        <div class="j-column inner-ring-box boder-ring">
          <span v-t="$t('t_warning_ring_title')"></span>

          <el-radio-group v-model="audioWarningUrl" @change="changeWarningRadio">
            <el-radio
              :label="item.key"
              v-for="item in userStore.audioWarningUrls"
              style-="width:100%"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="j-column inner-ring-box">
          <div class="j-row flexjustify">
            <span v-t="$t('xr_diy')"></span>
            <div class="j-row">
              <el-upload
                accept=".mp3,.wav,.aac,.wma,.ogg,.dsd"
                :before-upload="beforeUploadWarning"
              >
                <icon-park type="link-cloud-sucess" theme="outline" size="20" fill="#c2c6ce" />
              </el-upload>

              <div style="margin-left: 0.625rem; cursor: pointer" @click="clearWarningOptions">
                <icon-park type="delete" theme="outline" size="18" fill="#c2c6ce" />
              </div>
            </div>
          </div>

          <el-radio-group v-model="audioWarningUrl" @change="changeNotSysWarning">
            <!-- <el-radio :key="diyAudio.key">{{ diyAudio.key?.slice(-8) }}</el-radio> -->
            <el-radio v-for="item in warningOptions" :label="item.key">{{
              item.key.slice(-6)
            }}</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{ $t('COMMON.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { uploadFileAndDownload } from '@/utils/file2bite'
import { UploadRawFile } from 'element-plus'
import { useUserStore } from '@/stores'

const visible = ref<boolean>(false)
const userStore = useUserStore()

const props = defineProps({
  notcieKey: {
    type: String,
    required: false
  },
  noticeUrl: {
    type: String,
    required: false
  },
  isSystem: {
    type: Boolean,
    required: false
  },
  warnInfo: {
    type: Object,
    required: false
  }
})
//系统铃声
const options = ref<any[]>([])

//告警铃声
const warningOptions = ref<any[]>([])

const audioUrl = ref(userStore.noticeMusicKey || '')

//告警铃声的选择
const audioWarningUrl = ref()

const isDiy = ref(props.isSystem)

onMounted(() => {
  console.log('---->', props.isSystem)
  //系统铃声
  if (!props.isSystem && props.notcieKey && props.noticeUrl) {
    let obj = {
      key: props.notcieKey,
      value: props.noticeUrl
    }
    options.value.push(obj)
  }
  //告警铃声
  if (props.warnInfo) {
    if (!props.warnInfo.isSystem && props?.warnInfo?.warningKey && props?.warnInfo?.warningUrl) {
      let obj = {
        key: props.warnInfo?.warningKey,
        value: props.warnInfo?.warningUrl
      }
      warningOptions.value.push(obj)
    }
  }
})

const open = () => {
  visible.value = true
}
const cancel = () => {
  visible.value = false
}

defineExpose({ open, cancel })

const emit = defineEmits(['confirm'])

/**
 * 上传文件 系统铃声
 * */
const beforeUpload = (rawFile: UploadRawFile) => {
  uploadFileAndDownload(rawFile, false).then((res) => {
    console.log(res)
    if (res && res?.key && res.url) {
      let obj = {
        key: res.key,
        value: res.url
      }
      options.value.push(obj)
    }
  })

  return false
}

const beforeUploadWarning = (rawFile: UploadRawFile) => {
  uploadFileAndDownload(rawFile, false).then((res) => {
    console.log(res)
    if (res && res?.key && res.url) {
      let obj = {
        key: res.key,
        value: res.url
      }
      warningOptions.value.push(obj)
    }
  })

  return false
}

//监听
const changeRadio = (value: any) => {
  if (value) {
    const arr = userStore.audioSystemUrls.filter((item: any) => item.key == value)
    if (arr && arr.length > 0) {
      let audio = new Audio(arr[0].url)
      audio.play()
    }
  }
}
const changeWarningRadio = (value: any) => {
  if (value) {
    const arr = userStore.audioWarningUrls.filter((item: any) => item.key == value)
    if (arr && arr.length > 0) {
      let audio = new Audio(arr[0].url)
      audio.play()
    }
  }
}
//改变非系统铃声播放声音
const changeRadioNotSystem = (value: any) => {
  console.log(value)
  if (value) {
    const arr = options.value.filter((item: any) => item.key == value)
    if (arr && arr.length > 0) {
      console.log(arr[0])
      let audio = new Audio(arr[0].value)
      audio.play()
    }
  }
}
//非警告铃声
const changeNotSysWarning = (value: any) => {
  if (value) {
    const arr = warningOptions.value.filter((item: any) => item.key == value)
    if (arr && arr.length > 0) {
      console.log(arr[0])
      let audio = new Audio(arr[0].value)
      audio.play()
    }
  }
}

const confirm = () => {
  emit('confirm', {
    key: audioUrl.value,
    warningKey: audioWarningUrl.value
  })
}

//系统铃声清除
const clearOptions = () => {
  options.value = []
  audioUrl.value = ''
}
//告警铃声清除
const clearWarningOptions = () => {
  warningOptions.value = []
  audioWarningUrl.value = ''
}
</script>

<style lang="scss" scoped>
.border-ring-style {
  border: 1px solid #f5f5f5;
  border-radius: 1rem;
  min-height: 30vh;
  .inner-ring-box {
    padding: 1rem;
    display: flex;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
  }

  .boder-ring {
    border-right: 1px solid #f5f5f5;
  }
  .flexjustify {
    display: flex;
    justify-content: space-between;
  }
}
</style>
