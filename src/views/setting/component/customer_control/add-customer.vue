<template>
  <div class="add-customer-box">
    <el-drawer v-model="visible" :title="title" @close="close" :with-header="false">
      <span style="font-size: 1.125rem; font-weight: 500">添加员工</span>
      <el-divider />
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :size="formSize"
        status-icon
        :rules="rules"
        :label-position="labelPosition"
        label-width="100px"
      >
        <span>基础信息</span>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex">
            <el-option
              v-for="item in sexyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="ruleForm.birthday"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="手机号" prop="phone"
          ><el-input v-model="ruleForm.phone" :disable="isDisabled"
        /></el-form-item>

        <span>账号信息</span>

        <el-form-item label="账号" prop="accountName">
          <el-input v-model="ruleForm.accountName" :disable="isDisabled" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-button type="primary" link v-if="isShowPassword" @click="changgePassword"
            >修改密码</el-button
          >
          <el-input v-model="ruleForm.password" type="password" v-if="!isShowPassword" />
        </el-form-item>

        <el-form-item label="角色" prop="roleList">
          <el-select multiple v-model="ruleForm.roleList">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <div v-if="isShow">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" />
          </el-form-item>
          <el-form-item label="坐席等级" prop="csLevel">
            <el-select v-model="ruleForm.csLevel">
              <el-option
                v-for="item in csLevelList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="服务游戏" prop="games">
            <el-select></el-select>
          </el-form-item>
        </div>

        <el-form-item label="所属分组" prop="group">
          <el-select v-model="ruleForm.groupIdList" multiple>
            <el-option
              v-for="item in customerGroupStore.customerGroup"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { roleList, csLevel as csLevelList, sexyList } from '@/api/user'
import { useCustomerGroupStore } from '@/stores'
import { RoleList } from '@/server/customer_request'

const customerGroupStore = useCustomerGroupStore()

const isShow = ref(false)
const ruleFormRef = ref<FormInstance>()
//模块内不可编辑状态控制
const isDisabled = ref(false)
//控制是否展示密码框
const isShowPassword = ref(false)
let ruleForm = reactive({
  name: '',
  sex: '',
  birthday: '2000-01-01',
  phone: '',
  accountName: '',
  //密码
  password: '',
  nickName: '',
  //角色
  roleList: [],
  //服务游戏
  merchantIdList: [],
  //员工分组列表
  groupIdList: [],
  csLevel: null
})

console.log(ruleForm)
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '请输入员工姓名'
    }
  ],
  accountName: [
    {
      required: true,
      message: '请输入账号'
    }
  ],
  // password: [{ required: true, message: '请输入密码' }],
  nickName: [{ required: true, message: '请输入昵称' }],
  roleList: [{ required: true, message: '请选择角色' }],
  csLevel: [{ required: true, message: '请选择坐席等级' }],
  games: [{ required: true, message: '清选择游戏' }]
})

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  employeeInfo: {
    type: Object
  }
})
watch(
  () => props.show,
  (newValue: any, _: any) => {
    visible = newValue
  }
)

watch(
  () => props.employeeInfo,
  (newValue: any, _) => {
    console.log('------', newValue)
    if (newValue && newValue.id) {
      ruleForm = newValue
      isDisabled.value = true
      isShowPassword.value = true
      //联动效果<控制坐席展示游戏分类和昵称等>
      if (
        (newValue && newValue.roleList && newValue.roleList.includes(RoleList.CS)) ||
        newValue.roleList.includes(RoleList.TempCS)
      ) {
        isShow.value = true
      } else {
        isShow.value = false
      }
      //控制分组展示
      if (newValue && newValue.groupList) {
        ruleForm.groupIdList = newValue.groupList.map((item: { id: any }) => item.id)
        console.log(ruleForm.groupIdList)
      }
    } else {
      isDisabled.value = false
      isShowPassword.value = false
      ruleForm = {
        name: '',
        sex: '',
        birthday: '2000-01-01',
        phone: '',
        accountName: '',
        //密码
        password: '',
        nickName: '',
        //角色
        roleList: [],
        //服务游戏
        merchantIdList: [],
        //员工分组列表
        groupIdList: [],
        csLevel: null
      }
    }
  }
)

watch(
  () => ruleForm.roleList,
  (newValue: any, _) => {
    if (newValue && (newValue.includes(RoleList.CS) || newValue.includes(RoleList.TempCS))) {
      isShow.value = true
    } else {
      isShow.value = false
      ruleForm.merchantIdList = []
      ruleForm.csLevel = null
    }
  }
)
const formSize = ref('default')
let title = ref('添加员工')
let visible = ref(false)
const labelPosition = ref('right')
const emit = defineEmits(['close', 'confirm', 'update'])

const close = () => {
  emit('close')
}
//点击确定
const confirmClick = () => {
  if (props.employeeInfo && props.employeeInfo.id) {
    //编辑员工
    emit('update', { info: ruleForm, id: props.employeeInfo.id })
  } else {
    //新增员工
    emit('confirm', ruleForm)
  }
}
const changgePassword = () => {
  isShowPassword.value = false
}
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 24vw;
}
</style>
