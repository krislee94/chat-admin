<template>
  <div class="default-list-height base-content">
    <div class="j-row" style="justify-content: space-between">
      <el-button type="primary" @click="addCustomer">{{ $t('EMPLOYEE.add_employee') }}</el-button>
      <div class="search-box">
        <el-select v-model="state.selectValue" style="width: 5vw">
          <el-option
            v-for="opt in options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
            class="select-box"
          />
        </el-select>
        <el-input
          v-model="state.searchValue"
          class="input-box"
          :suffix-icon="Search"
          @keyup.enter="_search({ pageNo: 1 })"
          @blur="_search({ pageNo: 1 })"
          :placeholder="$t('EMPLOYEE.place')"
        />

        <el-button @click="reset" style="margin-left: 1rem">{{ $t('COMMON.reset') }}</el-button>
      </div>
    </div>

    <!-- 坐席列表空 -->
    <div v-if="state.data && state.data.length < 1">
      <EmptyCustomer />
    </div>

    <!-- 坐席列表 -->
    <div v-if="state.data && state.data.length > 0" style="margin-top: 1.25rem">
      <el-table
        :data="state.data"
        style="width: 80vw"
        max-height="500"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="shortId" :label="$t('EMPLOYEE.employee_id')" fixed />
        <el-table-column prop="name" :label="$t('EMPLOYEE.name')" fixed />
        <el-table-column prop="accountName" :label="$t('EMPLOYEE.account')" width="150" />

        <el-table-column prop="" :label="$t('EMPLOYEE.role')" width="340">
          <template #default="scope">
            <!-- <customerTag :role="scope.row.roleList || []" /> -->
            <span>{{ _formatRoleName(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('EMPLOYEE.blone')" width="300">
          <template #default="scope">
            <CustomerGroupTag :group-list="scope.row.groupList || []" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('COMMON.opt')" fixed="right" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="update(scope.row)">{{
              $t('COMMON.editor')
            }}</el-button>
            <PopConfirm :title="$t('EMPLOYEE.sure_del')" @confirm="confirmDel(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :total="state.total"
        :page.sync="state.pageNo"
        :limit.sync="state.pageSize"
        @pagination="_search"
      />
    </div>

    <AddCustomer
      :show="state.addShow"
      @close="closeCustomer"
      @confirm="addCustomerRequest"
      @update="updateCustomerRequest"
      :employee-info="state.currentEditItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, getCurrentInstance } from 'vue'
import EmptyCustomer from '@/components/empty/empty-customer.vue'
import AddCustomer from './add-customer.vue'
import { Search } from '@element-plus/icons-vue'
import { headerCellStyle } from '@/server/table'
// import customerTag from './customer-tag.vue'
import CustomerGameTag from './customer-game-tag.vue'
import CustomerGroupTag from './customer-group-tag.vue'
import Pagination from '@/components/pagination/index.vue'
import PopConfirm from '@/components/popconfirm/index.vue'
import {
  customerList,
  customerAdd,
  IEmployeeListRequestParam,
  EmployeeResponse,
  customerDel,
  customerUpdate,
  IEmployeeEditRequestParam
} from '@/server/customer_request'
import { messageError, messageSuccess } from '@xr-util/xr-ui'
import { useRouter } from 'vue-router'
import { usePartmentSearchStore } from '@/stores'
import { isNumber } from '@/utils/check'

interface IStateParam {
  data: EmployeeResponse[] | undefined
  addShow: boolean
  selectValue: string
  searchValue: string
  pageNo: number
  pageSize: number
  total: number
  currentEditItem: any
}

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const router = useRouter()
const partmentStore = usePartmentSearchStore()
const state: IStateParam = reactive({
  data: [],
  addShow: false,
  selectValue: 'shortId',
  searchValue: '',
  pageNo: 1,
  pageSize: 10,
  total: 0,
  currentEditItem: null
})

watch(
  () => partmentStore.groupId,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)

    _search({ groupId: newValue, pageNo: 1, pageSize: state.pageSize })
  }
)

//-------------  request ------------
const _search = async (param: { pageNo?: any; pageSize?: any; groupId?: string } | undefined) => {
  const req: IEmployeeListRequestParam | any = {
    pageNo: param && param.pageNo ? param.pageNo : state.pageNo,
    pageSize: param && param.pageSize ? param.pageSize : state.pageSize,
    groupId: param && param.groupId ? param.groupId : ''
  }

  //添加搜索选项
  if (state.selectValue && state.searchValue) {
    if (state.selectValue == 'shortId') {
      if (!isNumber(state.searchValue)) {
        messageError('请输入4位短号')
        return
      }
    }
    req[`${state.selectValue}`] = state.searchValue
  }
  //查询员工列表
  await customerList(req).then((res) => {
    if (res && res.code == '0') {
      state.data = res.data?.dataList
      state.pageNo = Number(res.data?.pageNo) || 1
      state.pageSize = Number(res.data?.pageSize) || 2
      state.total = Number(res.data?.total)
    }
  })
}

_search(undefined)

//用户点击确认删除
const confirmDel = async (item: EmployeeResponse) => {
  if (item && item.id) {
    await customerDel({ id: item.id + '' }).then((res) => {
      if (res && res.code == '0') {
        messageSuccess(`删除员工${item.name}成功`)
      }
    })

    await _search(undefined)
  }
}

//新增客服
const addCustomerRequest = async (item: any) => {
  if (!item) return
  await customerAdd(item).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('添加员工成功')
    }
  })
  await _search(undefined)
}

//更新客服
const updateCustomerRequest = async (param: any) => {
  if (param.id) {
    let req: IEmployeeEditRequestParam = {}
    req = param.info
    req.id = param.id
    //@ts-ignore
    await customerUpdate(req).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('更新员工成功')
      }
    })
    closeCustomer()
    await _search(undefined)
  }
}

const reset = () => {
  state.pageNo = 1
  state.pageSize = 10
  state.searchValue = ''

  _search(undefined)
}

//------------------- 私有方法 ------------------------------------------

/**
 * 添加员工
 * 弹出弹窗
 */
const addCustomer = () => {
  // state.addShow = true
  router.push('/employee/add/new')
}
//关闭弹窗监听
const closeCustomer = () => {
  state.currentEditItem = null
  state.addShow = false
}
const update = (item: any) => {
  router.push('/employee/add/' + item.id)
}
//-------------- const ------------
const options = [
  {
    label: $t('EMPLOYEE.employee_id'),
    value: 'shortId'
  },
  {
    label: $t('EMPLOYEE.name'),
    value: 'name'
  },
  {
    label: $t('EMPLOYEE.phone'),
    value: 'phone'
  },
  {
    label: $t('EMPLOYEE.account'),
    value: 'accountName'
  }
]

const _formatRoleName = (item: { roleList: any[] }) => {
  console.log(item)
  if (item && item.roleList) {
    return item.roleList.join(',')
  }

  return '-'
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .input-box {
    width: 15vw;
    background-color: #e5f4ff;
  }
}

:deep(.el-input__suffix:hover) {
  cursor: pointer;
}
</style>
