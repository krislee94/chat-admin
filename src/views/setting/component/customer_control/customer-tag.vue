<template>
  <div class="j-row-center">
    <div v-for="item in props.role">
      <div :class="roleStyle(item)" class="role-box j-center m-left-10">
        {{ _format(item) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RoleList } from '@/server/customer_request'

const props = defineProps({
  role: {
    type: Array<string>,
    required: false,
    default: []
  }
})

const _format = (item: string) => {
  if (item == RoleList.CS) {
    return '坐席'
  } else if (item == RoleList.TempCS) {
    return '临时坐席'
  } else if (item == RoleList.CheckAdmin) {
    return '监管员'
  } else if (item == RoleList.GameAdmin) {
    return '游戏管理员'
  } else if (item == RoleList.SuperAdmin) {
    return '超级管理员'
  }
  return ''
}

const roleStyle = (item: string) => {
  if (item == RoleList.CS) {
    return 'cs-style'
  } else if (item == RoleList.TempCS) {
    return 'cstemp-style'
  } else if (item == RoleList.CheckAdmin) {
    return 'check-style'
  } else if (item == RoleList.GameAdmin) {
    return 'game-style'
  } else if (item == RoleList.SuperAdmin) {
    return 'super-style'
  }
  return ''
}
</script>

<style lang="scss" scoped>
.role-box {
  width: auto;
  padding: 3px 8px;
  height: 1.5rem;
  border-radius: 2px;
  //   font-size: 0.75rem;
}
.cs-style {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}
.cstemp-style {
  background: rgba(0, 176, 176, 0.1);

  color: #00b0b0;
}
.m-left-10 {
  margin-right: 10px;
}
.check-style {
  background-color: rgba(255, 112, 41, 0.1);
  color: #ff7029;
}
.game-style {
  background-color: rgba(47, 202, 100, 0.1);

  color: #2fca64;
}
.super-style {
  background-color: rgba(125, 13, 253, 0.1);

  color: #7d0dfd;
}
</style>
