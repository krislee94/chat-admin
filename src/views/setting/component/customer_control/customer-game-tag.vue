<template>
  <div class="j-row-center">
    <div v-for="item in props.merchantList" class="border-ru j-row-center">
      <el-avatar :size="20" :src="circleUrl" v-if="!item.headerImgUrl" />
      <el-avatar :size="20" :src="item.headerImgUrl" v-if="item.headerImgUrl" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
interface IMerchantParam {
  id: string
  headerImgUrl: string
  name: string
}

const props = defineProps({
  merchantList: {
    type: Array as PropType<Array<IMerchantParam>>,
    required: false,
    default: []
  }
})

const circleUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')
</script>

<style lang="scss" scoped>
.border-ru {
  min-width: 7.125rem;
  height: 2rem;
  padding: 4px 8px;
  background: #f5f5f5;
  margin-right: 5px;
  border-radius: 1rem;
  span {
    font-size: 0.875rem;
    color: #434343;
    margin-left: 4px;
  }
}
</style>
