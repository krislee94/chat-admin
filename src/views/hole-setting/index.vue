<template>
  <div class="j-row">
    <Menu />
    <div class="setting-component-box">
      <settingTitle :title="$t('xr_hole_tile')" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <el-row :gutter="20">
          <el-col :span="8">
            <!-- 全局设置 翻译-->
            <div class="div-style j-column base-content" v-auth:im:setting:hole:translate>
              <div class="j-column">
                <span class="sp1" v-t="'COMMON.translate'"></span>
                <span class="sp2" v-t="'xr_set_translate_source'"></span>

                <div class="x-span">
                  <span class="sp3" v-t="'xr_translate_source'"></span>
                  <span>{{ currentSource }}</span>
                </div>
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clickSet">{{ $t('SETTING.set_up') }}</el-button>
              </div>
            </div></el-col
          >
          <!-- 全局设置 - 回复监管 -->
          <el-col :span="8">
            <div class="div-style j-column base-content" v-auth:im:setting:hole:translate>
              <div class="j-column">
                <span class="sp1" v-t="'t_reply_check'"></span>
                <span class="sp2" v-t="'t_reply_check_desc'"></span>

                <div class="x-span">
                  <span class="sp3" v-t="'t_reply_time'"></span>
                  <span class="ml-5">{{ replyCheckConfig.jsonValue?.timeValue }}</span>
                  <TimeUnitComponent :time-unit="replyCheckConfig.jsonValue?.timeUnit ?? ''" />
                </div>
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clickSetReply">{{
                  $t('SETTING.set_up')
                }}</el-button>
              </div>
            </div>
          </el-col>
          <!-- 全局设置-断开会话 -->
          <el-col :span="8">
            <div class="div-style j-column base-content" v-auth:im:setting:hole:translate>
              <div class="j-column">
                <span class="sp1" v-t="'t_disconnect_session'"></span>
                <span class="sp2" v-t="'t_disconnect_session_desc'"></span>

                <div class="x-span">
                  <span class="sp3" v-t="'t_disconnect_time'"></span><span>:</span>
                  <span class="ml-5">{{ autoEndConfig?.jsonValue?.timeValue }}</span>
                  <TimeUnitComponent :time-unit="autoEndConfig.jsonValue?.timeUnit ?? ''" />
                </div>
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clickSetSessionEnd">{{
                  $t('SETTING.set_up')
                }}</el-button>
              </div>
            </div></el-col
          >

          <!-- 全局设置 - 离线转接 -->
          <el-col :span="6">
            <div class="div-style j-column base-content" v-auth:im:setting:hole:translate>
              <div class="j-column">
                <span class="sp1" v-t="'t_offline_transfer'"></span>
                <span class="sp2" v-t="'t_offline_transfer_dec'"></span>

                <div class="x-span">
                  <span class="sp3" v-t="'t_customer_offline_time'"></span><span>:</span>
                  <span class="ml-5">{{ autoTransferConfig.jsonValue?.timeValue }}</span>
                  <TimeUnitComponent :time-unit="autoTransferConfig.jsonValue?.timeUnit ?? ''" />
                </div>
              </div>

              <div class="sure-btn">
                <el-button type="primary" @click="clikSetAutoTranfer">{{
                  $t('SETTING.set_up')
                }}</el-button>
              </div>
            </div></el-col
          >
        </el-row>
      </main>
    </div>

    <HoleSetting ref="holeSetting" :options="options" />

    <ReplyCheckComponent
      ref="replyCheckRef"
      @sure-confirm="sureConfirm"
      :unit="replyCheckConfig.jsonValue?.timeUnit ?? ''"
      :time-value="replyCheckConfig.jsonValue?.timeValue ?? ''"
    />

    <AutoSessionEnd
      ref="autoSessionEndRef"
      @sure-confirm="sureConfirm"
      :unit="autoEndConfig.jsonValue?.timeUnit"
      :time-value="autoEndConfig?.jsonValue?.timeValue"
    />

    <OfflineAutoTransfer
      ref="offlineAutoTransferRef"
      @sure-confirm="sureConfirm"
      :unit="autoTransferConfig.jsonValue?.timeUnit"
      :time-value="autoTransferConfig?.jsonValue?.timeValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import settingTitle from '@/views/setting/component/setting-title.vue'
import TimeUnitComponent from '@/components/timeUnit/time-unit.vue'
import Menu from '@/components/setting/menu.vue'
import HoleSetting from '@/views/hole-setting/component/index.vue'
import ReplyCheckComponent from '@/views/hole-setting/component/reply-check-component.vue'
import AutoSessionEnd from '@/views/hole-setting/component/auto-session-end.vue'
import OfflineAutoTransfer from '@/views/hole-setting/component/offline-auto-transfer.vue'

import { getTranslateList, TranslationConfigEntity } from '@/server/setting_request'

import { getConfigList, KeyList, Key } from '@/server/system_config_request'

import type {
  ISysConfigGetConfigListRequest,
  SysConfigResponse
} from '@/server/system_config_request'

import { _ } from '@xr-util/util'

const currentSource = ref('Google')

const holeSetting = ref()
const replyCheckRef = ref()
const autoSessionEndRef = ref()
const offlineAutoTransferRef = ref()

const options = ref<TranslationConfigEntity[]>([])

// const configList = ref<SysConfigResponse[]>([])

//会话自动结束配置
const autoEndConfig = ref<SysConfigResponse>({})
//会话自动转接配置
const autoTransferConfig = ref<SysConfigResponse>({})
//回复监管
const replyCheckConfig = ref<SysConfigResponse>({})

const clickSet = () => {
  holeSetting.value.open()
}

const init = async () => {
  //获取翻译列表
  await getTranslateList().then((res) => {
    if (res && res.code == '0') {
      console.log(res.data)
      if (res.data && res.data.length > 0) {
        options.value = res.data
        currentSource.value = res.data.filter((item) => item.selected)[0].name || ''
      }
    }
  })

  //获取配置列表
  await queryConfigList()
}

//获取配置列表
const queryConfigList = async () => {
  const param: ISysConfigGetConfigListRequest = {
    keyList: [
      KeyList.SessionAutoEndTime,
      KeyList.SessionAutoTransferTime,
      KeyList.SessionCheckReplyTime
    ]
  }
  await getConfigList(param).then((res: any) => {
    if (res && res.code === '0') {
      if (!_.isEmpty(res?.data)) {
        res.data?.forEach((item: any) => {
          if (item && item.key) {
            switch (item.key) {
              case Key.SessionAutoEndTime:
                autoEndConfig.value = item
                break

              case Key.SessionAutoTransferTime:
                autoTransferConfig.value = item
                break

              case Key.SessionCheckReplyTime:
                replyCheckConfig.value = item
                break

              default:
                break
            }
          }
        })
      }
    }
  })

  console.log(replyCheckConfig.value)
}

const sureConfirm = () => {
  queryConfigList()
}
const clickSetSessionEnd = () => {
  autoSessionEndRef.value.open()
}

const clikSetAutoTranfer = () => {
  offlineAutoTransferRef.value.open()
}
//----------------------------------------------------------------------
/**
 * 打开回复监管
 */
const clickSetReply = () => {
  replyCheckRef.value.open()
}
init()
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 83.4vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    height: 90vh;
  }
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
      margin-top: 0.625rem;
    }
    .sp3 {
      color: rgba(16, 16, 16, 1);
      font-size: 0.875rem;
    }
    .sure-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .x-span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.625rem;
  }

  .ml-5 {
    margin-left: 5px;
  }
}
</style>
