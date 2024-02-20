<template>
  <div class="role-control-style">
    <Menu />
    <div class="setting-component-box">
      <settingTitle title="角色管理" />
      <main class="main-style">
        <!-- 角色列表 -->
        <div class="flex role-query-style row">
          <div class="flex row role-input-style">
            <span>角色名称</span>

            <el-input v-model="roleName" clearable @keydown.enter.native="query" />
          </div>

          <div class="flex row alignCenter func-role-box">
            <div class="box-redo" @click="reset">
              <icon-park type="redo" theme="outline" size="20" fill="#C2C6CE" />
            </div>

            <div class="cursor-pointer blue-box" @click="query">
              <!-- <search theme="outline" size="24" fill="#333"/> -->
              <icon-park type="search" theme="outline" size="20" fill="#fff" />
            </div>

            <div class="cursor-pointer add-box" @click="addFunc">
              <!-- <plus theme="outline" size="24" fill="#333"/> -->
              <icon-park type="plus" theme="outline" size="20" fill="#fff" />
            </div>
          </div>
        </div>

        <el-table :header-cell-style="headerCellStyle" :data="data" style="margin-top: 1.37rem">
          <el-table-column label="角色ID" prop="id" />
          <el-table-column label="角色名称" prop="name" />
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="更新人ID" prop="updateBy" />
          <el-table-column label="操作">
            <template #default="scope">
              <div class="flex cursor-pointer row alignCenter" style="height: 100%">
                <IconVue
                  iconType="edit-two"
                  @tClick="editorModal(scope.row)"
                  style="margin-right: 1rem"
                />

                <PopIconDel :title="$t('GAME.sure_del')" @confirm="sureDel(scope.row)" />

                <IconVue
                  iconType="eyes"
                  @tClick="showDetail(scope.row)"
                  style="margin-left: 1rem"
                  size="18"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>

        <PaginationVue
          :total="pageRef.total"
          :page="pageRef.pageNo"
          :limit="pageRef.pageSize"
          @pagination="query"
        />
      </main>
    </div>

    <AddOrUpdateModal ref="addorupdate" @confirm="query" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import Menu from '@/components/setting/menu.vue'
import settingTitle from '@/views/setting/component/setting-title.vue'
import { IconPark } from '@icon-park/vue-next/es/all'
//表头
import { headerCellStyle } from '@/server/table'
import {
  rolePage,
  IRoleListRequest,
  PageResponseRoleResponse,
  RoleResponse,
  deleteRole,
  roleDetail
} from '@/server/role_request'
import IconVue from '@/components/iconOpt/icon.vue'
import PopIconDel from '@/components/popconfirm/popIcon.vue'
import AddOrUpdateModal from './component/addOrUpate.vue'
import { messageSuccess } from '@xr-util/xr-ui'
import PaginationVue from '@/components/pagination/index.vue'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
//page

const pageRef = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})
const data = ref<RoleResponse[]>([])
const addorupdate = ref()

//角色名称
const roleName = ref()

//重置
const reset = () => {
  roleName.value = ''
}
//新增角色
const addFunc = () => {
  addorupdate.value.open()
}

//更新
const editorModal = (item?: RoleResponse) => {
  // = =这里查询一下详情再打开
  if (item && item.id) {
    roleDetail({
      id: item.id + ''
    }).then((res) => {
      if (res && res.code == '0') {
        addorupdate.value.open(res.data, 1)
      }
    })
  }
}
//删除
const sureDel = async (item?: RoleResponse) => {
  console.log(item)
  if (item && item.id) {
    //确认删除角色
    await deleteRole({
      id: item.id + ''
    }).then((res) => {
      if (res && res.code == '0') {
        messageSuccess($t('t_role_del_success'))
      }
    })
    //查询列表
    await query({ pageNo: 1, pageSize: 10 })
  }
}
//查看详情
const showDetail = (item?: RoleResponse) => {
  if (item && item.id) {
    roleDetail({
      id: item.id + ''
    }).then((res) => {
      if (res && res.code == '0') {
        addorupdate.value.open(res.data, 2)
      }
    })
  }
}

//查询
const query = async (item?: any) => {
  const param: IRoleListRequest = {
    pageNo: item?.pageNo || pageRef.pageNo,
    pageSize: item?.pageSize || pageRef.pageSize,
    name: roleName.value
  }
  await rolePage(param).then((res) => {
    if (res && res.code == '0') {
      data.value = res.data?.dataList ?? []
      pageRef.total = Number(res.data?.total) ?? 0
      pageRef.pageNo = Number(res.data?.pageNo) ?? 1
      pageRef.pageSize = Number(res.data?.pageSize) ?? 10
    }
  })
}

const init = () => {
  query()
}
init()
</script>

<style lang="scss" scoped>
.role-control-style {
  display: flex;
  flex-direction: row;
  height: 100vh;
  .main-style {
    width: 100%;
    height: 95%;
    background: #fff;
    padding: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 100);
    margin-top: 1.25rem;
  }

  .setting-component-box {
    width: 83.4vw;
    height: 100vh;
    background-color: var(--xr-color-bg);
    padding: 1.25rem;
  }
  .role-query-style {
    align-items: center;
    justify-content: space-between;

    .role-input-style {
      min-width: 20.5rem;
      align-items: center;
      span {
        display: inline-block;
        font-size: 0.875rem;
        font-weight: 500;
        min-width: 6.25rem;
      }
    }
    .blue-box {
      padding: 0.3125rem 0.3125rem 0.2rem 0.3125rem;
      background: #2c71f4;
      border-radius: 4px;
    }
  }
  .box-redo {
    padding: 0.3125rem 0.3125rem 0.2rem 0.3125rem;
    border: 1px solid #c2c6ce;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .func-role-box {
    justify-content: space-around;
    width: 10rem;
  }
  .add-box {
    width: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c71f4;
    height: 100%;
    padding-top: 0.4225rem;
    padding-bottom: 0.4225rem;
    border-radius: 4px;
  }
}
</style>
