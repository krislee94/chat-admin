<template>
  <div class="user-list-style">
    <!-- 搜索框 -->
    <div class="flex row alignCenter" style="margin-bottom: 0.25rem">
      <el-input
        v-model="searchValue"
        width="90%"
        :suffix-icon="Search"
        :placeholder="$t('t_p_keyword_search')"
        @input="search"
      />

      <div class="flex refresh-box">
        <icon-park
          type="redo"
          theme="outline"
          size="16"
          fill="var(--xr-blue)"
          @click="refreshAccount"
          @mouseleave="showFlag = false"
          v-if="showFlag"
        />
        <icon-park
          type="redo"
          theme="outline"
          size="16"
          fill="#C2C6CE"
          v-if="!showFlag"
          @mouseover="showFlag = true"
        />
      </div>
    </div>

    <!-- <用户列表> -->
    <el-scrollbar
      class="flex column user-style-list"
      v-if="dataList && dataList.length > 0"
      height="88vh"
      @scroll="scrollListerner"
      ref="userRef"
    >
      <div
        v-for="item in dataList"
        class="user-item"
        @click="clickUser(item)"
        :class="clickUserClass(item)"
      >
        <img :src="item.headerImgUrl" />
        <div class="flex nickname-style column">
          <span class="n-span">{{ item.nickName }}</span>
          <span class="little-span">{{ $t('t_third_acc_desp') }}:{{ item.thirdAppUserId }}</span>
        </div>
      </div>
    </el-scrollbar>

    <div v-if="dataList.length == 0" class="empty-class">
      <img src="@/assets/empty-customer.png" />
      <p>{{ $t('t_no_customer_list') }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { Search } from '@element-plus/icons-vue'
import {
  getFriendList,
  IThirdAppFriendPageRequest,
  ThirdAppAccountPageResponse,
  userFriendRefresh
} from '@/server/third_friend_request'

import { useAddressStore } from '@/stores'

import { messageSuccess } from '@xr-util/xr-ui'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext?.config.globalProperties
//地址内容
const addressStore = useAddressStore()

const dataList = ref<ThirdAppAccountPageResponse[]>([])
//搜索内容
const searchValue = ref('')

const currentUserId = ref('')

const userRef = ref()

const showFlag = ref(false)
//是否需要更新
const isNeedUpdate = ref(true)

let container: null = null

const init = async () => {
  if (addressStore.accountId) {
    //查询好友列表
    let obj: IThirdAppFriendPageRequest = {
      pageNo: 1,
      pageSize: 99,
      thirdAppAccountId: addressStore.accountId
    }
    await getList(obj)
  }

  if (userRef.value) {
    userRef.value.wrapRef(container)
  }
}
//初始化
init()

//监听 addressStore.accountId;
watch(
  () => addressStore.accountId,
  (newValue, _) => {
    if (newValue) {
      let obj = {
        pageNo: 1,
        pageSize: 99,
        thirdAppAccountId: newValue
      }
      getList(obj)
    }
  }
)

//获取列表
const getList = async (param: IThirdAppFriendPageRequest) => {
  await getFriendList(param).then((res) => {
    if (res && res.code == '0') {
      dataList.value = res.data?.dataList ?? []
    }
  })
}

//点击User
const clickUser = (item: ThirdAppAccountPageResponse) => {
  if (item && item.id) {
    currentUserId.value = item.id + ''
    addressStore.setUserId(item.id + '')
  }
}

const clickUserClass = (item: ThirdAppAccountPageResponse) => {
  if (item && item.id) {
    if (item.id.toString() == currentUserId.value) {
      return 'actived-class'
    }
  }
}

const search = (value: string) => {
  let obj: IThirdAppFriendPageRequest = {
    pageNo: 1,
    pageSize: 99,
    thirdAppAccountId: addressStore.accountId,
    nickName: value
  }
  getList(obj)
}

//好友列表刷新
const refreshAccount = async () => {
  await userFriendRefresh({
    id: addressStore.accountId
  })
  await init()

  messageSuccess($t('BUSINESS.update_success'))
}

//监听滚动事件
const scrollListerner = (param: { scrollLeft: any; scrollTop: number }) => {
  //   const { scrollLeft, scrollTop } = param
  //   let container: any = document.getElementsByClassName('user-style-list')[0]
  //   //  console.log()
  //   let s1: number = container?.scrollHeight
  //   let s2 = container?.clientHeight
  //   let s3 = container?.scrollTop
  //   if (s1 && scrollTop) {
  //     console.log(s1 - scrollTop)
  //     //@ts-ignore
  //     if (s1 - scrollTo < 240) {
  //       console.log('22222222222')
  //     }
  //   }
}
</script>

<style lang="scss" scoped>
.user-list-style {
  padding: 0.25rem 1rem;
  width: 24vw;
  min-width: 345px;

  height: 89vh;
  .refresh-box {
    border: 1px solid #c2c6ce;
    border-radius: 4px;
    margin-left: 0.5rem;
    justify-content: center;
    align-items: center;
    width: 1.875rem;
    height: 1.875rem;
    cursor: pointer;
  }

  .user-item {
    width: 100%;
    height: 4.25rem;

    border-radius: 0.375rem;
    align-items: center;
    margin-top: 0.225rem;
    display: flex;
    flex-direction: row;
    padding: 0 0.875rem;
    cursor: pointer;
    //   border-bottom: 1px dashed #c2c6ce;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.25rem;
    }

    .nickname-style {
      margin-left: 0.625rem;
      .n-span {
        font-size: 0.875rem;
        font-weight: 500;
        color: #101010;
      }

      .little-span {
        font-size: 0.625rem;
        color: #ced6e0;
      }
    }
  }

  .user-item:hover {
    background-color: #f5f5f5;
  }

  .actived-class {
    background-color: #e6f0ff;
  }
}

.empty-class {
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 7vw;
    height: 4vw;
  }
  p {
    font-size: 0.75rem;
    color: #ced6e0;
    margin-top: 10px;
  }
}
</style>
