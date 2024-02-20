<!-- 敏感词主页面 -->
<template>
  <div class="sensitive-words-main base-content default-list-height">
    <el-button type="primary" @click="addSensitive">{{ $t('SETTING.add_sensitive') }}</el-button>
    <!-- table-->
    <div style="width: 100%; height: 1rem"></div>
    <el-table :data="state.data" max-height="900" :header-cell-style="headerCellStyle">
      <el-table-column prop="keyword" :label="$t('CHECKMODULE.sensitive')" />
      <el-table-column prop="replaceContent" :label="$t('SETTING.replace_sentence')" />

      <el-table-column fixed="right" :label="$t('COMMON.opt')" width="300">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="updateModal(scope.row)">
            {{ $t('COMMON.editor') }}
          </el-button>
          <Popconfirm :title="$t('GAME.sure_del')" @confirm="sureDel(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- <> -->
    <AddSensitive :show="state.addShow" @cancel="cancelModal" @confirm="addConfirm" />
    <UpdateSensitive
      :show="state.updateShow"
      :show-info="state.showInfo"
      @cancel="cancelUpdateModal"
      @confirm="updateConfirm"
    />
    <Pagination
      :total="state.total"
      :page.sync="requestParam.pageNo"
      :limit.sync="requestParam.pageSize"
      @pagination="_search"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import AddSensitive from './component/sensitive_words/AddSensitive.vue'
import UpdateSensitive from './component/sensitive_words/update-sensitive.vue'
import { headerCellStyle } from '@/server/table'
import Popconfirm from '@/components/popconfirm/index.vue'
import {
  sensitiveList,
  SensitiveKeywordResponse,
  sensitiveDel,
  sensitiveAdd,
  ISensitiveBatchAddRequestParm,
  sensitiveUpdate,
  ISensitiveUpdateParam
} from '@/server/sensitive_request'
import Pagination from '@/components/pagination/index.vue'
import { _ } from '@xr-util/util'
import { messageSuccess } from '@xr-util/xr-ui'

interface IStateParam {
  addShow: boolean
  updateShow: boolean
  data: Array<SensitiveKeywordResponse> | undefined
  total: number
  showInfo?: any
}
interface IRequestParam {
  pageNo: number | undefined
  pageSize: number | undefined
}
const state: IStateParam = reactive({
  addShow: false,
  data: [],
  total: 0,
  updateShow: false,
  showInfo: null
})

const requestParam: IRequestParam = reactive({
  pageNo: 1,
  pageSize: 10
})

// ---------------------- request -----------------------
const _search = async (param: any) => {
  let req: any = {}
  if (_.isEmpty(param)) {
    req = requestParam
  } else {
    req = param
  }
  await sensitiveList(req).then((res) => {
    if (res.code == '0') {
      state.data = res.data?.dataList
      requestParam.pageNo = Number(res.data?.pageNo ?? 1)
      requestParam.pageSize = Number(res.data?.pageSize ?? 10)
      state.total = Number(res.data?.total ?? 0)
    }
  })
}
//确认是否删除，点击是
const sureDel = async (item: { id: string }) => {
  await sensitiveDel({ id: item.id })
  messageSuccess('删除成功')
  await _search(null)
}
//新增敏感词
const addConfirm = async (obj: { tags: Array<string>; sensitiveText: string }) => {
  console.log(obj)
  const param: ISensitiveBatchAddRequestParm = {
    keywordList: obj.tags,
    replaceContent: obj.sensitiveText
  }
  await sensitiveAdd(param).then((res) => {
    if (res.code == '0') {
      messageSuccess('添加成功')
      //关闭弹窗
      cancelModal()
    }
  })
  await _search(null)
}

/**
 * 更新update
 */
const updateConfirm = async (value: {
  id: number | undefined
  sensitiveWords: string | undefined
  sensitiveText: string | undefined
}) => {
  const param: ISensitiveUpdateParam = {}
  if (value && value.id) {
    param.id = value.id
    if (value && value.sensitiveWords) {
      param.keyword = value.sensitiveWords
    }
    if (value && value.sensitiveText) {
      param.replaceContent = value.sensitiveText
    }
    await sensitiveUpdate(param).then((res) => {
      if (res.code == '0') {
        messageSuccess('更新成功')
        cancelUpdateModal()
      }
    })
    await _search(null)
  }
}

// ---------------------- init --------------------------
_search(null)

// ----------------------- method ------------------------

const addSensitive = () => {
  //添加敏感词弹窗
  state.addShow = true
}
const cancelModal = () => {
  state.addShow = false
}
const cancelUpdateModal = () => {
  state.updateShow = false
}
const updateModal = async (item: { keyword: any; replaceContent: any; id: string }) => {
  console.log(item)

  if (item && item.keyword && item.replaceContent) {
    state.showInfo = {
      id: item.id,
      keyword: item.keyword,
      replaceContent: item.replaceContent
    }
  }

  state.updateShow = true
}
</script>

<style lang="scss" scoped>
.sensitive-words-main {
  padding: 1.5rem;
}
</style>
