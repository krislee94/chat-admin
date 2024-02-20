<template>
  <div class="setting-component-box">
    <settingTitle :title="$t('EMPLOYEE.employee_control_title')" />
    <!-- 设置主内容加载在这里(= =) -->
    <main>
      <div class="setting-main">
        <CustomerControl />
        <!-- <fastReply v-else-if="hasSessionPermission" />
        <gameIn v-else-if="hasGameInPermission" /> -->
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import settingTitle from './setting-title.vue'
import CustomerControl from '../customer-control.vue'
// import fastReply from './fast-reply.vue'
// import gameIn from '../game-in.vue'

const title = ref('')

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 96.5vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    height: 86vh;
  }
}
</style>
