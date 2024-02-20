<template>
  <div class="setting-title-box">
    <div class="title">{{ props.title }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.setting-title-box {
  .title {
    color: var(--xr-main-title-color);
    font-size: 1.125rem;
    font-weight: 500;
  }
}
</style>
