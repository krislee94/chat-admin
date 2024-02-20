<template>
  <div class="flex address-box row" v-if="addressStore.accountList.length > 0">
    <div class="left-address">
      <addressTabs />
      <div class="flex row left-inner-box">
        <third-app-list ref="thirdAppListRef" />

        <UserList />
      </div>
    </div>

    <div class="right-address">
      <UserDetailVue />
    </div>
  </div>

  <div class="empty-cls" v-if="addressStore.accountList.length == 0">
    <img src="@/assets/no-message.png" />
    <p>{{ $t('t_no_address_book') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import addressTabs from './component/address-tabs.vue'
import ThirdAppList from './component/third-app-list.vue'
import UserList from './component/user-list.vue'
import UserDetailVue from './component/user-detail.vue'
import { useAddressStore } from '@/stores'
import { IThirdAppPageRequest, thirdAccountPage, ThirdApp } from '@/server/third_request'

const addressStore = useAddressStore()

const thirdAppListRef = ref()

const init = () => {
  let paltform: any = null
  if (addressStore.platform == 'zalo') {
    paltform = ThirdApp.Zalo
  }
  let param: IThirdAppPageRequest = {
    pageNo: 1,
    pageSize: 999,
    merchantIdIsNull: false,
    thirdApp: paltform
  }

  thirdAccountPage(param).then((res) => {
    if (res && res.code == '0') {
      // accountList.value = res.data.dataList || []
      addressStore.setAccountList(res.data.dataList)
    }
  })
}
init()
</script>

<style lang="scss" scoped>
.address-box {
  .left-address {
    width: 40vw;
    min-width: 576px;
    height: 100vh;
  }

  .right-address {
    width: 56vw;
    min-width: 806px;
    height: 100vh;
    background-color: #fafbfd;
  }
}

.empty-cls {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.75rem;
    color: #ced6e0;
    margin-top: 1rem;
  }
}
.left-inner-box {
  height: 90vh;
}
</style>
