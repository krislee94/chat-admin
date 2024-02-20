<template>
  <div class="game-in-box base-content">
    <!-- 操作框 -->
    <div class="opt-box">
      <el-button type="primary" @click="_addGame">{{ $t('GAME.add_game') }}</el-button>
      <!-- <el-button type="info">{{ $t('GAME.add_game') }}</el-button> -->
      <el-input
        :placeholder="$t('GAME.game_query')"
        :suffix-icon="Search"
        v-model="state.inputGame"
        style="width: 20vw"
        @keydown.enter.native="_search"
        @blur="_search"
      />
    </div>

    <div v-if="state.dataList && state.dataList.length > 0" style="margin-top: 1.5rem">
      <div v-for="item in state.dataList" class="game-item j-row-center">
        <div class="j-row-center">
          <img
            :src="item.headerImgUrl"
            v-if="item.headerImgUrl"
            v-img-error:headerImgUrl-merchant
          />
          <img src="@/assets/moren.png" v-if="!item.headerImgUrl" />

          <div class="j-column" style="margin-left: 0.75rem">
            <span class="item-title">{{ item.name }}</span>
            <div>
              <span class="item-content">{{ $t('GAME.game_id') }}{{ item.id }}</span>
              <span class="item-content item-content-margin"
                >{{ $t('GAME.game_create_time') }}{{ _formatTime(item.createTime) }}</span
              >
            </div>
          </div>
        </div>

        <!-- <div style="width: 30%; height: 1px"></div> -->

        <div class="game-opteration j-row-center">
          <el-button type="primary" link size="small" @click="_editModal(item)">{{
            $t('COMMON.editor')
          }}</el-button>
          <PopConfirm @confirm="_delGame(item)" :title="$t('GAME.sure_del')" />
          <!-- <el-button type="primary" plain @click="_toConnect(item)">立即接入</el-button> -->
          <el-button type="warning" plain @click="_chatControl(item)">{{
            $t('GAME.fenpei')
          }}</el-button>
        </div>
      </div>

      <Pagination
        :total="state.total"
        :limit="state.pageSize"
        :page="state.pageNo"
        @pagination="_search"
      />
    </div>

    <!-- 占位图 -->
    <div v-if="!state.dataList || state.dataList.length < 1">
      <emptyCustomer empty-type="game" />
    </div>

    <edModal
      :show="visible"
      :info="state.currentItem"
      @cancel="_cancelModal"
      @update="_confirmModal"
      @add="_addConfirmModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import emptyCustomer from '@/components/empty/empty-customer.vue'
import {
  gameList,
  gameEdit,
  gameAdd,
  gameDel,
  IMerchantAddRequestParam,
  IGameListItem,
  IMerchantEditRequest
} from '@/server/game_request'
import PopConfirm from '@/components/popconfirm/index.vue'
import Pagination from '@/components/pagination/index.vue'
import edModal from './component/game/edModal.vue'
import { messageError, messageSuccess } from '@xr-util/xr-ui'
import { useRouter } from 'vue-router'
import { timeUtil2 } from '@/utils/timeUtil'

interface IPageRequestParam {
  pageNo?: number
  pageSize?: number
  merchantName?: string
}
interface IStateParam {
  inputGame?: string
  dataList: Array<IGameListItem>
  pageNo?: number
  pageSize?: number
  total: number
  currentItem?: IGameListItem
}
const router = useRouter()

const state: IStateParam = reactive({
  inputGame: '',
  dataList: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  currentItem: {}
})
//是否展示
let visible = ref(false)

// --------------------- request ---------------------

const _search = async (param: IPageRequestParam) => {
  let obj: any = {}
  obj.pageNo = param && param.pageNo ? param.pageNo : state.pageNo
  obj.pageSize = param && param.pageSize ? param.pageSize : state.pageSize
  obj.merchantName = param && param.merchantName ? param.merchantName : state.inputGame

  await gameList(obj).then((res) => {
    if (res && res.code == '0') {
      state.dataList = res.data.dataList || []
      state.pageNo = Number(res.data.pageNo)
      state.pageSize = Number(res.data.pageSize)
      state.total = Number(res.data.total) || 0
    }
  })
}
//初始化
_search({})

/**
 *
 * 删除游戏
 * @param item
 *
 */
const _delGame = async (item: IGameListItem) => {
  if (item && item.id) {
    await gameDel({ id: item.id + '' }).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('删除成功')
      }
    })

    await _search({})
  }
}

//---------------- private -----------

const _formatTime = (item: string | undefined): string | number => {
  if (item) {
    return timeUtil2(item)
  } else {
    return '-'
  }
}

//理解接入
const _toConnect = (item: IGameListItem | undefined) => {}

//会话分配
const _chatControl = (item: IGameListItem | undefined) => {
  if (item && item.id) {
    router.push(`/game/rule/${item.id}`)
  }
}

//编辑
const _editModal = (item: IGameListItem | undefined) => {
  if (item && item.id) {
    state.currentItem = item
    visible.value = true
  } else {
    messageError('待操作信息不存在')
  }
}

const _cancelModal = () => {
  visible.value = false
  state.currentItem = {}
}

const _confirmModal = async (param: any) => {
  if (param && param.id) {
    const obj: IMerchantEditRequest = {
      id: param.id,
      name: param.name,
      headerImgUrl: param.headerImgUrl,
      remark: ''
    }
    await gameEdit(obj).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('编辑成功')
      }
    })
    visible.value = false
    await _search({})
  }
}

const _addConfirmModal = async (param: any) => {
  if (param && param.name) {
    const obj: IMerchantAddRequestParam = {
      name: param.name,
      headerImgUrl: param.headerImgUrl || '',
      remark: ''
    }
    await gameAdd(obj).then((res) => {
      if (res && res.code == '0') {
        messageSuccess('添加成功')
      }
    })
    visible.value = false

    await _search({})
  }
}

const _addGame = () => {
  state.currentItem = {}
  visible.value = true
}
</script>

<style lang="scss" scoped>
.game-in-box {
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  .opt-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .game-item {
    width: 100%;
    height: 4.5rem;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--xr-min-border-radius);
    }
    .item-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #434343;
      line-height: 1.25rem;
    }
    .item-content {
      font-size: 0.875rem;
      font-family: Roboto-Light, Roboto;
      color: #8c8c8c;
      line-height: 1.25rem;
    }
    .item-content-margin {
      margin-left: 0.75rem;
    }
    .game-opteration {
      height: 100%;
    }
  }
}
</style>
