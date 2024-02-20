<template>
  <div class="left-chat">
    <leftChatModal />
    <div style="height: 2.625rem"></div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="_handleOpen"
      @close="_handleClose"
      background-color="var(--xr-main-bg-color)"
      :router="state.isOpenRouter"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in sliderStore.sliderData"
        class="left-chat-menu"
      >
        <el-badge
          :value="
            item.path == '/customer'
              ? chatListStore.unReadNumber > 0
                ? chatListStore.unReadNumber
                : ''
              : ''
          "
          class="badge-style"
          type="danger"
        >
        </el-badge>
        <iconpark-icon
          :name="item.icon"
          style="font-size: 24px; color: #c2c6ce"
          v-if="!item.isActive"
        >
        </iconpark-icon>

        <iconpark-icon
          :name="item.activeIcon"
          style="font-size: 24px; color: #1977fd"
          v-if="item.isActive"
        ></iconpark-icon>
      </el-menu-item>
    </el-menu>
    <!-- <i class="iconfont">&#xe761;</i> -->
    <!-- 设置 -->
    <div @click="setting" class="bottom-icon" style="cursor: pointer; height: 60px">
      <iconpark-icon
        name="setting-two"
        v-if="!settingIconFlag"
        style="font-size: 24px"
      ></iconpark-icon>

      <iconpark-icon
        name="setting-two-91fmf95e"
        style="font-size: 24px"
        v-if="settingIconFlag"
      ></iconpark-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect, ref, onMounted } from 'vue'
import leftChatModal from './left-chat-modal.vue'
import { useSliderStore, useChatListStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'

const sliderStore = useSliderStore()
const chatListStore = useChatListStore()

const router = useRouter()
const route = useRoute()
const state = reactive({
  isShow: false,
  //是否开启菜单路由
  isOpenRouter: true
})
const settingIconFlag = ref(false)

const setting = () => {
  router.push('/login/setting')
}

onMounted(() => {
  if (!sliderStore.sliderData || sliderStore.sliderData.length == 0) {
    sliderStore.init()
  }
})

watchEffect(() => {
  if (route.path == '/login/setting') {
    settingIconFlag.value = true
    sliderStore.activeItem(route.path)
  } else {
    settingIconFlag.value = false
    sliderStore.activeItem(route.path)
    console.log(sliderStore.sliderData)
  }
})

const _handleClose = () => {}
const _handleOpen = () => {}
</script>

<style lang="scss" scoped>
.left-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--xr-main-bg-color);
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
  width: 3.3vw;
  height: 100vh;
  padding-top: 1.25rem;
  // opacity: 0.9;
  position: relative;
  z-index: 1;
  min-width: 4rem;
  .lc-img {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
  .el-menu-vertical-demo {
    border: 0 !important;
    width: 3.3vw;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .left-chat-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .badge-style {
      position: absolute;
      left: 1.975rem;
      bottom: 1.6125rem;
      z-index: 99;
    }
  }

  .left-chat-menu:hover {
    background-color: #2a354c;
  }

  .menu-icon {
    font-size: 2.25rem;
  }
  .left-chat-menu:hover .span-text {
    color: #fff;
  }
  .span-text {
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    line-height: 22px;
    margin-left: 5px;
  }
  .bottom-icon {
    position: absolute;
    bottom: 2.1875rem;
    width: 100%;
    height: 8vh;
    display: flex;
    // flex-direction: ;
    justify-content: center;
    align-items: center;
    img {
      width: 1.375rem;
      height: 1.5625rem;
    }
  }
  .bottom-icon:hover {
    background-color: #2a354c;
  }
  .bottom-icon:hover #setting-two {
  }
}
</style>
