<template>
  <div class="ac-style">
    <!-- 查询列表 -->
    <el-form>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="$t('t_account_name')">
            <el-input
              v-model="form.userName"
              @keydown.enter.native="thirdQuery"
              :placeholder="$t('t_p_e_account_name')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('t_account')">
            <el-input
              v-model="form.account"
              @keydown.enter.native="thirdQuery"
              :placeholder="$t('t_p_e_account')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('t_phone')">
            <el-input
              v-model="form.phone"
              @keydown.enter.native="thirdQuery"
              :placeholder="$t('t_p_e_phone')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('t_belone')">
            <el-select
              v-model="form.merchantId"
              remote
              filterable
              :remote-method="gameListFunc"
              remote-show-suffix
              reserve-keyword
              :placeholder="$t('t_belone_game_placeholder')"
              style="width: 100%"
            >
              <el-option
                v-for="item in gameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('t_session_distribute')">
            <el-select
              v-model="form.distributionType"
              :placeholder="$t('t_belone_distrubte_placeholder')"
              style="width: 97%"
            >
              <el-option
                v-for="item in distributeType()"
                :label="item.label"
                :value="item.value"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-button @click="_reset">{{ $t('COMMON.reset') }}</el-button>
          <el-button type="primary" @click="thirdQuery">{{ $t('COMMON.search') }}</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- table 表格-->
    <div>
      <el-table :header-cell-style="headerCellStyle" :data="data">
        <el-table-column :label="$t('t_account_name')" prop="userName" />
        <el-table-column :label="$t('t_account')" prop="account" />
        <el-table-column :label="$t('t_phone')" prop="phone" />
        <el-table-column :label="$t('t_belone')" prop="merchantName" />
        <el-table-column :label="$t('t_session_distribute')">
          <template #default="scope">
            <span>{{ _formatDistributionType(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('t_zuoxi')">
          <template #default="scope">
            <span>{{ _formatCsList(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('t_update_time')" prop="updateTime" />
        <el-table-column :label="$t('COMMON.opt')">
          <template #default="scope">
            <!-- <el-button type="primary" link>操作</el-button> -->
            <div class="flex cursor-pointer row alignCenter" style="height: 100%">
              <IconVue
                iconType="edit-two"
                @tClick="editorModal(scope.row)"
                style="margin-right: 1rem"
              />

              <PopIconDel :title="$t('GAME.sure_del')" @confirm="sureDel(scope.row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <PaginationVue
        :total="pageRef.total"
        :page="pageRef.pageNo"
        :limit="pageRef.pageSize"
        @pagination=""
      />
    </div>

    <editorModalVue ref="editorRef" @refresh="thirdQuery" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, reactive } from 'vue'
import { headerCellStyle } from '@/server/table'
import PaginationVue from '@/components/pagination/index.vue'
import {
  thirdAccountPage,
  ThirdApp,
  ThirdAppAccountResponse,
  DistributionType,
  thirdAccountDel
} from '@/server/third_request'

import { gameList, IGameListItem } from '@/server/game_request'

import IconVue from '@/components/iconOpt/icon.vue'
import PopIconDel from '@/components/popconfirm/popIcon.vue'
import editorModalVue from './modal.vue'

import { _ } from '@xr-util/util'
import { messageSuccess } from '@xr-util/xr-ui'

//@ts-ignore i18n
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const editorRef = ref()

const data = ref<ThirdAppAccountResponse[]>([])
const pageRef = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})
const form = reactive({
  userName: '',
  account: '',
  phone: '',
  merchantId: '',
  distributionType: null
})

const gameOptions = ref<IGameListItem[]>([])

//会话分配类型
const distributeType = () => {
  return [
    {
      id: 1,
      label: $t('t_system_distrubute'),
      value: DistributionType.System
    },
    {
      id: 2,
      label: $t('t_zhiding'),
      value: DistributionType.FixCS
    }
  ]
}

const thirdQuery = async (item?: any) => {
  let param = {
    pageNo: item && item.pageNo ? item.pageNo : 1,
    pageSize: item && item.pageSize ? item.pageSize : 10,
    thirdApp: ThirdApp.Zalo
  }

  param = Object.assign(param, form)

  await thirdAccountPage(param).then((res) => {
    if (res && res.code == '0') {
      data.value = res.data.dataList || []
      //page重新赋值
      pageRef.pageNo = Number(res.data.pageNo) || 1
      pageRef.pageSize = Number(res.data.pageSize) || 10
      pageRef.total = Number(res.data.total) || 0
    }
  })
}

const gameListFunc = async (value?: string) => {
  let param = {
    pageNo: 1,
    pageSize: 20,
    merchantName: value || ''
  }
  await gameList(param).then((res) => {
    if (res && res.code == '0') {
      gameOptions.value = res.data.dataList || []
    }
  })
}
//初始化
const init = async () => {
  await thirdQuery()
  await gameListFunc()
}

init()

//确认删除
const sureDel = async (item: ThirdAppAccountResponse) => {
  if (!item?.id) return

  await thirdAccountDel({
    id: item.id + ''
  }).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('t_account_del_success'))
    }
  })

  //刷新页面
  await thirdQuery()
}
//------------------------------------ private ----------------------------
const _formatDistributionType = (item: ThirdAppAccountResponse) => {
  if (item && item.distributionType && item.distributionType == DistributionType.System) {
    return $t('t_system_distrubute')
  } else if (item?.distributionType == DistributionType.FixCS) {
    return $t('t_zhiding')
  }
}
//请求条件重置
const _reset = () => {
  form.userName = ''
  form.account = ''
  form.phone = ''
  form.merchantId = ''
  form.distributionType = null
}

const editorModal = (item: ThirdAppAccountResponse) => {
  editorRef.value.open(item)
}

const _formatCsList = (item: ThirdAppAccountResponse) => {
  if (_.isEmpty(item?.csList)) {
    return '-'
  }

  let str = ''
  //@ts-ignore
  item?.csList.forEach((item, index) => {
    if (item.employeeId && index != 0) {
      str = str + ',' + item.employeeName
    } else {
      str = item.employeeName || ''
    }
  })

  return str
}
</script>

<style lang="scss" scoped>
.ac-style {
  width: 68vw;
  height: 87vh;
  padding-left: 1.25rem;
}
</style>
