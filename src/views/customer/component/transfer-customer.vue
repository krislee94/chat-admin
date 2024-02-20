<!-- 转接客服 -->
<template>
  <el-popover placement="bottom" :width="230" :visible="visible">
    <template #reference>
      <!-- <i class="iconfont icon-menu" @click="visible = !visible">&#xe60c;</i> -->
      <iconpark-icon
        name="transfer"
        style="font-size: 20px; color: #b2bec3; cursor: pointer"
        @click="visible = !visible"
      ></iconpark-icon>
    </template>

    <div class="choose-employe-box">
      <div>
        <el-input
          v-model="selectValue"
          :placeholder="$t('t_p_keyword_search')"
          @input="remoteMethodQuery"
          style="width: 100%"
        />
      </div>
      <div style="width: 100%; height: 0.5rem"></div>
      <div
        v-for="item in state.options"
        class="choose-item"
        @click="chooseItem(item)"
        :key="item.id"
      >
        <span>{{ item.shortId }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="j-center" style="margin-top: 1rem; width: 100%">
      <el-button type="info" @click="visible = !visible">{{ $t('COMMON.cancel') }}</el-button>
      <el-button type="primary" @click="sureTranfer">{{ $t('COMMON.confirm') }}</el-button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { _ } from '@xr-util/util'
import {
  EmployeeCSTransferResponse,
  IEmployeeCsPageWithTransferRequest,
  ISessionPreTransferRequest,
  pageEmployeeCsList,
  preTranslateChange
} from '@/server/session_request'
import {
  useMessageStore,
  useSessionUserStore,
  useTranslatChangeStore,
  useUserStore
} from '@/stores'

const messageStore = useMessageStore()
const sessionUserStore = useSessionUserStore()
const trans = useTranslatChangeStore()

//仅展示用
const selectValue = ref()
const loading = ref(true)
const visible = ref(false)
const chooseValue = ref()

const state: any = reactive({
  options: []
})
//处理防抖事件， 搜索查询

const remoteMethodQuery = _.debounce(
  (query: string) => {
    if (!sessionUserStore.merchantId) return
    const param: IEmployeeCsPageWithTransferRequest = {
      merchantId: sessionUserStore.merchantId + '',
      keyword: query,
      pageNo: 1,
      pageSize: 10
    }
    //查询当前游戏下的所有客服
    pageEmployeeCsList(param).then((res) => {
      loading.value = false
      if (res && res.code == '0') {
        const arr: EmployeeCSTransferResponse[] = res.data?.dataList ?? []
        if (arr && arr.length > 0) {
          const optionArr = arr.map((item) => {
            let obj = {
              id: item.id,
              label: `${item.shortId}          ${item.employeeName}`,
              value: `${item.id}`,
              shortId: item.shortId,
              name: item.employeeName
            }

            return obj
          })
          state.options = optionArr.filter((r) => {
            if (r && r.id) {
              return r.id != useUserStore().id
            }
          })
        } else {
          state.options = []
        }
      }
    })
  },
  500
  // { leading: true, trailing: false }
)

watch(
  () => visible.value,
  (newValue, _) => {
    console.log(visible)
    if (newValue) {
      init()
    }
  }
)
const init = () => {
  const param: IEmployeeCsPageWithTransferRequest = {
    merchantId: sessionUserStore.merchantId + '',
    keyword: '',
    pageNo: 1,
    pageSize: 10
  }
  //查询当前游戏下的所有客服
  pageEmployeeCsList(param).then((res) => {
    loading.value = false
    if (res && res.code == '0') {
      const arr: EmployeeCSTransferResponse[] = res.data?.dataList ?? []
      if (arr && arr.length > 0) {
        const optionArr = arr.map((item) => {
          if (item.id != useUserStore().id) {
            let obj = {
              id: item.id,
              label: `${item.shortId}          ${item.employeeName}`,
              value: `${item.id}`,
              shortId: item.shortId,
              name: item.employeeName
            }

            return obj
          }
        })

        state.options = optionArr.filter((r) => {
          if (r && r.id) {
            return r.id != useUserStore().id
          }
        })
      }
    }
  })
}

const chooseItem = (item: any) => {
  chooseValue.value = item.id
  selectValue.value = item.name
  trans.setSelfParam(item.name)
}

/**
 * 转发会话
 */
const sureTranfer = async () => {
  if (!chooseValue.value) return
  const param: ISessionPreTransferRequest = {
    reason: '',
    sessionId: messageStore.sessionId,
    newEmployeeId: chooseValue.value,
    userId: messageStore.userId
  }
  await preTranslateChange(param).then((res) => {
    if (res && res.code == '0') {
      trans.startSelfInterval()
      visible.value = !visible.value
    }
  })
}
</script>

<style lang="scss" scoped>
.icon-menu {
  font-size: 1.75rem;
  cursor: pointer;
}
.choose-employe-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-between;
  height: 20vh;
  overflow-y: auto;
}
.choose-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 4vh;
  padding: 0.2rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  border: 1px dotted #f5f5f5;
}
.choose-item:hover {
  background-color: #e6f0ff;
}
</style>
