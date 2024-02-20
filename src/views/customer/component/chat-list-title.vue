<template>
  <div class="chat-list-title">
    <el-input
      v-model="state.input1"
      class="m-2 w-50"
      size="default"
      :placeholder="$t('t_p_keyword_search')"
      @keydown.enter.native="searchList"
      :suffix-icon="Search"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

const emit = defineEmits(['search'])
const state = reactive({
  input1: ''
})

const searchList = () => {
  emit('search', state.input1)
}
</script>

<style lang="scss" scoped>
.chat-list-title {
  width: 100%;
  height: 41px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  :deep(.el-input__wrapper) {
    font-size: 12px;
  }
}
</style>
