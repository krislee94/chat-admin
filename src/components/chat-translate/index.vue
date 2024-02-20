<template>
  <el-card shadow="always" class="tcs-card translate-change-style">
    <div class="tcs-title">
      <span class="tcs-span-1">{{ $t('xr_translate_change') }}</span>

      <div>
        <span class="tcs-span-2">{{ $t('xr_sure_interval') }}: </span>
        <span class="tcs-span-2">&nbsp {{ translateChangeStore.timeSecond }}S</span>
      </div>
    </div>

    <div class="tcs-content">
      <div class="tcs-user-content">
        <img :src="translateChangeStore.headerImgUrl" v-img-error:headerImgUrl-user />
      </div>

      <div class="tsc-user-base">
        <span class="span1">{{ translateChangeStore.nickName }}</span>
        <div style="margin-top: 0.7rem">
          <span class="span2">{{ $t('GAME.game_name') }}</span>
          <span class="span2">{{ translateChangeStore.merchantName }}</span>
        </div>
      </div>
    </div>

    <div class="tcs-remark">
      <span class="tcs-span-3">{{ $t('CHAT.remark') }}：</span>
      <span class="tcs-span-3"></span>
    </div>

    <div class="tcs-bottom">
      <el-button size="small" @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
      <el-button type="primary" size="small" @click="sure">{{ $t('COMMON.confirm') }}</el-button>
    </div>

    <div></div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTranslatChangeStore, useChatListStore } from '@/stores'
import { transferCustomer, ISessionTransferRequest } from '@/server/session_request'

const translateChangeStore = useTranslatChangeStore()

// translateChangeStore.show()

/**
 * 取消操作
 **/
const cancel = () => {
  translateChangeStore.close()
}

const sure = async () => {
  const param: ISessionTransferRequest = {
    reason: translateChangeStore.reason,
    newEmployeeId: translateChangeStore.newEmployeeId,
    sessionId: translateChangeStore.sessionId,
    oldEmployeeId: translateChangeStore.oldEmployeeId
  }
  //会话转接。
  await transferCustomer(param).then((res) => {
    if (res && res.code == '0') {
      //会话转接成功
      useChatListStore().getChatListSingle(translateChangeStore.sessionId)
    }
  })

  translateChangeStore.close()
}
</script>

<style lang="scss" scoped>
.translate-change-style {
  width: 21.625rem;
  height: 16.625rem;
  border-radius: 0.5rem;
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  background-color: #fff;
  z-index: 999;

  .tcs-card {
    padding: 1.25rem;
  }
  .tcs-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .tcs-span-1 {
      font-size: 1rem;
      font-weight: 500;
    }

    .tcs-span-2 {
      font-size: 0.875rem;
      color: #fbc901;
    }
  }

  .tcs-content {
    width: 19.125rem;
    height: 4.75rem;
    border: 1px solid #e4e4e4;
    border-radius: 1rem;
    margin-top: 1.25rem;
    padding: 0.625rem;
    display: flex;
    flex-direction: row;

    .tcs-user-content {
      img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 4px;
      }
    }

    .tsc-user-base {
      margin-left: 0.625rem;
      .span1 {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .span2 {
        color: #101010;
        font-size: 0.75rem;
      }
    }
  }

  .tcs-remark {
    margin-top: 1.25rem;
    .tcs-span-3 {
      font-size: 0.875rem;
    }
  }

  .tcs-bottom {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1.25rem;
  }
}
</style>
