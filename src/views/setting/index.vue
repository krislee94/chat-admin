<template>
  <div class="setting-box">
    <!-- <MenuSetting /> -->
    <settingComponent />
  </div>
</template>

<script lang="ts" setup>
import settingComponent from './component/setting-component.vue'
</script>

<style lang="scss" scoped>
.setting-box {
  display: flex;
  flex-direction: row;
}
</style>
