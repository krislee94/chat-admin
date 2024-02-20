<template>
  <div class="customer-role-style">
    <!-- 坐席 -->
    <div>
      <div class="close-status j-row j-row-between">
        <div class="j-center">
          <span>{{ $t('EMPLOYEE.setting_for') }}</span>
          <span class="span1 bg1">{{ $t('EMPLOYEE.agent_') }}</span>
        </div>
        <div class="j-center">
          <span class="span2">{{ $t('EMPLOYEE.function_enable') }} &nbsp;</span>
          <el-switch v-model="csInfo.enable" />
        </div>
      </div>
      <div class="open-status" v-if="csInfo.enable">
        <el-form :model="csInfo" :inline="true" label-position="left" :rules="cnInfoRule">
          <el-form-item :label="$t('EMPLOYEE.nickname')" prop="nickName" class="role-set-item">
            <el-input v-model="csInfo.nickName" class="base-width" />
          </el-form-item>

          <el-form-item :label="$t('EMPLOYEE.grade')" prop="csLevel" class="role-set-item">
            <el-select v-model="csInfo.csLevel" class="base-width">
              <el-option
                v-for="item in csLevel"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            :label="$t('EMPLOYEE.game_of_service')"
            prop="merchantIdList"
            class="role-set-item"
          >
            <!-- <> -->
            <el-select v-model="csInfo.merchantIdList" multiple class="base-width">
              <el-option
                v-for="item in state.merchantList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider />

    <!-- 游戏管理员 -->
    <div>
      <div class="close-status j-row j-row-between">
        <div class="j-center">
          <span>{{ $t('EMPLOYEE.setting_for') }}</span>
          <span class="span1 bg2">{{ $t('EMPLOYEE.game_master') }}</span>
        </div>
        <div class="j-center">
          <span class="span2">{{ $t('EMPLOYEE.function_enable') }}: &nbsp;</span>
          <el-switch v-model="gameAdminInfo.enable" />
        </div>
      </div>
      <div class="open-status" v-if="gameAdminInfo.enable">
        <el-form :rules="gameAdminInfoRule" :model="gameAdminInfo">
          <el-form-item
            :label="$t('EMPLOYEE.management_game')"
            prop="merchantId"
            class="role-set-item"
          >
            <el-select
              v-model="gameAdminInfo.merchantId"
              style="width: 20rem"
              :placeholder="$t('EMPLOYEE.p_s_game')"
            >
              <el-option
                v-for="item in state.merchantList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider />

    <!-- 质检员 -->
    <div>
      <div class="close-status j-row j-row-between">
        <div class="j-center">
          <span>{{ $t('EMPLOYEE.setting_for') }}</span>
          <span class="span1 bg3">{{ $t('EMPLOYEE.supervisor') }}</span>
        </div>
        <div class="j-center">
          <span class="span2">{{ $t('EMPLOYEE.function_enable') }} &nbsp;</span>
          <el-switch v-model="checkAdminInfo.enable" />
        </div>
      </div>
      <div class="open-status" v-if="checkAdminInfo.enable">
        <el-form :rules="checkAdmininfoRule" :model="checkAdminInfo">
          <el-form-item
            :label="$t('EMPLOYEE.regulatory_game')"
            prop="merchantIdList"
            class="role-set-item"
          >
            <el-select
              v-model="checkAdminInfo.merchantIdList"
              multiple
              style="width: 20rem"
              :placeholder="$t('EMPLOYEE.p_s_regulatory_game')"
            >
              <el-option
                v-for="item in state.merchantList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-divider />

    <!-- 超级管理员 -->
    <div>
      <div class="close-status j-row j-row-between">
        <div class="j-center">
          <span>{{ $t('EMPLOYEE.setting_for') }}</span>
          <span class="span1 bg4">{{ $t('EMPLOYEE.super_admin') }}</span>
        </div>
        <div class="j-center">
          <span class="span2">{{ $t('EMPLOYEE.function_enable') }} &nbsp;</span>
          <el-switch v-model="superAdminInfo.enable" />
        </div>
      </div>
    </div>

    <div class="boootm-style">
      <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{ $t('COMMON.confirm') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, watch, getCurrentInstance } from 'vue'
