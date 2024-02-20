<!-- 敏感词监管 -->
<template>
  <div class="check-sensitive base-content">
    <el-row :gutter="30">
      <el-col :span="6"
        ><div class="j-cloumn">
          <span class="check-span">{{ $t('CHECKMODULE.session_time') }}</span>
          <el-date-picker
            v-model="state.timeData"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('COMMON.start')"
            :end-placeholder="$t('COMMON.end')"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span">{{ $t('CHECKMODULE.customer_name') }}</span>
          <el-input
            v-model="pageReqRef.employeeName"
            :placeholder="$t('BUSINESS.enter_name_query')"
            @keydown.enter="_querySensitive"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span">{{ $t('CHECKMODULE.customer_nickname') }}</span>
          <el-input
            v-model="pageReqRef.csNickName"
            :placeholder="$t('BUSINESS.enter_name_query')"
            @keydown.enter="_querySensitive"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span">{{ $t('CHECKMODULE.user_name') }}</span>
          <el-input
            v-model="pageReqRef.userNickName"
            :placeholder="$t('BUSINESS.enter_nick_name_query')"
            @keydown.enter="_querySensitive"
          /></div
      ></el-col>

      <el-col :span="4">
        <div style="padding-top: 3vh">
          <el-button type="primary" @click="_querySensitive">{{ $t('COMMON.search') }}</el-button>
          <el-button type="info" @click="_reset">{{ $t('COMMON.reset') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <div style="margin-top: 1.25rem">
      <el-table :data="state.tableData" max-height="650" :header-cell-style="headerCellStyle">
        <el-table-column fixed prop="sessionId" :label="$t('CHECKMODULE.session_id')" />
        <el-table-column :label="$t('CHECKMODULE.create_time')">
          <template #default="scope">
            <span>{{ timeUtil2(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="employeeId" :label="$t('CHECKMODULE.customer_id')" />
        <el-table-column prop="employeeName" :label="$t('CHECKMODULE.customer_name')" />
        <el-table-column prop="csNickName" :label="$t('CHECKMODULE.customer_nickname')" />
        <el-table-column prop="userNickName" :label="$t('CHECKMODULE.user_nick')" />
        <el-table-column :label="$t('CHECKMODULE.sensitive')">
          <template #default="scope">
            <!--            {{ formatSensitive(scope.row.sensitiveKeywords) }}-->
            <div class="flex row">
              <span
                v-for="item in Object.keys(scope.row.sensitiveKeywords)"
                :key="item"
                style="margin-left: 2px"
                class="go-click-span"
                @click="checkDetailInfo(item, scope.row)"
                >{{ item }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('COMMON.opt')">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="_queryRecord(scope.row)">
              {{ $t('CHECKMODULE.view_record') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="pageReqRef.total"
      :limit="pageReqRef.pageSize"
      :page="pageReqRef.pageNo"
      @pagination="_querySensitive"
    />

    <!--    <chatModal :show="state.isShow" :session-id="state.currentSessionId" @cancel="_cancelModal" />-->
    <DialogChatHistory ref="dialogChatHistory" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { headerCellStyle } from '@/server/table'
import type { SessionBySkResponse } from '@/server/check_request'
import { checkSensitive } from '@/server/check_request'
import Pagination from '@/components/pagination/index.vue'
import { timeUtil2 } from '@/utils/timeUtil'
import DialogChatHistory from '@/components/chatHistory/dialog-chat-history.vue'

//DialogChatHistory .
const dialogChatHistory = ref()

const pageReqRef: any = reactive({
  employeeName: '',
  csNickName: '',
  userNickName: '',
  pageNo: 1,
  pageSize: 10,
  total: 0,
  createStartTime: '',
  createEndTime: ''
})
const state = reactive({
  tableData: [],
  isShow: false,
  currentSessionId: '',
  timeData: []
})

watch(
  () => state.timeData,
  (newValue: any) => {
    if (newValue) {
      pageReqRef.createEndTime = timeUtil2(newValue[1])
      pageReqRef.createStartTime = timeUtil2(newValue[0])
    } else if (!newValue) {
      pageReqRef.createEndTime = ''
      pageReqRef.createStartTime = ''
    }
  }
)
const _querySensitive = (param: any) => {
  pageReqRef.pageNo = param && param.pageNo ? param.pageNo : pageReqRef.pageNo
  pageReqRef.pageSize = param && param.pageSize ? param.pageSize : pageReqRef.pageSize

  checkSensitive(pageReqRef).then((res) => {
    if (res && res.code == '0') {
      //@ts-ignore
      state.tableData = res?.data?.dataList || []
      pageReqRef.total = Number(res?.data?.total) || 0
      pageReqRef.pageNo = Number(res?.data?.pageNo) || 1
      pageReqRef.pageSize = Number(res?.data?.pageSize) || 10
    }
  })
}
_querySensitive(null)
/**
 * 重置查询条件
 */
const _reset = () => {
  pageReqRef.csNickName = ''
  pageReqRef.userNickName = ''
  pageReqRef.employeeName = ''
  pageReqRef.createStartTime = ''
  pageReqRef.createEndTime = ''
}

const _queryRecord = (item: any) => {
  console.log(item)
  // state.currentSessionId = item.sessionId
  // state.isShow = true

  dialogChatHistory.value.open({
    sessionId: item.sessionId,
    sensitiveType: false,
    recordId: ''
  })
}

const checkDetailInfo = (item: string, info: SessionBySkResponse) => {
  //@ts-ignore
  if (info.sensitiveKeywords && info.sensitiveKeywords[item]) {
    //@ts-ignore
    let value = info.sensitiveKeywords[item]

    if (value) {
      dialogChatHistory.value.open({
        sessionId: info.sessionId,
        recordId: value,
        sensitiveType: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.check-sensitive {
  margin-top: 1.125rem;
  height: 90vh;

  .check-span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #434343;
    margin-bottom: 0.5rem;
  }

  .go-click-span {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
}
</style>
