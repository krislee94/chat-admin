<template>
  <div style="position: relative">
    <el-dialog
      v-model="visible"
      :title="$t('xr_share_title')"
      width="40%"
      align-center
      style="min-height: 55vh; border-radius: 8px"
    >
      <div class="transfer-docker-sty">
        <el-row>
          <el-col :span="12" class="user-choose">
            <el-table
              ref="multipleTableRef"
              :data="listStore.chatList"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column :label="$t('CHECKMODULE.user_nick')">
                <template #default="scope">
                  <div class="flex row user-style">
                    <img :src="scope.row?.userInfo?.headerImgUrl" v-img-error:headerImgUrl-user />
                    <span>{{ scope.row?.userInfo?.nickName ?? '' }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div style="position: relative">
              <span
                >{{ $t('xr_has_choose') }} {{ selectedValue.length }}
                {{ $t('xr_session_name') }}</span
              >
              <div class="user-has-choose">
                <div class="user-style choose-style" v-for="item in selectedValue">
                  <img :src="item.userInfo?.headerImgUrl" v-img-error:headerImgUrl-user />
                  <span>{{ item?.userInfo?.nickName ?? '' }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <span class="dialog-footer">
          <el-button @click="visible = false" size="small">{{ $t('COMMON.cancel') }}</el-button>
          <el-button type="primary" size="small" @click="sureTransferMessage">
            {{ $t('COMMON.confirm') }}
          </el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { useChatListStore } from '@/stores'
import {
  SessionListByCSResponse,
  transferMsg,
  IMessageForwardRequest,
  MsgType
} from '@/server/session_request'
import { messageSuccess } from '@xr-util/xr-ui'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const listStore = useChatListStore()

const props = defineProps({
  recordId: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    required: true
  }
})

const visible = ref(false)
const selectedValue = ref<SessionListByCSResponse[]>([])

const sureTransferMessage = async () => {
  if (selectedValue.value.length < 1) {
    visible.value = false
    return
  }
  let sessionIds: string[] = []

  selectedValue.value.forEach((item) => {
    if (item.sessionId) {
      sessionIds.push(item.sessionId)
    }
  })

  let param = {
    messageType: MsgType.MergeMsg,
    recordIds: [`${props.recordId}`],
    sessionIds
  }

  //@ts-ignore
  await transferMsg(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.success'))
      visible.value = false
    }
  })
}

const handleSelectionChange = (val: SessionListByCSResponse[]) => {
  selectedValue.value = val
}

//打开
const open = () => {
  visible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.transfer-docker-sty {
  width: 100%;
  height: 40vh;
  padding: 0 1rem 1rem 1rem;
  border: 1px solid #bbb;
  border-radius: 0.5rem;
  box-sizing: border-box;

  .user-choose {
    height: 39vh;
    overflow-y: auto;
  }
}
.user-style {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 1.875rem;
    height: 1.875rem;
  }
  span {
    font-size: 0.875rem;
    color: #333;
    margin-left: 10px;
  }
}
.choose-style {
  padding-left: 1rem;
  margin-bottom: 10px;
}

.user-has-choose {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 36vh;
  overflow-y: auto;
  width: 100%;
}
.dialog-footer {
  margin-top: 1vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
