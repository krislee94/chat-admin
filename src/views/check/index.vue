<template>
  <div class="check-box">
    <checkTabs />
  </div>
</template>

<script lang="ts" setup>
import checkTabs from './components/check-tabs.vue'
</script>

<style lang="scss" scoped>
.check-box {
  width: 96.5vw;
  height: 100vh;
  background-color: #f4f5f8;
  padding: 1.25rem;
  :deep(.el-form-item .cell) {
    font-size: 0.875rem;
    font-weight: 500;
    color: #434343;
  }
}
</style>
