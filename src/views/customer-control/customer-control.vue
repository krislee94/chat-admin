<template>
  <div class="customer-control-box">
    <SettingTitle :title="$t('t_customer_control_title')" />

    <main>
      <div class="setting-main">
        <!-- <游戏列表>-->
        <div class="game-list-box">
          <LeftGameList @choose="queryInfo" />
        </div>

        <!-- <游戏管理>-->
        <div class="customer-control-detail">
          <RightCustomer ref="rightCustomerRef" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import SettingTitle from '@/views/setting/component/setting-title.vue'
import LeftGameList from '@/views/customer-control/component/left-game-list.vue'
import RightCustomer from '@/views/customer-control/component/right-customer.vue'
import { ref } from 'vue'

const rightCustomerRef = ref()

const queryInfo = (value: string) => {
  rightCustomerRef.value.queryCustomerList({ merchantId: value })
}
</script>

<style lang="scss" scoped>
.customer-control-box {
  width: 96.5vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    height: 86vh;
    min-height: 67.5rem;
    display: flex;
    flex-direction: row;
    .game-list-box {
      width: 18vw;
      height: 86vh;
      min-width: 18rem;
      background-color: #fff;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      padding-top: 1rem;
    }

    .customer-control-detail {
      height: 86vh;
      width: 76vw;
      min-width: 56.25rem;
      background-color: #fff;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      padding: 1rem;
    }
  }
}
</style>
