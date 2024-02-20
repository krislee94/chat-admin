<template>
  <div v-if="tans.self.visible">
    <el-alert :title="title" type="warning" :close-text="tans.self.selfSecond" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from 'vue'
import { useTranslatChangeStore } from '@/stores'
const tans = useTranslatChangeStore()

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const title1 = $t('xr_now_transfer_desp')
const title2 = $t('xr_now_transfer_sure')
const title = ref()

watch(
  () => tans.self.visible,
  (newValue, _) => {
    if (newValue) {
      title.value = `${title1} ${tans.self.newEmployeeName} , ${title2}`
    }
  }
)
</script>

<style lang="scss" scoped>
:deep(.el-alert__content) {
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
