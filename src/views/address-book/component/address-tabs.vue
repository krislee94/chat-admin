<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
    style="--el-tabs-header-height: 6vh"
  >
    <el-tab-pane label="Zalo" name="zalo"></el-tab-pane>
    <!-- <el-tab-pane label="facebook" name="facebook"></el-tab-pane> -->
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('zalo')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name)
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  padding-left: 1rem;
}
</style>
