<template>
  <div class="right-customer-list">
    <el-form :model="formRequest">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-form-item :label="$t('USER.userid')">
            <el-input
              v-model="formRequest.employeeShortId"
              :placeholder="$t('t_p_enter_employee_id')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('EMPLOYEE.nickname')">
            <el-input
              v-model="formRequest.nickName"
              :placeholder="$t('t_p_enter_employee_nickname')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('EMPLOYEE.name')">
            <el-input
              v-model="formRequest.employeeName"
              :placeholder="$t('BUSINESS.p_e_staff_name')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('EMPLOYEE.phone')">
            <el-input v-model="formRequest.employeePhone" :placeholder="$t('t_p_e_phone')" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('EMPLOYEE.grade')">
            <el-select v-model="formRequest.csLevel">
              <el-option
                v-for="item in csLevelList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('t_choose_status')">
            <el-select v-model="formRequest.csStatus">
              <el-option
                v-for="item in csStatusList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="flex row">
            <div class="box-redo" @click="reset">
              <icon-park type="redo" theme="outline" size="20" fill="#C2C6CE" />
            </div>

            <div class="cursor-pointer blue-box" @click="query" style="margin-left: 10px">
              <!-- <search theme="outline" size="24" fill="#333"/> -->
              <icon-park type="search" theme="outline" size="20" fill="#fff" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-divider />

    <!--<坐席数据>-->
    <el-table :header-cell-style="headerCellStyle" :data="data">
      <el-table-column prop="employeeShortId" :label="$t('USER.userid')" />
      <el-table-column prop="nickName" :label="$t('CHAT.nickname')" />
      <el-table-column prop="employeeAccount" :label="$t('EMPLOYEE.account')" />
      <el-table-column prop="employeeName" :label="$t('EMPLOYEE.name')" />
      <el-table-column prop="employeePhone" :label="$t('EMPLOYEE.phone')" />
      <el-table-column :label="$t('EMPLOYEE.grade')">
        <template #default="scope">
          <span v-if="scope.row.csLevel && scope.row.csLevel == CSLevel.Level10">
            {{ $t('GAME.primary') }}
          </span>
          <span v-if="scope.row.csLevel && scope.row.csLevel == CSLevel.Level20">
            {{ $t('GAME.intermediate') }}
          </span>
          <span v-if="scope.row.csLevel && scope.row.csLevel == CSLevel.Level30">
            {{ $t('GAME.advanced') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('t_choose_status')">
        <template #default="scope">
          <span v-if="scope.row.csStatus && scope.row.csStatus == CSStatus.Free">
            {{ $t('t_online') }}
          </span>
          <span v-if="scope.row.csStatus && scope.row.csStatus == CSStatus.Offline">
            {{ $t('t_offline') }}
          </span>
          <span v-if="scope.row.csStatus && scope.row.csStatus == CSStatus.Busy">
            {{ $t('t_busy') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('EMPLOYEE.game_of_service')"
        prop="merchantListString"
      ></el-table-column>

      <el-table-column prop="employeeGroupString" :label="$t('EMPLOYEE.blone')" />

      <el-table-column :label="$t('COMMON.opt')">
        <template #default="scope">
          <IconVue
            iconType="edit-two"
            @tClick="editorModal(scope.row)"
            style="margin-right: 1rem; cursor: pointer"
          />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page="pageRef.pageNo"
      :limit="pageRef.pageSize"
      @pagination="queryCustomerList"
      :total="pageRef.total"
    />

    <CustomerEditor ref="customerEditorRef" @update="queryCustomerList" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue'
import type { IEmployeeCsPageRequest, EmployeeCSPageResponse } from '@/server/cs_request'
import { CSLevel, CSStatus, queryCspage } from '@/server/cs_request'
import { IconPark } from '@icon-park/vue-next/es/all'
import { headerCellStyle } from '@/server/table'
import IconVue from '@/components/iconOpt/icon.vue'
import Pagination from '@/components/pagination/index.vue'
import CustomerEditor from '@/views/customer-control/component/customer-editor.vue'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext?.config?.globalProperties

const customerEditorRef = ref()

const data = ref<EmployeeCSPageResponse[]>([])
//分页效果
const formRequest: IEmployeeCsPageRequest = reactive({
  employeeShortId: '',
  nickName: '',
  employeeName: '',
  employeePhone: '',
  csStatus: null,
  csLevel: null,
  merchantId: ''
})
//分页效果
const pageRef = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})

//等级列表
const csLevelList = [
  {
    id: '4',
    label: $t('COMMON.all'),
    value: null
  },
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

//坐席状态列表
const csStatusList = [
  {
    id: 1,
    label: $t('COMMON.all'),
    value: null
  },
  {
    id: 2,
    label: $t('t_online'),
    value: CSStatus.Free
  },
  {
    id: 3,
    label: $t('t_offline'),
    value: CSStatus.Offline
  },
  {
    id: 4,
    label: $t('t_busy'),
    value: CSStatus.Busy
  }
]

const query = () => {
  queryCustomerList()
}
const reset = () => {
  formRequest.nickName = ''
  formRequest.csStatus = null
  formRequest.csLevel = null
  formRequest.employeePhone = ''
  formRequest.employeeName = ''
  formRequest.employeeShortId = ''
  formRequest.merchantId = ''

  queryCustomerList()
}

//---------------------------------------列表请求-----------------------------------------------------

const queryCustomerList = async (item?: any) => {
  let obj = {
    pageNo: item && item.pageNo ? item.pageNo : pageRef.pageNo,
    pageSize: item && item.pageSize ? item.pageSize : pageRef.pageSize
  }

  formRequest.merchantId = item?.merchantId ?? ''

  let param: IEmployeeCsPageRequest = Object.assign(obj, formRequest)

  const res = await queryCspage(param)

  if (res && res.code == '0') {
    pageRef.pageNo = Number(res.data?.pageNo) || 1
    pageRef.pageSize = Number(res?.data?.pageSize) || 10
    pageRef.total = Number(res.data?.total) || 0

    //给data赋值
    data.value = res.data?.dataList || []
  }
}

queryCustomerList()

/**
 * 编辑员工
 * @param item
 */
const editorModal = (item: EmployeeCSPageResponse) => {
  customerEditorRef.value.open(item)
}

//暴露 查询方法
defineExpose({
  queryCustomerList
})
</script>

<style scoped lang="scss">
.color-offline {
}
.color-online {
}
.color-busy {
}
</style>
