<!-- 会话监管-->
<template>
  <div class="check-box-main base-content">
    <!-- 检索条件 -->
    <el-row :gutter="30" style="display: flex; align-items: flex-end">
      <el-col :span="6"
        ><div class="j-cloumn">
          <span class="check-span" v-t="'CHECKMODULE.session_time'"></span>
          <el-date-picker
            v-model="form.timeData"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('COMMON.start')"
            :end-placeholder="$t('COMMON.end')"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span" v-t="'CHECKMODULE.user_nick'"></span>
          <el-input
            v-model="pageReqRef.userName"
            :placeholder="$t('BUSINESS.enter_nick_name_query')"
            @keydown.enter="_queryChatList"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span" v-t="'CHECKMODULE.customer_id'"></span>
          <el-input
            v-model="pageReqRef.employeeShortId"
            :placeholder="$t('BUSINESS.enter_for_query')"
            @keydown.enter="_queryChatList"
            type="number"
          /></div
      ></el-col>
      <el-col :span="4"
        ><div class="j-cloumn">
          <span class="check-span" v-t="'CHECKMODULE.customer_name'"></span>
          <el-input
            v-model="pageReqRef.employeeName"
            :placeholder="$t('BUSINESS.enter_name_query')"
            @keydown.enter="_queryChatList"
          /></div
      ></el-col>
      <el-col :span="4">
        <div>
          <el-button type="primary" @click="_queryChatList">{{ $t('COMMON.search') }}</el-button>
          <el-button type="info" @click="_reset">{{ $t('COMMON.reset') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table内容 -->
    <div style="margin-top: 1.25rem">
      <el-table :data="state.tableData" max-height="650" :header-cell-style="headerCellStyle">
        <el-table-column fixed prop="sessionId" :label="$t('CHECKMODULE.session_id')" />
        <el-table-column :label="$t('CHECKMODULE.create_time')">
          <template #default="scope">
            <span>{{ timeUtil2(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CHECKMODULE.session_status')">
          <template #default="scope">
            <span :class="statusColor(scope.row)" class="base-span">{{
              statusText(scope.row)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userId" :label="$t('CHECKMODULE.user_id')" />
        <el-table-column prop="userNickName" :label="$t('CHECKMODULE.user_name')" />
        <el-table-column prop="employeeShortId" :label="$t('CHECKMODULE.customer_id')" />
        <el-table-column prop="employeeName" :label="$t('CHECKMODULE.customer_name')" />
        <el-table-column prop="employeeNickName" :label="$t('CHECKMODULE.customer_nickname')" />
        <el-table-column :label="$t('CHECKMODULE.end_time')">
          <template #default="scope">
            <span>{{ scope.row.endTime ? timeUtil2(scope.row.endTime) : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('CHECKMODULE.operation')">
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
      @pagination="_queryChatList"
    />

    <!--    <chatModal :show="state.isShow" :session-id="state.currentSessionId" @cancel="_cancelModal" />-->
    <DialogChatHistory ref="dialogChatHistory" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { headerCellStyle } from '@/server/table'
import { checkChat, SessionByChatRecordResponse, StatusList } from '@/server/check_request'
import { timeUtil2 } from '@/utils/timeUtil'
import DialogChatHistory from '@/components/chatHistory/dialog-chat-history.vue'
import Pagination from '@/components/pagination/index.vue'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
//定义组件
const dialogChatHistory = ref()

const form = reactive({
  timeData: ''
})
watch(
  () => form.timeData,
  (newValue) => {
    console.log(newValue)
    if (newValue && newValue.length > 0) {
      pageReqRef.createStartTime = timeUtil2(newValue[0])
      pageReqRef.createEndTime = timeUtil2(newValue[1])
    } else if (!newValue) {
      pageReqRef.createStartTime = ''
      pageReqRef.createEndTime = ''
    }
  }
)
interface IStateParam {
  tableData: SessionByChatRecordResponse[]
  isShow: boolean
  currentSessionId: string
}

const state: IStateParam = reactive({
  tableData: [],
  isShow: false,
  currentSessionId: ''
})
const pageReqRef: any = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  userName: '',
  employeeShortId: '',
  employeeName: '',
  createStartTime: '',
  createEndTime: ''
})

const _queryChatList = (param: any) => {
  pageReqRef.pageNo = param && param.pageNo ? param.pageNo : pageReqRef.pageNo
  pageReqRef.pageSize = param && param.pageSize ? param.pageSize : pageReqRef.pageSize
  checkChat(pageReqRef).then((res) => {
    if (res && res.code == '0') {
      state.tableData = res.data?.dataList ?? []
      pageReqRef.total = Number(res.data?.total) || 0
      pageReqRef.pageNo = Number(res.data?.pageNo) || 1
      pageReqRef.pageSize = Number(res.data?.pageSize) || 10
    }
  })
}
_queryChatList(null)

const statusColor = (item: any) => {
  if (item && item.status) {
    switch (item.status) {
      case StatusList.CSAccess:
        return 'cs-access'
      case StatusList.End:
        return 'text-end'
      case StatusList.UserAccess:
        return 'user-access'
      default:
        return ''
    }
  }
}
const statusText = (item: any) => {
  switch (item.status) {
    case StatusList.CSAccess:
      return $t('BUSINESS.in_progress')
    case StatusList.End:
      return $t('BUSINESS.over')
    case StatusList.UserAccess:
      return $t('BUSINESS.pending')
    default:
      return $t('BUSINESS.unknown')
  }
}
/**
 * 重置
 */
const _reset = () => {
  form.timeData = ''
  pageReqRef.userName = ''
  pageReqRef.employeeShortId = ''
  pageReqRef.employeeName = ''
  pageReqRef.createStartTime = ''
  pageReqRef.createEndTime = ''
}
const _queryRecord = (item: any) => {
  // state.isShow = true
  state.currentSessionId = item.sessionId
  dialogChatHistory.value.open({
    sessionId: item.sessionId
  })
}
</script>

<style lang="scss" scoped>
.check-box-main {
  margin-top: 1.125rem;
  height: 84vh;

  .check-span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #434343;
    margin-bottom: 0.5rem;
  }
  .base-span {
    min-width: 4.125rem;
    height: 1.5rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cs-access {
    background-color: rgba(255, 112, 41, 0.1);
    color: rgba(255, 112, 41, 1);
  }
  .text-end {
    background-color: rgba(67, 67, 67, 0.1);
    color: rgba(67, 67, 67, 1);
  }
  .user-access {
    background-color: rgba(216, 30, 6, 0.1);
    color: rgba(216, 30, 6);
  }
}
:deep(.el-form-item .cell) {
  font-size: 0.875rem;
  font-weight: 500;
  color: #434343;
}
</style>
