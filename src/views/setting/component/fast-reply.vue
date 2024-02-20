<template>
  <div class="fast-reply-box base-content default-list-height">
    <el-button type="primary" @click="_showGroup">{{ $t('SETTING.add_type') }}</el-button>
    <div style="width: 100%; height: 1rem"></div>

    <div
      v-for="(item, index) in state.data"
      class="fast-group"
      :key="item.id"
      @click="_clickItem(index)"
    >
      <!--编辑列表 -->
      <div class="j-row-center j-row-between w-100" :class="showItem(index)">
        <div class="fast-group-1 j-row-center">
          <i class="iconfont icon1">&#xe609;</i>
          <i class="iconfont icon2" :class="showIcon(index)">&#xe604;</i>
          <i class="iconfont icon2" :class="showIcon2(index)">&#xe603;</i>
          <span class="ictext">{{ item.name }}</span>
          <el-tag type="success" style="margin-left: 4px" v-if="item.useChannel == 'OFTEN'">{{
            $t('SETTING.fast_send')
          }}</el-tag>
        </div>
        <div class="fast-group-2 j-row-center">
          <div class="a-color" @click.stop="addAnswer(item)">{{ $t('SETTING.add_reply') }}</div>
          <div
            style="margin-left: 1rem"
            class="a-color"
            @click="_rename(index)"
            v-if="item.useChannel == 'DEFAULT'"
          >
            {{ $t('COMMON.rename') }}
          </div>
          <div
            class="a-color"
            @click="_delGroup(item)"
            style="margin-left: 1rem"
            v-if="item.useChannel == 'DEFAULT'"
          >
            {{ $t('COMMON.del') }}
          </div>
        </div>
      </div>
      <!--编辑快捷分组 -->
      <div class="w-100" :class="showStyle(index)">
        <el-input v-model="state.editValue" @keyup.enter="_editGroup(item)" @blur="lostBlur" />
      </div>
      <!-- 加载分组内容-->
      <div :class="showIcon2(index)" class="inner-flex-box">
        <div
          v-for="(text, index) in state.overloadData"
          :key="index"
          class="inner-inner-box"
          @click.stop="replyClick(index)"
          :class="replyShowStyle(index)"
        >
          <i class="iconfont icon1">&#xe609;</i>
          <span style="min-width: 60%">{{ text.content }}</span>
          <div class="j-row-center" :style="props.isInChat ? 'min-width:3rem' : 'min-width: 10vw'">
            <div @click="sendReply(text)" style="width: 2rem" v-if="props.isInChat">
              <icon-park type="send" theme="outline" size="20" fill="#0d6efd" />
            </div>

            <div @click="editReply(text)" style="width: 2rem">
              <icon-park type="edit" theme="outline" size="20" fill="#0d6efd" />
            </div>

            <el-popconfirm
              :title="$t('GAME.sure_del')"
              :confirm-button-text="$t('COMMON.yes')"
              :cancel-button-text="$t('COMMON.no')"
              @confirm="delReply(text)"
            >
              <template #reference>
                <div>
                  <icon-park type="delete-one" theme="outline" size="20" fill="#0d6efd" />
                </div>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
      <div :class="showIcon(index)"></div>
    </div>
    <div class="fast-group" v-if="state.isShowGroup">
      <el-input v-model="state.groupValue" @keyup.enter="handleValue" />
    </div>
    <AddDialog :dialog-form-visible="state.addDialogFlag" @close="close" @submit="submit" />
    <UpdateDialog
      :show="state.showReply"
      :reply-item="state.currentReplyItem"
      @close="closeReply"
      @submit="submitReply"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import {
  queryFastGroup,
  IFastGroupRequestParam,
  Type,
  addFastGroup,
  IAddGroupRequestParam,
  delFastGroup,
  updateFastGroup,
  IUpdateFastGroupParam,
  addFastReply,
  IFastReplyAddParam,
  fastReplyList,
  updateFastReply,
  IFastReplyEditRequestParam,
  delFastReply,
  IFastReplyListRequest
} from '@/server/user_fast_request'
import { messageSuccess } from '@xr-util/xr-ui'
import AddDialog from './fast_reply/add-dialog.vue'
import UpdateDialog from './fast_reply/update-dialog.vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { useMessageStore } from '@/stores'

const props = defineProps({
  isInChat: {
    type: Boolean,
    default: false
  }
})

interface IStatePram {
  data: Array<any>
  groupValue: string
  isShowGroup: boolean
  isShowEdit: boolean
  editValue: string
  currentIndex: number
  addDialogFlag: boolean
  currentItem: any
  iconFlag: boolean
  iconIndex: number
  overloadData: Array<any>
  showReplyNumber: number
  showReply: boolean
  currentReplyItem: any
}
const state: IStatePram = reactive({
  data: [],
  groupValue: '',
  isShowGroup: false,
  isShowEdit: false,
  editValue: '',
  currentIndex: -1,
  addDialogFlag: false,
  currentItem: null,
  iconFlag: false,
  iconIndex: -1,
  overloadData: [],
  showReplyNumber: -1,
  showReply: false,
  currentReplyItem: ''
})

onMounted(() => {
  _query()
})

const reset = () => {
  state.currentIndex = -1
}

/**
 * 查询
 */
const _query = async () => {
  const param: IFastGroupRequestParam = {
    type: Type.Employee
  }
  await queryFastGroup(param).then((res) => {
    if (res.code == '0') {
      if (props.isInChat) {
        //@ts-ignore
        state.data = res.data?.filter(
          (item) => item && item.useChannel && item.useChannel == 'DEFAULT'
        )
      } else {
        state.data = res.data ? res.data : []
      }
    }
  })
}
/**
 * 新增分组
 */
