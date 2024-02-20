<template>
  <div class="j-row">
    <div class="setting-component-box">
      <settingTitle :title="$t('GAME.zidingyi')" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <div class="setting-main">
          <!-- 智能分配 -->
          <div class="every-item j-column base-content">
            <div class="j-row">
              <span class="title">{{ $t('GAME.zhineng') }}</span>
              <span class="tag j-center" v-t="$t('GAME.system_default')"></span>
            </div>

            <p class="f-span">
              {{ $t('GAME.system_desp') }}
            </p>
          </div>

          <!-- -->
          <div class="every-item j-column base-content" style="min-height: 7.875rem">
            <div class="j-row">
              <span class="title" v-t="'GAME.kehudengji'"></span>
            </div>

            <p class="f-span" v-t="'GAME.dengji_desp'"></p>

            <div class="j-row-center" style="margin-top: 0.625rem">
              <span style="font-size: 0.875rem">{{ $t('GAME.func_add') }}：</span>
              <el-switch v-model="value1" @change="_levelSwitchChange" />
            </div>

            <!-- 加载内容 -->
            <div v-if="value1" style="margin-top: 1.25rem">
              <el-table
                :data="state.levelData"
                style="width: 100%"
                :header-cell-style="headerCellStyle"
                v-if="state.levelData.length > 0"
              >
                <el-table-column :label="$t('GAME.customer_level')">
                  <template #default="scope">
                    <span>{{ formatCs(scope.row.csLevel) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('GAME.user_level')">
                  <template #default="scope">
                    <div class="j-row-center">
                      <span
                        v-for="item in formatUserList(scope.row.userLevelList)"
                        class="user-level-style j-center"
                        >{{ item.label }}</span
                      >
                    </div>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('COMMON.opt')">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="_editorLevel(scope.row)">
                      {{ $t('COMMON.editor') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <!-- 客户登记 -->
          <div class="every-item j-column base-content" style="min-height: 7.875rem">
            <div class="j-row">
              <span class="title" v-t="'GAME.zhiding'"></span>
            </div>

            <p class="f-span" v-t="'GAME.zhiding_desp'"></p>

            <div class="j-row-center" style="margin-top: 0.625rem">
              <span style="font-size: 0.875rem">{{ $t('GAME.func_add') }}：</span>
              <el-switch v-model="value2" @change="_userSwitchChange" />
            </div>

            <!-- 加载内容 -->
            <div v-if="value2">
              <el-divider />
              <div class="j-row-center j-row-between" style="margin-bottom: 1rem">
                <el-button @click="_addModal">{{ $t('GAME.add_zhiding') }}</el-button>
                <div>
                  <el-select v-model="keyword" style="width: 6vw">
                    <el-option
                      v-for="item in queryCondition"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                  /></el-select>
                  <el-input
                    style="width: 20vw"
                    v-model="state.employeeName"
                    @keyup.enter="_queryUserDistributionList"
                  />
                </div>
              </div>

              <el-table
                :data="state.userData"
                style="width: 100%"
                :header-cell-style="headerCellStyle"
              >
                <el-table-column :label="$t('GAME.user_id')" prop="userId" />
                <el-table-column :label="$t('GAME.user_nickname')" prop="userNickName" />
                <el-table-column :label="$t('GAME.customer_short_id')" prop="employeeShortId" />
                <el-table-column :label="$t('GAME.customer_name')" prop="employeeName" />
                <el-table-column :label="$t('COMMON.opt')">
                  <template #default="scope">
                    <Popconfirm :title="$t('GAME.sure_del')" @confirm="_sureDel(scope.row)" />
                  </template>
                </el-table-column>
              </el-table>

              <Pagination
                :total="pageRef.total"
                :limit="pageRef.pageSize"
                :page="pageRef.pageNo"
                @pagination="_queryUserDistributionList"
              />
            </div>
          </div>
        </div>
      </main>
    </div>

    <editorLevel
      :show="state.editorLevelFlag"
      :info="state.currentItem"
      @cancel="_cancelLevel"
      @confirm="_editorLevelConfirm"
    />

    <addUserRule :show="state.addUserFlag" @cancel="_cancelAddModal" @confirm="confirmToAdd" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick, getCurrentInstance } from 'vue'
import settingTitle from '@/views/setting/component/setting-title.vue'
import MenuVue from '@/components/setting/menu.vue'
import { headerCellStyle } from '@/server/table'
import Popconfirm from '@/components/popconfirm/index.vue'
import Pagination from '@/components/pagination/index.vue'
import addUserRule from './component/add-user-rule.vue'
import {
  gameDetail,
  switchLevelRule,
  IMerchantDistSwitchRequest,
  queryDistributionRuleList,
  MerchantDistLevelResponse,
  queryPageUserRule,
  IMerchantDistPageUserRuleRequest,
  MerchantDistUserResponse,
  switchUserRule,
  initLevelData,
  IMerchantDistLevelEditRequest,
  formatUserList,
  editDistributionRule,
  addUserRuleDistribution,
  IMerchantDistUserAddRequest,
  delUserRuleDistribution,
  CSLevel
} from '@/server/game_request'

import { useRouter } from 'vue-router'
import { messageError, messageSuccess } from '@xr-util/xr-ui'
import editorLevel from './component/editor-level.vue'
import { _ } from '@xr-util/util'
//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

interface IStateParam {
  data: Object
  levelData: MerchantDistLevelResponse[]
  userData: MerchantDistUserResponse[]
  employeeName: string
  editorLevelFlag: boolean
  addUserFlag: boolean
  currentItem: IMerchantDistLevelEditRequest
}
const router = useRouter()

const queryCondition = [
  {
    label: $t('GAME.customer_short_id'),
    value: 'employeeShortId'
  },
  {
    label: $t('GAME.customer_name'),
    value: 'employeeName'
  },
  {
    label: $t('GAME.user_id'),
    value: 'userId'
  },
  {
    label: $t('GAME.user_nickname'),
    value: 'userNickName'
  }
]

const state: IStateParam = reactive({
  data: {},
  levelData: [],
  userData: [],
  employeeName: '',
  editorLevelFlag: false,
  addUserFlag: false,
  currentItem: {}
})

const pageRef = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})
let merchantId = ''
onMounted(() => {
  console.log(router.currentRoute.value.params.id)
  if (router.currentRoute.value.params.id) {
    merchantId = router.currentRoute.value.params.id + ''
    //查询当前应用详情
    _detail(router.currentRoute.value.params.id + '')
  } else {
    messageError('未查询到应用ID')
    router.back()
  }
})
//客户登记匹配
const value1 = ref(false)
//指定客户坐席
const value2 = ref(false)
//关键字
const keyword = ref('employeeShortId')

//查询详情
const _detail = async (id: string) => {
  await gameDetail({ id: id }).then((res) => {
    if (res && res.code == '0') {
      state.data = res.data ? res.data : {}
      value1.value = res.data?.distributionLevelSwitch || false
      value2.value = res.data?.distributionUserSwitch || false

      if (res.data?.distributionLevelSwitch) {
        //查询
        _queryLevelDistributionList()
      }
      if (res.data?.distributionUserSwitch) {
        //查询
        _queryUserDistributionList(null)
      }
    }
  })
}

/**
 * 用户和坐席分配开关
 * @param val
 */
const _userSwitchChange = async (val: boolean) => {
  value2.value = val
  const param: IMerchantDistSwitchRequest = {
    merchantId: merchantId,
    enable: val
  }
  await switchUserRule(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('修改成功')
    }
  })
  if (val) {
    await _queryUserDistributionList(null)
  }
}
/**
 * 用户等级和坐席等级分配
 */
