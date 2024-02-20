<template>
  <el-dialog v-model="visible" :title="title" width="30%" @close="cancel">
    <div class="j-row-center">
      <span>{{ $t('EMPLOYEE.cate_name') }}：</span>
      <el-input v-model="typeValue" class="elinput" size="default" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
        <el-button type="primary" @click="confirm"> {{ $t('COMMON.confirm') }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch, ref, PropType, getCurrentInstance } from 'vue'
import { messageWarning } from '@xr-util/xr-ui'
import { EmployeeGroupResponse } from '@/server/customer_group'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
//来自父类的props
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: 'Tips'
  },
  groupInfo: {
    type: Object as PropType<EmployeeGroupResponse>
  }
})
//来自监听方法
const emit = defineEmits(['cancel', 'confirm'])

const visible = ref(props.show)
const typeValue = ref('')

const title = ref(props.groupInfo ? $t('EMPLOYEE.edit_cate') : $t('EMPLOYEE.add_cate'))

//监听dialogVisble.
watch(
  () => props.show,
  (newValue, _) => {
    console.log(newValue, _)
    visible.value = newValue
  }
)
watch(
  () => props.groupInfo,
  (newValue, _) => {
    typeValue.value = newValue?.name ?? ''
  }
)

const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  if (!typeValue.value) {
    messageWarning('请输入分类内容')
    return
  }
  if (props.groupInfo && props.groupInfo.id) {
    const param = {
      id: props.groupInfo.id,
      name: typeValue.value,
      sort: '0'
    }
    //触发更新方法
    emit('confirm', param)
  } else {
    //触发新增的方法
    emit('confirm', typeValue.value)
  }
}
</script>

<style lang="scss" scoped>
.elinput {
  width: 80%;
}
</style>
