<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      :layout="layout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: true
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 1
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  }
})

const emit = defineEmits(['update:limit', 'update:page', 'pagination'])
const currentPage = computed({
  get: () => {
    return props.page
  },
  set: (val) => {
    emit('update:page', val)
  }
})

const pageSize = computed({
  get: () => {
    return props.limit
  },
  set: (val: number) => {
    emit('update:limit', val)
  }
})

const handleSizeChange = (val: number) => {
  emit('pagination', { pageNo: currentPage.value, pageSize: val })
}
const handleCurrentChange = (val: number) => {
  emit('pagination', { pageNo: val, pageSize: pageSize.value })
}
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: row-reverse;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: var(--xr-main-color) !important; //修改默认的背景色
}
</style>
