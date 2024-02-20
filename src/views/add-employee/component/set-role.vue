<template>
  <div class="customer-role-style">
    <!-- <div class="flex row role-base">
      <div v-for="item in roleListRef" class="role-box" @click="chooseRole(item)">
        <span>{{ item.name }}</span>
      </div>
    </div> -->
    <div class="outer-box">
      <div class="cursor-pointer add-box" @click="addFunc">
        <!-- <plus theme="outline" size="24" fill="#333"/> -->
        <icon-park type="plus" theme="outline" size="20" fill="#fff" />
      </div>
    </div>

    <div class="has-choose-box">
      <div class="flex row">
        <div v-for="item in hasChooseRoleList" class="has-choose-item">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 坐席 -->
    <div v-if="permissionSetRef.includes('im:cs')" style="margin-top: 2rem">
      <span v-t="'USER.name'" class="span-style"></span>

      <div style="margin-top: 1.5rem">
        <el-form :model="form" :inline="true" label-position="left" :rules="cnInfoRule">
          <el-form-item :label="$t('EMPLOYEE.nickname')" prop="nickName" class="role-set-item">
            <el-input v-model="form.nickName" class="base-width" />
          </el-form-item>

          <el-form-item :label="$t('EMPLOYEE.grade')" prop="csLevel" class="role-set-item">
            <el-select v-model="form.csLevel" class="base-width">
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
    </div>

    <div class="flex row f-row">
      <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
      <el-button type="primary" @click="sureFunc">{{ $t('COMMON.confirm') }}</el-button>
    </div>

    <roleListChoose ref="roleListChooseRef" @confirm="roleChooseConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue'
import { RoleResponse, queryPermissionByRoleIds } from '@/server/role_request'
import { CSLevel, CSPermission, IBaseEmployeeDetailResponse } from '@/server/customer_request'
import { gameList, IGameListRequestParam, IGameListItem } from '@/server/game_request'
import { FormRules } from 'element-plus'
import { IconPark } from '@icon-park/vue-next/es/all'
import roleListChoose from './role-list-choose.vue'
import { PropType } from 'vue'
import router from '@/router'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const props = defineProps({
  roleInfo: {
    type: Object as PropType<IBaseEmployeeDetailResponse> | any,
    required: true
  }
})

const emit = defineEmits(['confirm'])

const roleListChooseRef = ref()

//角色列表
const roleListRef = ref<RoleResponse[]>([])
//已选择列表
const hasChooseRoleList = ref<RoleResponse[]>([])

//权限列表
const permissionSetRef = ref<string[]>([])

const gameListRef = ref<IGameListItem[]>([])
//
const form = reactive({
  nickName: '',
  csLevel: '',
  merchantIdList: [] as any,
  enable: false
})

watch(
  () => props.roleInfo,
  (newValue, _) => {
    console.log(newValue)
    if (newValue) {
      const csPermission = newValue.csPermission

      form.csLevel = csPermission?.csLevel ?? ''
      form.nickName = csPermission?.nickName ?? ''
      form.enable = csPermission?.enable ?? false

      //塞入权限列表
      permissionSetRef.value = newValue?.permissionList ?? []
      //塞入角色列表
      hasChooseRoleList.value = newValue?.roleList ?? []

      if (csPermission && csPermission?.merchantList) {
        form.merchantIdList = csPermission?.merchantList.map((item: { id: any }) => {
          return item.id
        })
      }
    }
  }
)

//查询游戏

const _queryMerchantList = () => {
  gameList({
    pageNo: 1,
    pageSize: 100
  }).then((res) => {
    if (res && res.code == '0') {
      gameListRef.value = res.data?.dataList ?? []
    }
  })
}

_queryMerchantList()

//--------------------------------添加-------------------------------
const addFunc = () => {
  roleListChooseRef.value.open(hasChooseRoleList.value)
}

//--------------------------const----------------------------------
const cnInfoRule = reactive<FormRules>({
  nickName: [{ required: true, message: 'required' }],
  csLevel: [{ required: true, message: 'required' }],
  merchantIdList: [{ required: true, message: 'required' }]
})
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

const roleChooseConfirm = (item: any) => {
  //选择内容
  hasChooseRoleList.value = item.info

  if (item.info) {
    const arr = item.info.map((res: { id: any }) => {
      return res.id ? res.id : ''
    })

    if (arr && arr.length == 0) {
      form.enable = false
      return
    }

    //查询角色列表
    queryPermissionByRoleIds({
      ids: arr
    }).then((res) => {
      if (res && res.code == '0') {
        permissionSetRef.value = res.data.permissionCodeList || []

        if (res.data.permissionCodeList?.includes('im:cs')) {
          form.enable = true
        }
      }
    })
  }
}

const cancel = () => {
  router.back()
}

//确定的方法
const sureFunc = () => {
  //权限
  let csPermission: CSPermission = {
    //@ts-ignore
    csLevel: form.csLevel || null,
    enable: permissionSetRef.value.includes('im:cs'),
    nickName: form.nickName,
    merchantIdList: form.merchantIdList,
    tempCs: false
  }
  //角色
  let roleIdList: string[] = []
  if (hasChooseRoleList.value && hasChooseRoleList.value.length > 0) {
    roleIdList = hasChooseRoleList.value.map((item) => {
      return item.id + ''
    })
  }

  emit('confirm', {
    csPermission,
    roleIdList
  })
}
</script>

<style lang="scss" scoped>
.customer-role-style {
  width: 100%;
  min-height: 19.875rem;
  background-color: #fff;
  margin-top: 20px;

  .outer-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
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

  .role-base {
    width: 100%;
    justify-content: space-around;

    .role-box {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 4px;
      min-width: 7.5rem;
      height: 1.875rem;
      border: 1px solid rgb(187, 187, 187);
      font-size: 0.875rem;
      color: #101010;
    }

    .role-box:hover {
      background-color: var(--xr-light-blue);
      border: none;
      border-radius: 4px;
    }
  }

  .has-choose-box {
    display: flex;
    flex-direction: column;
    .has-choose-item {
      min-width: 7.5rem;
      height: 1.875rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--xr-light-blue);
      margin-left: 1rem;
      border-radius: 4px;
    }
  }

  .span-style {
    font-size: 1rem;
    font-weight: 500;
  }
  .f-row {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
