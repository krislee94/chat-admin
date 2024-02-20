<template>
  <div class="flex message-search-box">
    <el-input
      v-model="inputValue"
      :placeholder="$t('t_p_keyword_search')"
      @keydown.enter="queryInfo"
    >
      <template #append>
        <el-button :icon="Search"></el-button>
      </template>
    </el-input>

    <div v-if="messageData && messageData.length < 1" style="margin-top: 4rem">
      <SearchEmpty />
    </div>

    <div v-if="messageData && messageData.length > 0">
      <div v-for="item in messageData" :key="item.id" class="content-box">
        <!--        {{item.senderInfo.}}-->
        <!--        头像-->
        <div class="content-left-box flex row alignCenter">
          <img :src="item?.senderInfo?.headerImgUrl" alt="" />
        </div>
        <!--        昵称， -->
        <div class="flex column content-right-box">
          <div class="flex row">
            <span class="span1">{{ item?.senderInfo?.name }}</span>
            <span class="span1" style="margin-left: 0.5rem">{{ timeUtil3(item?.sendTime) }}</span>
          </div>

          <div>
            <span class="span3">{{ splitPreStr(item.body) }}</span>
            <span class="span2">{{ inputValue }}</span>
            <span class="span3">{{ splitPreEnd(item.body) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SearchEmpty from '@/components/svg/search-empty.vue'

import { queryCsHistoryRecord } from '@/server/session_request'
import type { ISessionChatRecordRequest, SessionChatRecordResponse } from '@/server/session_request'

import { useMessageStore } from '@/stores'

import { timeUtil3 } from '@/utils/timeUtil'
// import

const messageStore = useMessageStore()
const messageData = ref<SessionChatRecordResponse[]>([])

const inputValue = ref('')

const queryInfo = () => {
  if (!inputValue.value) return
  if (!messageStore.sessionId) return
  const param: ISessionChatRecordRequest = {
    keyword: inputValue.value,
    sessionId: messageStore.sessionId
  }
  queryCsHistoryRecord(param).then((res) => {
    if (res && res.code == '0') {
      messageData.value = res?.data || []
    }
  })
}

const splitPreStr = (str: string) => {
  // if(str.indexOf(`${inputValue.value}`) )
  console.log(str.split(`${inputValue.value}`)[0])
  const num = str.indexOf(`${inputValue.value}`)
  if (num == 0) {
    return ''
  }
  return str.split(`${inputValue.value}`)[0]
}

const splitPreEnd = (str: string) => {
  console.log(str.split(`${inputValue.value}`)[1])
  const num = str.indexOf(`${inputValue.value}`)

  if (num == str.length) {
    return ''
  } else {
    return str.split(`${inputValue.value}`)[1]
  }
}

watch(
  () => inputValue.value,
  (n) => {
    if (!n) {
      messageData.value = []
    }
  }
)
</script>

<style scoped lang="scss">
.message-search-box {
  flex-direction: column;
  //padding: 1rem;
  padding: 0 1rem 1rem 1rem;

  .content-box {
    width: 100%;
    height: 3.625rem;
    //padding: 0.5rem;
    //border: 1px solid red;
    border: 1px solid #f5f5f5;
    border-radius: 0.5rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-top: 0.375rem;

    .content-left-box {
      height: 100%;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 4px;
      }
    }

    .content-right-box {
      margin-left: 1rem;
    }

    .span1 {
      font-size: 12px;
      color: #dfe4ea;
    }
    .span2 {
      font-size: 12px;
      color: #70a1ff;
    }
    .span3 {
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
