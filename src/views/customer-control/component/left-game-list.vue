<template>
  <el-scrollbar class="left-game-list-box">
    <el-menu>
      <el-menu-item v-for="item in gameInfo" :key="item.id" @click="chooseGame(item)">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import type { IGameListItem } from '@/server/game_request'
import { gameList } from '@/server/game_request'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext?.config?.globalProperties

const emit = defineEmits(['choose'])

//游戏列表数据
const gameInfo = ref<IGameListItem[]>([])
//--------------------------初始化--------------------------------
const init = async (): Promise<void> => {
  const res = await gameList({ pageNo: 1, pageSize: 99 })

  if (res?.data?.dataList) {
    gameInfo.value = res.data.dataList
  }

  let obj: IGameListItem = {
    id: '',
    name: $t('COMMON.all')
  }

  //unshift
  gameInfo.value.unshift(obj)
}
init()

const chooseGame = (item: IGameListItem) => {
  emit('choose', item.id)
}
</script>

<style scoped lang="scss">
.left-game-list-box {
}

:deep(.el-menu) {
  border-right: none;
}
:deep(.el-scrollbar__wrap) {
  border-right: 1px solid var(--el-menu-border-color);
}
</style>
