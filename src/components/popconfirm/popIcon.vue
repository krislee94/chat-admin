<template>
  <el-popconfirm
    width="220"
    :confirm-button-text="$t('COMMON.yes')"
    :cancel-button-text="$t('COMMON.no')"
    :icon="InfoFilled"
    :icon-color="props.iconColor"
    :title="props.title"
    @cancel="cancel"
    @confirm="confirm"
  >
    <template #reference>
      <icon-park type="delete" theme="outline" size="16" fill="#0d6efd" />
    </template>
  </el-popconfirm>
</template>

<script lang="ts" setup>
import { InfoFilled } from '@element-plus/icons-vue'
import { getCurrentInstance } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  iconColor: {
    type: String,
    required: false,
    default: '#626AEF'
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
})
//添加监听事件
const emit = defineEmits(['cancel', 'confirm'])
//用户点击取消
const cancel = () => {
  emit('cancel')
}
//用户点击确认
const confirm = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped></style>
