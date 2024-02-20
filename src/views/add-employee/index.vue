<template>
  <div class="j-row">
    <div class="setting-component-box">
      <settingTitle :title="title" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <div class="setting-main">
          <div class="base-info-style base-content">
            <h3>{{ $t('EMPLOYEE.base_info') }}</h3>
            <el-form
              :inline="true"
              label-position="left"
              style="margin-top: 20px"
              :rules="rules"
              ref="ruleFormRef"
              :model="form"
            >
              <el-form-item :label="$t('EMPLOYEE.name')" prop="name" class="employee-base-item">
                <el-input v-model="form.name" class="base-width" />
              </el-form-item>
              <!-- 性别 -->
              <el-form-item :label="$t('EMPLOYEE.gender')" prop="sex" class="employee-base-item">
                <el-select v-model="form.sex" class="base-width">
                  <el-option
                    v-for="item in sexyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('EMPLOYEE.date_of_birth')" class="employee-base-item">
                <el-date-picker
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  v-model="form.birthday"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                :label="$t('EMPLOYEE.account')"
                prop="accountName"
                class="employee-base-item"
              >
                <el-input v-model="form.accountName" class="base-width" id="inputAccount" />
              </el-form-item>

              <el-form-item
                :label="$t('EMPLOYEE.password')"
                prop="password"
                class="employee-base-item"
              >
                <el-button
                  type="primary"
                  link
                  v-if="!isShowPassword"
                  @click="_changgePassword"
                  class="base-width"
                  >{{ $t('COMMON.change_password') }}</el-button
                >
                <el-input
                  v-model="form.password"
                  class="base-width"
                  v-if="isShowPassword"
                  type="password"
                  id="inputPassword"
                />
              </el-form-item>
              <el-form-item :label="$t('EMPLOYEE.phone')" prop="phone" class="employee-base-item">
                <el-input v-model="form.phone" class="base-width" />
              </el-form-item>
              <el-form-item
                :label="$t('EMPLOYEE.blone')"
                prop="groupList"
                class="employee-base-item"
              >
                <el-select v-model="form.groupIdList" multiple class="base-width">
                  <el-option
                    v-for="item in customerGroupStore.customerGroup"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('t_belone')" prop="gameList" class="employee-base-item">
                <el-select v-model="form.merchantIdList" multiple class="base-width">
                  <el-option
                    v-for="item in gameListRef"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div class="role-info-style base-content">
            <h3 v-t="'EMPLOYEE.role_setting'"></h3>
            <setRole @confirm="_sureAdd" :role-info="employeeDetail" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import settingTitle from '@/views/setting/component/setting-title.vue'