const _levelSwitchChange = async (val: boolean) => {
  value1.value = val
  const param: IMerchantDistSwitchRequest = {
    merchantId: merchantId,
    enable: val
  }
  await switchLevelRule(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('修改开关成功')
    }
  })
  if (val) {
    await _queryLevelDistributionList()
  }
}

//用户等级和坐席等级分配
const _queryLevelDistributionList = async () => {
  await queryDistributionRuleList({ id: merchantId }).then((res) => {
    if (res && res.code == '0') {
      state.levelData = res.data ? res.data : []
      if (res.data && res.data.length < 3) {
        let data: any = initLevelData()
        for (let i = 0; i < data.length; i++) {
          res.data.forEach((item) => {
            if (item.csLevel == data[i].csLevel) {
              data[i] = item
            }
          })
        }
        state.levelData = data
      }
      //按初 中 高 排序
      state.levelData = _.sortBy(state.levelData, function (o) {
        return o.csLevel
      })
    }
  })
}
//用户和坐席分配
const _queryUserDistributionList = async (param: any) => {
  const obj: IMerchantDistPageUserRuleRequest = {
    pageNo: param && param.pageNo ? param.pageNo : pageRef.pageNo,
    pageSize: param && param.pageSize ? param.pageSize : pageRef.pageSize,
    merchantId: merchantId
  }
  if (state.employeeName && keyword.value) {
    //@ts-ignore
    obj[`${keyword.value}`] = state.employeeName
  }

  console.log(obj)
  await queryPageUserRule(obj).then((res) => {
    if (res && res.code == '0') {
      state.userData = res.data?.dataList || []
      pageRef.pageNo = Number(res.data?.pageNo) || 1
      pageRef.pageSize = Number(res.data?.pageSize) || 10
      pageRef.total = Number(res.data?.total) || 0
    }
  })
}