import { EmployeeDetailResponse, CSLevel } from '@/server/customer_request'
// import { csLevel } from '@/api/user'
import { gameList, IGameListRequestParam, IGameListItem } from '@/server/game_request'
import { FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { messageWarning } from '@xr-util/xr-ui'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

interface IStateParam {
  merchantList: IGameListItem[]
}
const router = useRouter()
const props = defineProps({
  roleInfo: {
    required: false,
    type: Object as PropType<EmployeeDetailResponse>
  }
})
interface ICSInfoParam {
  enable: boolean
  // 是否启用功能
  nickName?: string | null
  csLevel?: string | null
  // 等级
  merchantIdList: string[]
  tempCs: boolean
}
interface ICheckAdminInfoParam {
  enable: boolean
  // 是否启用功能
  merchantIdList: string[]
}
interface IGameAdminInfoParam {
  enable: boolean
  // 是否启用功能
  merchantId: string | null
}

//坐席信息
const csInfo: ICSInfoParam = reactive({
  enable: false,
  nickName: null,
  csLevel: CSLevel.Level10,
  tempCs: false,
  merchantIdList: []
})
//游戏管理员信息
const gameAdminInfo: IGameAdminInfoParam = reactive({
  enable: false,
  merchantId: null
})

//质检员
const checkAdminInfo: ICheckAdminInfoParam = reactive({
  enable: false,
  merchantIdList: []
})
//超级管理员
const superAdminInfo = reactive({
  enable: false
})

const state: IStateParam = reactive({
  merchantList: []
})
//------------------------监听Props----------------------------------------
watch(
  () => props.roleInfo,
  (newValue, oldValue) => {
    if (newValue) {
      //赋值
      //@ts-ignore
      csInfo.csLevel = newValue.csInfo?.csLevel ?? null
      csInfo.nickName = newValue.csInfo?.nickName ?? ''
      csInfo.merchantIdList = newValue.csInfo?.merchantList?.map((item) => item.id + '') || []
      csInfo.tempCs = newValue.csInfo?.tempCs ?? false
      csInfo.enable = newValue.csInfo?.enable ?? false

      //游戏管理员赋值
      gameAdminInfo.enable = newValue.gameAdminInfo?.enable ?? false
      gameAdminInfo.merchantId = newValue?.gameAdminInfo?.merchant?.id ?? ''

      //质检员赋值
      checkAdminInfo.enable = newValue.checkAdminInfo?.enable ?? false
      checkAdminInfo.merchantIdList =
        newValue.checkAdminInfo?.merchantList?.map((item) => item.id + '') || []

      //超级管理员赋值
      superAdminInfo.enable = newValue.superAdminInfo?.enable ?? false
    }
  }
)

const emit = defineEmits(['cancel', 'confirm'])

// ------------------------- request ----------------------
const _queryMerchantList = () => {
  gameList({
    pageNo: 1,
    pageSize: 100
  }).then((res) => {
    if (res && res.code == '0') {
      state.merchantList = res.data.dataList ? res.data.dataList : []
    }
  })
}

_queryMerchantList()

//-------------------------- 规则 ------------------------------

const cnInfoRule = reactive<FormRules>({
  nickName: [{ required: true, message: '请填写昵称' }],
  csLevel: [{ required: true, message: '请选择坐席等级' }],
  merchantIdList: [{ required: true, message: '请选择服务游戏' }]
})
const gameAdminInfoRule = reactive<FormRules>({
  merchantId: [{ required: true, message: '请选择服务游戏' }]
})
const checkAdmininfoRule = reactive<FormRules>({
  merchantIdList: [{ required: true, message: '请选择服务游戏' }]
})
//------------------------ 方法 -----------------------------
/**
 * 点击取消
 */
const cancel = () => {
  // 返回上一级路由
  router.back()
}
/**
 * 点击确认的方法
 */
const confirm = () => {
  if (!_checkCsInfo()) {
    return
  }
  const param: any = {
    csInfo,
    gameAdminInfo,
    checkAdminInfo,
    superAdminInfo
  }
  //如果 merchantId 为 ‘undfined’. 则设为null
  if (param.gameAdminInfo && param.gameAdminInfo?.merchantId == 'undefined') {
    param.gameAdminInfo.merchantId = null
  }
  emit('confirm', param)
}

const _checkCsInfo = (): boolean => {
  if (csInfo && csInfo.enable) {
    if (!csInfo.nickName) {
      messageWarning('请填写昵称')
      return false
    } else if (!csInfo.csLevel) {
      messageWarning('请选择等级')
      return false
    } else if (csInfo.merchantIdList.length == 0 || !csInfo.merchantIdList) {
      messageWarning('请选择服务游戏')
      return false
    }
  }

  return true
}

// ------------------------------csLevel----------------------------------
const csLevel = [
  {
    id: '1',
    label: $t('GAME.primary'),
    value: CSLevel.Level10
  },
  {
    id: '2',
    label: $t('GAME.intermediate'),
    value: CSLevel.Level20
  },
  {
    id: '3',
    label: $t('GAME.advanced'),
    value: CSLevel.Level30
  }
]
</script>

<style lang="scss" scoped>
.customer-role-style {
  width: 100%;
  background-color: #fff;
  margin-top: 20px;

  .close-status {
    .span1 {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 2.5rem;
      min-height: 1rem;
      text-align: center;
      font-size: 0.5rem;
      padding: 0.1rem 0.4rem;
      border-radius: 0.3rem;
    }
    .bg1 {
      background-color: rgba(13, 110, 253, 0.1);
      color: #0d6efd;
    }
    .bg2 {
      background-color: rgba(47, 202, 100, 0.1);

      color: #2fca64;
    }
    .bg3 {
      background-color: rgba(255, 112, 41, 0.1);
      color: rgba(255, 112, 41, 1);
    }
    .bg4 {
      background-color: rgba(125, 13, 253, 0.1);
      color: rgba(125, 13, 253, 1);
    }
  }

  .open-status {
    margin-top: 1.125rem;
    min-height: 5.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .boootm-style {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 4.5rem;
  }
  .role-set-item {
    min-width: 26vw;
    .base-width {
      width: 100%;
    }
  }
}
</style>
