<template>
  <el-dialog v-model="visible" :title="$t('t_role_list_title')" class="dialog-box" width="36%">
    <div class="role-list-box">
      <el-row>
        <el-col :span="12"
          ><div class="left-modal">
            <el-input
              v-model="searchName"
              :prefix-icon="Search"
              :placeholder="$t('t_role_p_name')"
              @keydown.enter.native="queryRoleList"
            />

            <div class="c-box">
              <el-checkbox-group v-model="checkedValue">
                <el-checkbox
                  v-for="item in roleListRef"
                  :key="item.id"
                  :label="item"
                  style="display: flex"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="right-modal">
            <el-checkbox-group v-model="checkedValue">
              <el-checkbox
                v-for="item in checkedValue"
                :key="item.id"
                :label="item"
                style="display: flex"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div></el-col
        >
      </el-row>
    </div>

    <div class="flex cursor-pointer row" style="margin-top: 1rem; justify-content: flex-end">
      <div class="cursor-pointer left-btn" @click="cancel">
        <icon-park type="close" theme="outline" fill="red" />
      </div>

      <div class="cursor-pointer right-btn" @click="sureConfirm">
        <icon-park type="check" theme="outline" fill="#fff" size="20" />
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { rolePage, RoleResponse } from '@/server/role_request'
import { IconPark } from '@icon-park/vue-next/es/all'
const visible = ref(false)

const searchName = ref<string>('')
const roleListRef = ref<RoleResponse[]>([])
const checkedValue = ref<any[]>([])

const emit = defineEmits(['confirm'])

const open = (hasRoleList?: RoleResponse[]) => {
  visible.value = true
  console.log(hasRoleList)
  if (hasRoleList && hasRoleList.length > 0) {
    checkedValue.value = hasRoleList.map((item) => {
      //@ts-ignore
      item.permissionTreeResponse = null
      return item
    })
  }

  console.log('checkedValue:', checkedValue.value)
}

defineExpose({ open })

//----------------------------查询角色列表----------------------------------
const queryRoleList = async () => {
  //查询角色列表
  await rolePage({
    pageNo: 1,
    pageSize: 99,
    name: searchName.value
  }).then((res) => {
    if (res && res.code == '0') {
      //角色列表
      roleListRef.value = res.data?.dataList ?? []
    }
  })
}

queryRoleList()

const cancel = () => {
  visible.value = false
}

const sureConfirm = () => {
  emit('confirm', {
    info: checkedValue.value
  })
  visible.value = false
}
</script>

<style lang="scss" scoped>
.dialog-box {
  padding: 1rem;
  border-radius: 8px;
  .role-list-box {
    width: 100%;
    min-height: 30rem;
    border: 1px solid #bdc3c7;
    border-radius: 0.5rem;
  }

  .left-modal {
    height: 30rem;
    padding: 1rem;
    border-right: 1px solid #bdc3c7;
  }
  .right-modal {
    padding: 1rem;
  }

  .c-box {
    margin-top: 1rem;
    overflow-y: auto;
  }
}
</style>
