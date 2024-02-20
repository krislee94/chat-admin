<template>
  <div class="diy-rule-box">
    <el-dialog title="自定义会话分配规则" width="80%">
      <div></div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, PropType } from 'vue'
import { IGameListItem } from '@/server/game_request'

const visible = ref(false)

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  info: {
    type: Object as PropType<IGameListItem>,
    required: true
  }
})

watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)
</script>

<style lang="scss" scoped></style>
