<template>
  <div class="customer-control-box">
    <customer_partment />
    <div style="width: 1.25rem; height: 90vh; background-color: var(--xr-color-bg)"></div>
    <CustomerList />
  </div>
</template>

<script lang="ts" setup>
import CustomerList from './component/customer_control/customer-list..vue'
import customer_partment from './component/customer_control/customer_partment.vue'
</script>

<style lang="scss" scoped>
.customer-control-box {
  display: flex;
  flex-direction: row;
}
</style>