//点击确认框
const _editorLevelConfirm = async (item: any) => {
  await editDistributionRule(item).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('成功')
    }
  })
  _cancelLevel()
  await _queryLevelDistributionList()
}

//确认删除
const _sureDel = async (item: any) => {
  if (item && item.id) {
    await delUserRuleDistribution({ id: item.id }).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('删除成功')
      }
    })

    await _queryUserDistributionList(null)
  }
}

/**
 * 点击确认按钮。 确认添加
 */
const confirmToAdd = async (item: any) => {
  //   employeeShortId,userId
  if (item && item.employeeShortId && item.userId) {
    const param: IMerchantDistUserAddRequest = {
      employeeShortId: item.employeeShortId,
      userId: item.userId,
      merchantId: merchantId
    }
    await addUserRuleDistribution(param).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('添加成功')
      }
    })

    await _queryUserDistributionList(null)
  } else {
    messageError('缺少参数')
  }
  _cancelAddModal()
}

//---------------------------- 不调用接口(私有方法) -------------------------------

const _editorLevel = async (item: MerchantDistLevelResponse) => {
  await nextTick(() => {
    _setCurrent(item)
  }).then(() => {
    state.editorLevelFlag = true
  })
}
const _setCurrent = async (item: MerchantDistLevelResponse) => {
  state.currentItem = item
  state.currentItem.merchantId = merchantId
}
const _cancelLevel = () => {
  state.currentItem = {}
  state.editorLevelFlag = false
}
const _addModal = () => {
  state.addUserFlag = true
}
const _cancelAddModal = () => {
  state.addUserFlag = false
}

const formatCs = (val: string) => {
  if (val == CSLevel.Level10) {
    return $t('GAME.primary')
  } else if (val == CSLevel.Level20) {
    return $t('GAME.intermediate')
  } else if (val == CSLevel.Level30) {
    return $t('GAME.advanced')
  } else {
    return 'unknow'
  }
}
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 96.5vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    min-height: 90vh;
  }
  .every-item {
    min-height: 6rem;
    margin-bottom: 1.25rem;
    .title {
      font-size: 1.125rem;
      color: #434343;
      line-height: 22px;
    }
    .tag {
      min-width: 3.75rem;
      height: 1.25rem;
      background: rgba(140, 140, 140, 0.1);
      border-radius: 2px 2px 2px 2px;
      height: 18px;
      font-size: 0.75rem;
      margin-left: 12px;
      padding: 0.375rem;
    }
    .f-span {
      font-size: 0.875rem;
      color: #bfbfbf;
      margin-top: 10px;
    }
  }
  .user-level-style {
    background-color: rgba(13, 110, 253, 0.1);
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 2px;
    margin-left: 4px;
    font-size: 0.75rem;
    color: #434343;
    display: flex;
  }
}
</style>