import setRole from './component/set-role.vue'
import { reactive, ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import { useCustomerGroupStore } from '@/stores'
import {
  IEmployeeAddRequestV3Param,
  customerAdd,
  customerDetail,
  IBaseEmployeeDetailResponse,
  customerUpdate,
  IEmployeeEditRequestV2Param
} from '@/server/customer_request'

import { gameList } from '@/server/game_request'

import { FormRules, FormInstance } from 'element-plus'
// import customerRole from './component/customer-role.vue'
import { messageSuccess } from '@xr-util/xr-ui'
import { useRouter } from 'vue-router'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const router = useRouter()
interface IFormParam {
  name: string
  sex: number
  birthday: string
  accountName: string
  password?: string
  phone: string
  groupIdList: string[]
  merchantIdList?: string[]
}

const customerGroupStore = useCustomerGroupStore()
customerGroupStore.getCustomerGroup()

const ruleFormRef = ref<FormInstance>()

const form: IFormParam = reactive({
  name: '',
  sex: 0,
  accountName: '',
  password: '',
  phone: '',
  birthday: '',
  groupIdList: [],
  remark: '',
  merchantIdList: []
})
//游戏列表
const gameListRef = ref<any[]>([])
//角色列表
const roleListRef = ref<any[]>([])

const title = ref<string>($t('EMPLOYEE.add_employee'))
const isShowPassword = ref<boolean>(true)
let employeeId: any = null

let employeeDetail = ref<IBaseEmployeeDetailResponse>()

const rules = reactive<FormRules>({
  name: [{ required: true, message: $t('BUSINESS.p_e_staff_name'), trigger: 'blur' }],
  accountName: [
    {
      required: true,
      message: $t('BUSINESS.p_e_account')
    }
  ],
  sex: [{ required: true, message: $t('BUSINESS.p_e_grade') }],
  phone: [{ required: true, message: $t('BUSINESS.p_e_phone') }],
  password: [{ required: true, message: $t('BUSINESS.p_e_password') }]
})

//--------------------------生命周期--------------------------------------

onMounted(() => {
  employeeId = router.currentRoute.value.params.employeeId
  if (employeeId && employeeId != 'new') {
    //编辑
    title.value = $t('EMPLOYEE.editor_employee')
    isShowPassword.value = false
    nextTick(() => {
      _detail(employeeId)
    })
  } else {
    //FIXED
    nextTick(() => {
      document.getElementById('inputAccount')?.setAttribute('disabled', 'true')
      document.getElementById('inputPassword')?.setAttribute('disabled', 'true')
      setTimeout(() => {
        document.getElementById('inputAccount')?.removeAttribute('disabled')
        document.getElementById('inputPassword')?.removeAttribute('disabled')
      }, 1000)
    })
  }
})

//----------------------------------------------------------------

/**
 * 点击确认的方法
 */
const _sureAdd = (item: any) => {
  if (employeeId == 'new') {
    //新增
    const param: IEmployeeAddRequestV3Param = {
      ...form,
      csPermission: item.csPermission,
      roleIdList: item.roleIdList || []
    }
    customerAdd(param).then((res) => {
      if (res && res.code == '0') {
        messageSuccess($t('BUSINESS.add_success'))
      }
      router.back()
    })
  } else {
    //编辑
    if (!form.password) {
      delete form.password
    }
    const paramEditor = {
      id: employeeId,
      ...form,
      csPermission: item.csPermission,
      roleIdList: item.roleIdList || []
    }
    customerUpdate(paramEditor).then((res) => {
      if (res && res.code == '0') {
        messageSuccess($t('BUSINESS.update_success'))
      }
      router.back()
    })
  }
}

//----------------------------查询详情------------------------------------
const _detail = (id: string) => {
  //员工详情
  customerDetail({ id: id }).then((res) => {
    if (res && res.code == '0') {
      form.name = res.data?.name ?? ''
      form.sex = res.data?.sex ?? 0
      form.phone = res.data?.phone ?? ''
      form.birthday = res.data?.birthday ?? ''
      form.accountName = res.data?.accountName ?? ''
      form.groupIdList = res.data?.groupList?.map((item) => item.id + '') || []
      // form.merchantIdList = res.data?.csPermission?.merchantList?.map(item => item.id) ?? []
      employeeDetail.value = res.data ? res.data : undefined

      form.merchantIdList = res.data?.merchantIdList ?? []
    }
  })
}

//----------------------------修改密码------------------------------------
const _changgePassword = () => {
  isShowPassword.value = !isShowPassword.value
}
//----------------------------查询游戏列表---------------------------------
const queryGameList = async () => {
  await gameList({
    pageNo: 1,
    pageSize: 99
  }).then((res) => {
    if (res && res.code == '0') {
      gameListRef.value = res.data?.dataList ?? []
    }
  })
}
queryGameList()

//----------------------------constant------------------------------------
const sexyList = [
  {
    id: '1',
    label: $t('COMMON.male'),
    value: 1
  },
  {
    id: '2',
    label: $t('COMMON.female'),
    value: 0
  }
]
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 96.7vw;
  min-height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    min-height: 90vh;

    .base-info-style {
      min-height: 13.5rem;
    }

    .role-info-style {
      min-height: 20.875rem;
      margin-top: 1.25rem;
    }

    .employee-base-item {
      min-width: 16vw;
      .base-width {
        width: 100%;
      }
    }
  }
}
/* 日期选择框的宽度 */
:deep(.el-date-editor.el-input) {
  width: 100%;
}
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
