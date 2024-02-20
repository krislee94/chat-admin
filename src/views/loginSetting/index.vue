<template>
  <div class="j-row" style="height: 100%">
    <MenuVue />
    <div class="setting-component-box">
      <settingTitle :title="$t('SETTING.perferences')" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="div-style j-column base-content" v-auth:im:setting:perference:fastkey>
              <div class="j-column">
                <span class="sp1" v-t="'SETTING.hot_key'"></span>
                <span class="sp2" v-t="'SETTING.hot_desp'"></span>
              </div>
              <div class="j-row-center">
                <span style="width: 12.5rem">{{ $t('SETTING.new_line') }} :</span>
                <span>{{ shortKey.dialogNewline }}</span>
              </div>

              <div class="j-row-center">
                <span style="width: 12.5rem">{{ $t('SETTING.send_message') }} :</span>
                <span>{{ shortKey.sendMsg }}</span>
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clickSet">{{ $t('SETTING.set_up') }}</el-button>
              </div>
            </div></el-col
          >

          <el-col :span="8">
            <div class="div-style j-column base-content" v-auth:im:setting:perference:ring>
              <div class="j-column">
                <span class="sp1" v-t="'xr_ring'"></span>
                <span class="sp2" v-t="'xr_diy_ring'"></span>
              </div>

              <div class="j-row-center">
                <span style="width: 12.5rem">{{ $t('xr_current_ring') }}:</span>
                <span>{{ currentKey }}</span>
              </div>

              <div class="j-row-center">
                <span style="width: 12.5rem">{{ $t('t_warning_ring_title') }}:</span>
                <span>{{ warnInfo.warningName }}</span>
              </div>

              <div class="j-row-center">
                <span style="width: 12.5rem">{{ $t('xr_switch_ring') }}</span>
                <el-switch v-model="ringSwitch" @change="changeSwitch" />
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clickRing">{{ $t('SETTING.set_up') }}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </main>
    </div>

    <fast :show="visible" @cancel="cancel" @confirm="confirm" />
    <ring
      ref="ringRef"
      @confirm="confirmRing"
      :notcie-key="noticeKey"
      :notice-url="noticeUrl"
      :is-system="isSystem"
      v-show="noticeKey && noticeUrl"
    />
  </div>
</template>

<script lang="ts" setup>
import settingTitle from '@/views/setting/component/setting-title.vue'
import MenuVue from '@/components/setting/menu.vue'
import fast from './component/fast.vue'
import { ref, getCurrentInstance, reactive, onMounted } from 'vue'
import {
  updateFastSet,
  IEmployeeShortcutsRequest,
  getDetailFastSet
} from '@/server/user_fast_request'
import { messageSuccess } from '@xr-util/xr-ui'
import { useHotKeyStore, useUserStore } from '@/stores'
import ring from './component/ring.vue'
import {
  getLoginInfoDetail,
  changeNoticeMusic,
  IEmployeeChangeNoticeMusicRequest
} from '@/server/employee_request'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const userStore = useUserStore()

onMounted(async () => {
  await init()
})

const visible = ref(false)
const ringRef = ref()
//当前key
const currentKey = ref('')
//是否是系统铃声
const isSystem = ref(false)
const shortKey = reactive({
  sendMsg: '',
  dialogNewline: ''
})
const ringSwitch = ref(false)
const noticeKey = ref('')
const noticeUrl = ref('')

const warnInfo = reactive({
  isSystem: false,
  warningKey: '',
  warningUrl: '',
  warningName: ''
})

const clickSet = () => {
  visible.value = true
}
//取消
const cancel = () => {
  visible.value = false
}
//确认按钮
const confirm = async (value: any) => {
  await updateFastSet(value).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.fast_set_suc'))
    }
  })
  await useHotKeyStore().getHotKeyDetail()
  visible.value = false
}

const init = async () => {
  //根据key获取urls
  await userStore.getAudioUrl()
  //获取快捷键
  await getDetailFastSet().then((res) => {
    if (res && res.code == '0') {
      shortKey.dialogNewline = res.data?.dialogNewline ?? ''
      shortKey.sendMsg = res.data?.sendMsg ?? ''
    }
  })

  await getLoginDetailRing()
}

const clickRing = () => {
  ringRef.value.open()
}

const confirmRing = async (value: any) => {
  const param: IEmployeeChangeNoticeMusicRequest = {
    noticeMusic: value.key,
    warnMusic: value.warningKey,
    enableNoticeMusic: ringSwitch.value
  }
  //改变
  await changeNoticeMusic(param)
  //查询信息
  await getLoginDetailRing()

  ringRef.value.cancel()
}

const changeSwitch = async (val: any) => {
  ringSwitch.value = val
  await changeNoticeMusic({
    enableNoticeMusic: val,
    noticeMusic: userStore.noticeMusicKey || userStore.audioSystemUrls[0].key
  })
  await getLoginDetailRing()
}

const getLoginDetailRing = async () => {
  //获取信息
  await getLoginInfoDetail().then((res) => {
    if (res && res.code == '0') {
      ringSwitch.value = res.data?.noticeMusicInfo?.enableNoticeMusic ?? false

      if (res.data?.noticeMusicInfo?.noticeMusicKey) {
        const arr = userStore.audioSystemUrls.filter(
          (item: { key: string | undefined }) =>
            item.key == res.data?.noticeMusicInfo?.noticeMusicKey
        )
        if (arr && arr.length > 0) {
          isSystem.value = true
          currentKey.value = arr[0].label
        } else {
          isSystem.value = false
          currentKey.value = res.data?.noticeMusicInfo?.noticeMusicKey.slice(-8)
          noticeKey.value = res.data?.noticeMusicInfo?.noticeMusicKey
          noticeUrl.value = res.data?.noticeMusicInfo?.noticeMusicUrl ?? ''
        }
      }
      if (res.data?.noticeMusicInfo?.warnMusicKey) {
        const war = userStore.audioWarningUrls.filter(
          (item: { key: string | undefined }) => item.key == res.data?.noticeMusicInfo?.warnMusicKey
        )
        if (war && war.length > 0) {
          warnInfo.isSystem = true
          warnInfo.warningName = war[0].label
        } else {
          warnInfo.isSystem = false
          warnInfo.warningName = res.data?.noticeMusicInfo?.warnMusicKey.slice(-8)
          warnInfo.warningUrl = res.data?.noticeMusicInfo?.warnMusicUrl ?? ''
          warnInfo.warningKey = res.data?.noticeMusicInfo?.warnMusicKey
        }
      }
      if (res.data) {
        userStore.setValue(res.data)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 83.4vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .div-style {
    margin-top: 1.0625rem;
    width: 25vw;
    min-height: 11.25rem;
    background-color: #fff;
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
    padding: 1.125rem 1.5rem;
    justify-content: space-between;

    .sp1 {
      font-size: 1.125rem;
      font-weight: 500;
      color: #434343;
    }
    .sp2 {
      font-size: 0.875rem;
      color: #bfbfbf;
    }
    .sure-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
</style>
