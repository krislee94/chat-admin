<template>
  <el-scrollbar class="left-chat-platform" height="92vh">
    <div
      v-for="item in accountList"
      class="account-sty"
      @click="setCurrentId(item)"
      :class="styleItem(item)"
    >
      <span>{{ item.userName ? item.userName : item.account }}</span>

      <div>
        <!-- <span>{{ item.onlineStatus }}</span> -->
        <icon-park type="wifi" theme="outline" size="16" fill="#417505" v-if="item.onlineStatus" />
        <icon-park
          type="close-wifi"
          theme="outline"
          size="16"
          fill="#d0021b"
          v-if="!item.onlineStatus"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import {} from '@/server/third_friend_request';
import { useAddressStore } from '@/stores'
import { thirdAccountPage, ThirdApp } from '@/server/third_request'
import type { IThirdAppPageRequest, ThirdAppAccountResponse } from '@/server/third_request'
import { IconPark } from '@icon-park/vue-next/es/all'
// <close-wifi theme="outline" size="24" fill="#d0021b"/>
// <wifi theme="outline" size="24" fill="#d0021b"/>

const addressStore = useAddressStore()

const accountList = ref<ThirdAppAccountResponse[]>([])

const currentId = ref()

const init = () => {
  let paltform: any = null
  if (addressStore.platform == 'zalo') {
    paltform = ThirdApp.Zalo
  }

  //根据
  let param: IThirdAppPageRequest = {
    pageNo: 1,
    pageSize: 999,
    merchantIdIsNull: false,
    thirdApp: paltform
  }

  thirdAccountPage(param).then((res) => {
    if (res && res.code == '0') {
      accountList.value = res.data.dataList || []
      addressStore.setAccountList(res.data.dataList)
    }
  })
}

init()

const setCurrentId = (item: ThirdAppAccountResponse) => {
  if (item && item.id) {
    currentId.value = item.id
    addressStore.setAccountId(item.id + '')
  }
}

const styleItem = (item: ThirdAppAccountResponse) => {
  if (currentId.value == item.id) {
    return 'active-style'
  }
}

defineExpose({ accountList })
</script>

<style lang="scss" scoped>
.left-chat-platform {
  width: 16vw;
  min-width: 230px;
  height: 92vh;
  overflow-y: auto;
  border-right: 1px solid #ced6e0;
  margin-top: -1rem;

  .account-sty {
    width: 100%;
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    cursor: pointer;
  }

  .account-sty:hover {
    background-color: #f5f5f5;
  }

  .active-style {
    background-color: #e6f6ff;
    border-right: 3px solid #1983fc;
  }
}

.empty-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
