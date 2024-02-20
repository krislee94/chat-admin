<template>
  <el-tabs
    v-model="activeName"
    class="chat-tabs"
    @tab-click="handleClick"
    style="--el-tabs-header-height: 41px"
  >
    <el-tab-pane label="All" name="all"></el-tab-pane>
    <el-tab-pane label="Zalo" name="zalo"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

//选择的activeName
const activeName = ref<any>('all')

//注册监听事件
const emit = defineEmits(['change'])

//处理
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab?.props?.name && tab?.props?.name != activeName.value) {
    activeName.value = tab?.props?.name ?? ''
    emit('change', activeName.value)
  }
}

defineExpose({
  activeName
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  padding-left: 1rem;
}
</style>
