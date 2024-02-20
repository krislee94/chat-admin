<template>
  <div class="customer_partment_box base-content default-list-height">
    <el-button type="primary" @click="addCustomer">{{ $t('EMPLOYEE.add_cate') }}</el-button>

    <AddCustomerType
      :show="show"
      @cancel="cancelModal"
      @confirm="_addOrUpdate"
      :title="state.title"
      :groupInfo="state.currentItem"
    />

    <div v-for="item in state.data" class="type-box" @click="setGroup(item)">
      <div class="j-row-center">
        <i class="iconfont icon-customer-type">&#xe609;</i>
        <span style="margin-left: 8px">{{ item.name }}</span>
      </div>

      <el-popover trigger="click" :width="50">
        <template #reference>
          <i class="iconfont icon-customer-type">&#xe6a7;</i>
        </template>

        <template #default>
          <div class="j-column-center">
            <div class="pop-bg" @click="addCustomer(item)">
              <el-button link>{{ $t('COMMON.rename') }}</el-button>
            </div>
            <el-popconfirm :title="$t('EMPLOYEE.del_cate_title')" @confirm="sureDel(item)">
              <template #reference>
                <div class="pop-bg">
                  <el-button link>{{ $t('COMMON.del') }}</el-button>
                </div>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import AddCustomerType from './add-customer-type.vue'
import {
  addEmployeeGroup,
  IEmployeeGroupAddRequest,
  employeeGroupList,
  EmployeeGroupResponse,
  editEmployeeGroup,
  delEmployeeGroup
} from '@/server/customer_group'
import { messageSuccess } from '@xr-util/xr-ui'
import { useCustomerGroupStore, usePartmentSearchStore } from '@/stores'

interface IStateParam {
  data: EmployeeGroupResponse[] | undefined
  title: string
  currentItem: EmployeeGroupResponse
}
const customerGroupStore = useCustomerGroupStore()

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const show = ref(false)

const allPartMent: EmployeeGroupResponse[] = [
  {
    id: '',
    name: $t('COMMON.all'),
    sort: 0
  }
]

const state: IStateParam = reactive({
  data: [],
  title: '',
  currentItem: {}
})

//列表
const _query = async () => {
  employeeGroupList({}).then((res) => {
    if (res && res.code == '0') {
      //@ts-ignore
      state.data = allPartMent.concat(res?.data)
      customerGroupStore.setGroup(res.data)
    }
  })
}

// ---------------- init ----------------
_query()

/**
 * 添加分类 - 出现弹窗
 */
const addCustomer = (item: EmployeeGroupResponse) => {
  if (item) {
    state.title = $t('EMPLOYEE.edit_cate')
    state.currentItem = item
  } else {
    state.currentItem = {}
    state.title = $t('EMPLOYEE.add_cate')
  }
  show.value = true
}
const cancelModal = () => {
  show.value = false
}
//新增分类
const _addOrUpdate = async (value: any) => {
  if (!value) return

  if (value && value.id) {
    //更新
    const param = {
      id: value.id,
      name: value.name,
      sort: value.sort
    }
    await editEmployeeGroup(param).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('更新成功')
      }
    })
  } else if (value && !value.id) {
    //请求接口
    const param: IEmployeeGroupAddRequest = {
      name: value
    }
    await addEmployeeGroup(param).then((res) => {
      if (res.code == '0') {
        messageSuccess('添加分类成功')
      }
    })
  }
  cancelModal()
  //查询列表
  await _query()
}

/**
 * 删除
 *
 * @param item
 */
const sureDel = async (item: EmployeeGroupResponse) => {
  if (!item) {
    return
  }
  //确认删除
  await delEmployeeGroup({ id: item.id }).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('删除成功')
    }
  })
  //查询
  await _query()
}
/**
 * 设置分组
 */
const setGroup = (item: any) => {
  usePartmentSearchStore().setGroupId(item.id)
}
</script>

<style lang="scss" scoped>
.customer_partment_box {
  width: 16.6vw;
}
.type-box {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
}
.type-box:hover {
  background-color: #e5f4ff;
}
.icon-customer-type {
  font-size: 1.5rem;
}
.pop-bg {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop-bg:hover {
  background-color: #e5f4ff;
}
</style>