const _addGroup = async () => {
  const param: IAddGroupRequestParam = {
    name: state.groupValue,
    type: Type.Employee,
    sort: 0
  }
  await addFastGroup(param)
  state.groupValue = ''
}
//处理用户输入的值
const handleValue = async () => {
  if (!state.groupValue) {
    _showGroup()
    return
  }

  await _addGroup()
  messageSuccess('新增分类成功')
  await _query()
  _showGroup()
}
const _showGroup = () => {
  state.iconIndex = -1
  state.isShowGroup = !state.isShowGroup
}
/**
 * 删除分组
 */
const _delGroup = async (item: { id: any }) => {
  if (item && item.id) {
    await delFastGroup({
      id: item.id + ''
    })
    messageSuccess('删除分类成功')
    await _query()
  }
}
/**
 * 编辑分组
 * @param item
 */
const _editGroup = async (item: { id: string }) => {
  if (!state.editValue) {
    reset()
    return
  }
  const param: IUpdateFastGroupParam = {
    id: item.id + '',
    name: state.editValue
  }
  await updateFastGroup(param)
  messageSuccess('更新分类成功')
  await _query()

  state.editValue = ''
  reset()
}

//处理 重命名弹窗
const _rename = (index: number) => {
  state.currentIndex = index
}
const showItem = (index: number) => {
  if (state.currentIndex == index) {
    return 'hidden'
  } else {
    return 'show'
  }
}
const showStyle = (index: number) => {
  if (state.currentIndex === index) {
    return 'show'
  } else {
    return 'hidden'
  }
}
//添加回复
const addAnswer = (item: any) => {
  state.addDialogFlag = true
  state.currentItem = item
}
const close = () => {
  state.addDialogFlag = false
}
const submit = async (value: string) => {
  if (!value) {
    return
  }
  const param: IFastReplyAddParam = {
    content: value,
    title: state.currentItem.name + Math.random() * 100,
    sort: 0,
    groupId: state.currentItem.id
  }
  await addFastReply(param)
  messageSuccess('新增快捷回复成功')
  state.addDialogFlag = false
  //查询列表TODO
  await fastReplyList({
    groupId: state.currentItem.id
  }).then((res) => {
    if (res && res.code == '0') {
      state.overloadData = res.data ? res.data : []
    }
  })
}
//用户点击item。加载内容
const _clickItem = (index: any) => {
  if (state.iconIndex == index) {
    state.iconIndex = -1
    return
  }
  state.iconIndex = index
  //加载数据
  const item = state.data[index]
  state.overloadData = []
  if (item && item.id) {
    const param = {
      groupId: item.id
    }
    fastReplyList(param).then((res) => {
      if (res.code == '0') {
        state.overloadData = res.data ? res.data : []
      }
    })
  }
}
const showIcon = (index: number) => {
  if (state.iconIndex == index) {
    return 'hidden'
  }
  return 'show'
}
const showIcon2 = (index: number) => {
  if (state.iconIndex == index) {
    return 'show'
  }
  return 'hidden'
}
const lostBlur = () => {
  state.editValue = ''
  reset()
}
//控制快捷回复的方法
const replyClick = (index: number) => {
  state.showReplyNumber = index
  // if (props.isInChat) {
  //   console.log('额外方法')
  // }
}
const replyShowStyle = (index: number) => {
  if (state.showReplyNumber == index) {
    return 'bg-fe'
  }
}

const editReply = (text: any) => {
  state.showReply = true
  state.currentReplyItem = text
}
const delReply = async (text: any) => {
  if (text && text.id) {
    const param = {
      id: text.id
    }
    await delFastReply(param)
    messageSuccess('删除成功')
    await requetLoadData({ id: text.groupId })
  }
}
const closeReply = () => {
  state.showReply = false
}
//update快捷回复
const submitReply = async (value: string) => {
  if (!value) {
    return
  }
  const param: IFastReplyEditRequestParam = {
    content: value,
    id: state.currentReplyItem.id,
    title: state.currentReplyItem.title
  }
  await updateFastReply(param)
  messageSuccess('更新成功')
  await requetLoadData({ id: state.currentReplyItem.groupId })
  state.showReply = false
}

const requetLoadData = async (param: { id: any }) => {
  console.log(param)
  if (!param.id) {
    return
  }
  let groupId = ''
  if (param.id) {
    groupId = param.id
  }

  const requetParam: IFastReplyListRequest = {
    groupId: groupId
  }
  await fastReplyList(requetParam).then((res) => {
    if (res.code == '0') {
      state.overloadData = res.data ? res.data : []
    }
  })
}

const sendReply = (text: any) => {
  if (text && text.content) {
    useMessageStore().setParams({ fastReply: text.content })
  }
}
</script>

<style lang="scss" scoped>
.fast-reply-box {
  padding: 24px;
}
.fast-group {
  min-height: 3rem;
  height: auto;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  justify-content: space-between;
  flex-wrap: wrap;
  clear: both;
  border-radius: 0.5rem;
  .icon1 {
    font-size: 1.5rem;
  }

  .ictext {
    font-size: 0.875rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    color: #434343;
    line-height: 22px;
  }
}
.w-100 {
  width: 100%;
}

.hidden {
  display: none;
}
.show {
  display: flex;
}
.inner-flex-box {
  flex-direction: column;
  margin-left: 2.25rem;
  margin-top: 1rem;
  width: 90%;
  .inner-inner-box {
    //width: 69vw;
    width: 100%;
    min-height: 3rem;
    padding: 0.875rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span {
    margin-left: 8px;
    overflow: hidden;
    width: 60vw;
  }
}
.bg-fe {
  background-color: #e5f4ff;
  border-radius: var(--xr-min-border-radius);
}
</style>
