<template>
  <el-popover placement="top" :width="300" :hide-after="0">
    <template #reference>
      <!-- <i class="iconfont icon-size">&#xe625;</i> -->
      <iconpark-icon
        name="airplane"
        style="font-size: 20px; margin-right: 1rem; cursor: pointer"
      ></iconpark-icon>
    </template>
    <div>
      <div v-for="(item, index) in state.data" class="text-div" @click="clickFastItem(item)">
        <span class="index-style">{{ index + 1 }}</span>
        <span class="text-style">{{ item.content }}</span>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { FastReplyResponse, oftenFastReply } from '@/server/user_fast_request'
import { useMessageStore, useUserStore } from '@/stores'
import { RoleList } from '@/server/employee_request'

interface IStateParam {
  data: FastReplyResponse[]
}

const emit = defineEmits(['sub'])
const messageStore = useMessageStore()
const userStore = useUserStore()
const state: IStateParam = reactive({
  data: []
})

//请求接口-查询快捷回复列表
const _query = async () => {
  if (!userStore.permissionList || !userStore.permissionList.includes('im:cs')) {
    return
  }
  await oftenFastReply().then((res) => {
    if (res && res.code == '0') {
      state.data = res?.data ?? []
    }
  })
}
_query()

const clickFastItem = (item: FastReplyResponse) => {
  if (item && item.content) {
    emit('sub', item.content)
  }
}
</script>

<style lang="scss" scoped>
.icon-size {
  font-size: 1.45rem;
  margin-right: 1rem;
  cursor: pointer;
}
.text-div {
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  .index-style {
    font-size: 0.875rem;
    color: #0d6efd;
  }
}
.text-div:hover {
  background-color: #e5f4ff;
}
.text-style {
  box-sizing: border-box;
  margin-left: 0.5rem;
}
</style>
