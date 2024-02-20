<template>
  <div class="check-tabs">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="$t('CHECKMODULE.session_check')" name="first"><checkChat /></el-tab-pane>
      <el-tab-pane :label="$t('CHECKMODULE.mingan_check')" name="second"
        ><checkSensitive
      /></el-tab-pane>

      <el-tab-pane :label="$t('t_replay_check')" name="third"><ReplyCheck /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import checkChat from './check-chat.vue'
import checkSensitive from './check-sensitive.vue'
import ReplyCheck from './reply-check.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped></style>
