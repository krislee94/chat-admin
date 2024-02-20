<template>
  <el-dialog v-model="visible" width="30%" :title="$t('t_account_detail')">
    <el-form v-model="form" label-width="100px">
      <el-form-item :label="$t('t_account_name')">
        <el-input v-model="form.userName" disabled />
      </el-form-item>

      <el-form-item :label="$t('t_account')">
        <el-input v-model="form.account" disabled />
      </el-form-item>

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

      <el-form-item :label="$t('t_session_distribute')">
        <el-select
          v-model="form.distributionType"
          :placeholder="$t('t_belone_distrubte_placeholder')"
          style="width: 100%"
        >
          <el-option
            v-for="item in distributeType()"
            :label="item.label"
            :value="item.value"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('t_zhiding')" v-if="form.distributionType == DistributionType.FixCS">
        <!-- t_p_s_cs -->
        <el-select
          v-model="form.employeeIds"
          multiple
          remote
          filterable
          :remote-method="getCustomerList"
          remote-show-suffix
          reserve-keyword
          style="width: 100%"
        >
          <el-option
            v-for="item in customerOptions"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false"> {{ $t('COMMON.cancel') }}</el-button>
      <el-button type="primary" @click="sureUpdate">{{ $t('COMMON.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import {
  ThirdAppAccountResponse,
  SimpleEmployeeInfo,
  DistributionType,
  thirdAccountUpdate,
  IThirdAppEditRequest
} from '@/server/third_request'

import { gameList, IGameListItem } from '@/server/game_request'

//查询员工列表
import { customerList, EmployeeResponse } from '@/server/customer_request'
import { messageSuccess } from '@xr-util/xr-ui'

//@ts-ignore i18n
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const emit = defineEmits(['refresh'])

const gameOptions = ref<IGameListItem[]>([])
const customerOptions = ref<EmployeeResponse[]>([])

const form = reactive({
  userName: '',
  account: '',
  merchantId: '',
  distributionType: null as any,
  employeeIds: [] as any,
  id: ''
})

const visible = ref(false)

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

const getCustomerList = async (value?: string) => {
  const param = {
    pageNo: 1,
    pageSize: 20,
    name: value || ''
  }

  await customerList(param).then((res) => {
    if (res && res.code == '0') {
      customerOptions.value = res.data?.dataList || []
    }
  })
}

//----------------------------初始化----------------------------------
const init = async () => {
  await gameListFunc()
  await getCustomerList()
}
init()

const open = async (item: ThirdAppAccountResponse) => {
  await clear()
  visible.value = true
  console.log(item)
  if (item?.id) {
    form.id = item.id + ''
  }

  if (item?.userName) {
    form.userName = item.userName
  }
  if (item?.account) {
    form.account = item.account
  }
  if (item?.merchantId) {
    form.merchantId = item.merchantId
  }

  if (item?.distributionType) {
    form.distributionType = item.distributionType
  }

  if (item?.csList && item?.csList.length > 0) {
    item.csList.forEach((r) => form.employeeIds.push(r.employeeId))
  } else {
    form.employeeIds = []
  }
}

defineExpose({ open })

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

// 用户点击确定
const sureUpdate = async () => {
  const param: IThirdAppEditRequest = {
    id: form.id,
    merchantId: form.merchantId,
    employeeIds: form.employeeIds,
    distributionType: form.distributionType
  }

  await thirdAccountUpdate(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('t_account_update_success'))
    }
  })

  visible.value = false

  emit('refresh')
}

const clear = async () => {
  form.id = ''
  form.merchantId = ''
  form.employeeIds = []
  form.account = ''
  form.userName = ''
  form.distributionType = null
}
</script>

<style lang="scss" scoped></style>
