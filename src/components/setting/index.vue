<template>
  <!-- 设置界面 -->
  <div class="setting-menu-box">
    <div>
      <div class="setting-item" @click="setItem(settingTeamMenu[0])">
        <div class="set-box"><i class="iconfont icon">&#xe66b;</i> <span>员工管理</span></div>
      </div>

      <div class="setting-item" @click="pullDown('2')">
        <div class="set-box"><i class="iconfont icon">&#xe710;</i> <span>会话设置</span></div>
        <i class="iconfont">&#xe603;</i>
      </div>
      <!-- 会话设置列表 -->
      <el-collapse-transition>
        <div v-show="state.showChat">
          <div
            v-for="item in settingChatMenu"
            :key="item.id"
            class="set-menu-item"
            @click="setItem(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-collapse-transition>

      <div class="setting-item" @click="setItem(gameMenu[0])">
        <div class="set-box"><i class="iconfont icon">&#xe670;</i> <span>游戏接入</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { settingTeamMenu, gameMenu } from '@/api/slider'
import { useSettingStore } from '@/stores'
import { reactive } from 'vue'
import { settingChatMenu } from '@/api/slider'

const settingStore = useSettingStore()

//@ts-ignore
settingStore.init()

const state = reactive({
  showTeam: false,
  showChat: false
})
/**
 * 下拉展示团队
 */
const pullDown = (str: string) => {
  console.log(str)
  if (str == '1') {
    state.showTeam = !state.showTeam
  } else if (str == '2') {
    state.showChat = !state.showChat
  }
}

const setItem = (item: { id: string; name: string }) => {
  if (item) {
    //@ts-ignore
    settingStore.setItem(item)
  }
}
</script>

<style lang="scss" scoped>
.setting-menu-box {
  width: 18vw;
  height: 100vh;
  padding: 0.875rem 1rem;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
  .setting-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .set-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        font-size: 1.25rem;
      }
      span {
        font-size: 0.875rem;
        color: #434343;
        font-weight: 500;
        margin-left: 0.75rem;
        line-height: 1.375rem;
      }
    }
  }

  .setting-item:hover .icon {
    color: var(--xr-main-color);
  }
  .setting-item:hover span {
    color: var(--xr-main-color);
  }
  .set-menu-item {
    width: 16vw;
    height: 2.5rem;
    border: 1px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .set-menu-item:hover {
    color: var(--xr-main-color);
    background-color: #f5f5f5;
  }
}
</style>
