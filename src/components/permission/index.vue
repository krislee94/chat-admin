<template>
  <div class="">
    <el-tree
      :data="permissionMockList"
      :props="defaultProps"
      show-checkbox
      style="display: flex"
      default-expand-all
      ref="treeRef"
      @check-change="changeTree"
      node-key="id"
    ></el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { permissionMockList } from '@/api/mock'

const defaultProps = ref({
  label: 'name',
  children: 'children'
})

// 获取到的字符串id转成数字
let defaulcheckedNodes = <any>ref([])

let tree = ref<any>(null)

let changeTree = (val: any, val2: any) => {
  console.log(val, val2)
  //获取父id 和当前父id下的子id
}
</script>

<style lang="scss" scoped></style>
