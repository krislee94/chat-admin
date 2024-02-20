<!--聊天记录列表查询-->
<template>
  <div class="chat-history-box">
    <span class="history-title">{{ $t('CHECKMODULE.session_record') }}</span>

    <div style="width: 100%; height: 2rem"></div>

    <!--    会话记录-->
    <el-scrollbar class="chat-content">
      <div v-if="props.sensitiveType">
        <div class="bottom-style">
          <div class="click-more color-ac" v-if="!upLoadFlag" @click="_queryUp()">
            {{ $t('CHECKMODULE.click_more') }}
          </div>

          <div class="click-more color-gray" v-if="upLoadFlag">
            {{ $t('CHECKMODULE.no_more') }}
          </div>
        </div>
      </div>
      <div v-for="item in chatMessage" :key="item.id">
        <div style="height: 1rem"></div>

        <!--左-->
        <div class="sender-box" v-if="item?.senderInfo?.userType === UserType.User">
          <span class="time-style">{{ timeUtil2(item.sendTime) }}</span>
          <div class="flex row">
            <img
              :src="item?.senderInfo?.headerImgUrl"
              class="default-header-img"
              v-img-error:headerImgUrl-employee
            />
            <div class="sender-box2 customer-box">
              <div class="sender-text">
                <LeftPop
                  :text="item?.body ?? ''"
                  :show-type="item?.msgType ?? 'TEXT'"
                  translationText=""
                  :withdraw="false"
                  :single-trans="item?.translationText ?? ''"
                />
              </div>
            </div>
          </div>
        </div>
        <div style="height: 1rem"></div>
        <!--右 -->
        <div
          class="geter-box"
          v-if="
            item?.senderInfo?.userType && item?.senderInfo?.userType == UserType.CustomerService
          "
        >
          <span class="time-style">{{ timeUtil2(item?.sendTime) }}</span>
          <div class="flex row">
            <div class="geter-box2 customer-box">
              <RightPop
                :text="item?.body ?? ''"
                :show-type="item?.msgType ?? 'TEXT'"
                :withdraw="false"
                :record="item?.recordFileKeys ?? []"
                single-trans=""
              />
            </div>
            <img
              :src="item?.senderInfo.headerImgUrl"
              class="default-header-img"
              v-img-error:headerImgUrl-user
            />
          </div>
        </div>
        <!-- 系统消息-->
        <div class="system-info-box" v-if="item?.senderInfo?.userType === UserType.System">
          <span style="border-radius: 2rem; padding: 0 1rem">{{ item.body }}</span>
        </div>
      </div>

      <!--      点击加载更多-->
      <div class="bottom-style">
        <div class="click-more color-ac" v-if="!isLoadAll" @click="_query({ sortType: 'GT' })">
          {{ $t('CHECKMODULE.click_more') }}
        </div>

        <div class="click-more color-gray" v-if="isLoadAll">
          {{ $t('CHECKMODULE.no_more') }}
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ISessionChatRecordRequest, SessionChatRecordResponse } from '@/server/check_request'
import { queryHistoryRecord, RecordSQLKeyword } from '@/server/check_request'
import { UserType } from '@/server/session_request'
import RightPop from '@/components/chat-pop/right-pop.vue'
import LeftPop from '@/components/chat-pop/left-pop.vue'
import { timeUtil2 } from '@/utils/timeUtil'
//聊天记录
const chatMessage = ref<SessionChatRecordResponse[]>([])
const recordId = ref<string>()
//向下加载
const isLoadAll = ref(false)
//向上加载
const upLoadFlag = ref(false)
//定义props/
const props = defineProps({
  sessionId: {
    type: String
  },
  recordId: {
    type: String
  },
  sensitiveType: {
    type: Boolean,
    default: false
  }
})

watch(
  () => props.recordId,
  (newValue) => {
    console.log('----------------->', newValue)
    recordId.value = newValue
  }
)

onMounted(async () => {
  console.log('-------', props)
  if (props && props.recordId) {
    recordId.value = props.recordId
  }
  //敏感词监管
  if (props?.sensitiveType && props?.recordId) {
    await _query()
    // await _queryUp({ recordId: props.recordId })
  } else {
    //会话监管
    await _query()
  }
})

/**
 * 向下
 * @param item
 */
const _query = async (item?: { sortType?: RecordSQLKeyword | string; keyword?: string }) => {
  if (chatMessage.value && chatMessage.value.length > 0) {
    recordId.value = chatMessage.value[chatMessage.value.length - 1].id
  }
  const param: ISessionChatRecordRequest = {
    sessionId: props.sessionId || '1684077540558811137',
    recordId: recordId.value,
    size: 20,
    keyword: item && item.keyword ? item.keyword : '',
    recordSqlKeyword: item && item.sortType ? item.sortType : RecordSQLKeyword.Ge
  }
  await queryHistoryRecord(param).then((res) => {
    if (res && res.code == '0') {
      if (res.data && res.data.length > 0) {
        const arr: any = []
        res.data.forEach((item) => {
          arr.push(item)
        })

        chatMessage.value = chatMessage.value?.concat(arr)
      } else {
        isLoadAll.value = true
      }
    }
  })
}

// _query()
const _queryUp = async (item?: any) => {
  if (chatMessage.value && chatMessage.value.length > 0) {
    recordId.value = chatMessage.value[0].id
  }
  const param: ISessionChatRecordRequest = {
    sessionId: props.sessionId || '1684077540558811137',
    recordId: item && item?.recordId ? item?.recordId : recordId.value,
    size: 20,
    keyword: item && item.keyword ? item.keyword : '',
    recordSqlKeyword: RecordSQLKeyword.Lt
  }
  await queryHistoryRecord(param).then((res) => {
    if (res && res.code == '0') {
      if (res.data && res.data.length > 0) {
        res.data.forEach((item) => {
          chatMessage.value.unshift(item)
        })
      } else {
        upLoadFlag.value = true
      }
    }
  })
}
</script>

<style scoped lang="scss">
.chat-history-box {
  width: 50vw;
  height: 60vh;
  min-width: 46.25rem;
  min-height: 38.75rem;
  border-radius: 1rem;
  //border: 1px solid red;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;

  padding: 1rem;

  .history-title {
    font-size: 1rem;
    font-weight: 500;
    color: #333333;
  }

  .chat-content {
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    background: #fafbfd;
    padding: 1rem;
  }
  .geter-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    // align-items: center;
    .geter-box2 {
      //width: 60%;
      min-width: 10rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    img {
      margin-top: 4px;
    }
  }

  .sender-box2 {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .customer-box {
    cursor: pointer;
  }

  .sender-box {
    //widows: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .sender-text {
      max-width: 60%;
    }
    img {
      margin-top: 4px;
    }
  }
  .system-info-box {
    width: 100%;
    min-height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 0.75rem;
      color: #8c8c8c;
      line-height: 1.375rem;
      background-color: #f5f5f5;
    }
  }
  .time-style {
    font-size: 12px;
    color: #ced6e0;
  }

  .bottom-style {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    .click-more {
      width: 10rem;
      height: 2rem;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      font-size: 14px;
    }

    .color-ac {
      color: #0d6efd;
    }
    .color-gray {
      color: #ced6e0;
    }
  }
}
</style>
