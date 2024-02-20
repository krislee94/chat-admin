<template>
  <div class="j-row-center">
    <div v-for="item in props.groupList" class="cl-box j-center">{{ item.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

interface IGroupListParam {
  id: string
  name: string
}
const props = defineProps({
  groupList: {
    type: Array as PropType<Array<IGroupListParam>>
  }
})
</script>

<style lang="scss" scoped>
.cl-box {
  min-width: 2.5rem;
  height: 1.5rem;
  background: #f5f5f5;
  border-radius: 2px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: #434343;
  margin-right: 0.25rem;
  font-size: 0.75rem;
}
</style>
