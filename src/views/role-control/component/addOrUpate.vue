<template>
  <el-drawer v-model="drawer" :title="title" size="90%" destroy-on-close>
    <div class="add-role-all-box">
      <div class="flex row add-role-box alignCenter">
        <span>{{ $t('t_role_name') }}</span>
        <el-input
          v-model="roleName"
          :placeholder="$t('t_role_p_placeholder')"
          :disabled="inputDisabled"
        />
      </div>

      <div style="margin-top: 1.25rem">
        <el-row>
          <el-col :span="1"
            ><span class="role-span"> {{ $t('t_permission_distribute') }}</span></el-col
          >
          <el-col :span="22"
            ><div class="permission-style">
              <el-tree
                ref="treeRef"
                :data="data"
                node-key="id"
                :props="defaultProps"
                show-checkbox
                @check-change="changeTree"
              /></div
          ></el-col>
        </el-row>
      </div>

      <div class="flex row btn-cls">
        <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
        <el-button type="primary" @click="addRoleFunc" v-if="isTypeShow != '3'">{{
          $t('COMMON.confirm')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, PropType, getCurrentInstance, onMounted, nextTick } from 'vue'
import {
  RoleResponse,
  permissionQuery,
  addRole,
  IRoleAddRequest,
  updateRole,
  IRoleEditRequest
} from '@/server/role_request'
import { messageSuccess } from '@xr-util/xr-ui'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const treeRef = ref()
const drawer = ref(false)
const title = ref('')
//树的属性
const defaultProps = ref({
  label: 'name',
  children: 'children'
})
//角色名称
const roleName = ref()
const roleInfo = ref<RoleResponse>()

const data = ref<any>([])
const emit = defineEmits(['confirm'])
//是否可控制 1 可控制 2 不可控制
const inputDisabled = ref(false)
//0 初始化 。1 新增 2 更新 3 查看详情
const isTypeShow = ref('0')

onMounted(() => {
  //查询权限列表
  permissionQuery().then((res) => {
    if (res && res.code == '0') {
      data.value = res.data.permissionTreeList ?? []
    }
  })
})

//打开的方法
const open = (item?: RoleResponse, canControl?: number) => {
  roleName.value = ''
  drawer.value = true

  if (canControl && canControl == 2) {
    inputDisabled.value = true
  }

  if (item) {
    roleInfo.value = item
  }

  if (item && canControl && canControl !== 2) {
    title.value = $t('t_role_update')
    isTypeShow.value = '2'
  } else if (item && canControl && canControl === 2) {
    title.value = $t('t_role_detail_title')
    isTypeShow.value = '3'
  } else {
    title.value = $t('t_role_add')
    isTypeShow.value = '1'
  }

  if (item?.permissionTreeResponse?.permissionTreeList) {
    let arr: string[] = []
    item?.permissionTreeResponse?.permissionTreeList.forEach((item) => {
      if (item.children && item?.children.length > 0) {
        for (let i of item.children) {
          arr.push(i.id)
        }
      } else if (item.id && !item?.children) {
        arr.push(item.id)
      }
    })

    nextTick(() => {
      roleName.value = item?.name ?? ''
      if (arr && arr.length > 0) {
        for (let i of arr) {
          treeRef.value.setChecked(i, true, true)
        }
      }
    })
  }
}
//取消弹窗
const cancel = () => {
  drawer.value = false
}

const changeTree = (item: any, isCheck: boolean) => {
  //如果客服系统接入
  if (!inputDisabled.value) {
    if (item && item.code == 'im:cs' && isCheck) {
      treeRef.value.setChecked('701', true, true)
      treeRef.value.setChecked('704', true, true)
    } else if (item && item.code == 'im:cs' && !isCheck) {
      treeRef.value.setChecked('701', false, true)
      treeRef.value.setChecked('704', false, true)
    }
  }
}

// const setChecked = (key:string, checked:boolean,deep:boolean) => {

// }
//新增角色
const addRoleFunc = () => {
  //permission
  const arr = treeRef.value.getCheckedNodes(false, true)
  if (!roleName.value || arr.length < 1) {
    // messageWarning($t('t_error_p_role_name'))
    return
  }
  let permissionIdList = arr.map((item: { id: any }) => {
    console.log(item)
    return item.id
  })
  //0 初始化 。1 新增 2 更新 3 查看详情
  if (isTypeShow.value == '1') {
    let param: IRoleAddRequest = {
      name: roleName.value,
      permissionIdList
    }

    addRole(param).then((res) => {
      if (res && res.code == '0') {
        emit('confirm')
      }
      drawer.value = false
    })
  } else if (isTypeShow.value == '2') {
    let param: IRoleEditRequest = {
      id: roleInfo.value?.id,
      name: roleName.value || roleInfo.value?.name,
      permissionIdList
    }
    updateRole(param).then((res) => {
      if (res && res.code == '0') {
        messageSuccess($t('t_role_update_success'))
      }
    })
  } else if (isTypeShow.value == '3') {
    //查看详情
  }
}

const eventOnClose = () => {}

//api出去的方法
defineExpose({ open })
</script>

<style lang="scss" scoped>
.add-role-all-box {
  position: relative;
  min-height: 90vh;
  .role-span {
    font-size: 0.875rem;
    color: #101010;
  }
  .add-role-box {
    width: 60%;
    span {
      font-size: 0.875rem;
      width: 5rem;
    }
  }
  .permission-style {
    width: 100%;
    padding: 1rem;
  }

  .btn-cls {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
  }
}

:deep(.el-tree-node .el-tree-node__content) {
  width: 12.5rem;
  height: 4.125rem;
}
:deep(.el-tree-node .el-tree-node__children) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
