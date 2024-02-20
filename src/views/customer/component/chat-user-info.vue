<template>
  <div class="chat-user-info" v-if="sessionUserStore.userId">
    <div class="chat-user-style">
      <img :src="sessionUserStore.headerImgUrl" class="user-img" v-img-error:headerImgUrl-user />
      <div style="margin-left: 0.6875rem">
        <div class="customer-info">
          <span class="customer-name">{{ sessionUserStore.nickName }}</span>
          <!-- <span>客户等级：{{ customerStore.customerLevel }}</span> -->
        </div>
        <el-input
          v-if="state.inputVisible"
          ref="InputRef"
          v-model="state.inputValue"
          class="w-20 ml-1"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="ml-1 button-new-tag" size="small" @click="showInput">
          + {{ $t('CHAT.user_tag') }}
        </el-button>
      </div>
    </div>

    <!-- 用户标签 -->
    <div class="customer-tag">
      <el-tag
        v-for="(tag, index) in sessionUserStore.userTagList"
        :type="colors[index]"
        class="tag-item"
        closable
        @close="handleClose(tag)"
      >
        {{ tag.name }}</el-tag
      >
    </div>

    <!--备注信息 -->
    <div class="customer-remark">
      <p>{{ $t('CHAT.remark') }}</p>
      <el-input
        :placeholder="sessionUserStore.remark"
        v-model="state.textarea"
        type="textarea"
        style="margin-top: 9px"
        @keyup.enter="handleRemark"
        @blur="handleRemark"
      />
    </div>

    <!-- 用户详细信息 -->
    <div style="margin-top: 14px">
      <ul style="padding: 0">
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.user_id') }}</span>
          <span class="li-item2">{{ sessionUserStore.userId }}</span>
        </li>
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.user_level') }}</span>
          <span class="li-item2">{{ state.levelName }}</span>
        </li>
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.nickname') }}</span>
          <span class="li-item2">{{ sessionUserStore.nickName }}</span>
        </li>
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.platform_id') }}</span>
          <span class="li-item2">{{ sessionUserStore.merchantId }}</span>
        </li>
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.platform_nickname') }}</span>
          <span class="li-item2">{{ sessionUserStore.merchantName }}</span>
        </li>
        <li class="li-style">
          <span class="li-item">{{ $t('CHAT.vis_ip') }}</span>
          <span class="li-item2"> {{ sessionUserStore.requestIp }}</span>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="!sessionUserStore.userId" class="emp-style">
    <img src="@/assets/empty.png" class="empty-img" />
    <p>{{ $t('t_no_user_info') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useSessionUserStore, useChatListStore } from '@/stores'
import { reactive, ref, nextTick, watch } from 'vue'
import { ElInput } from 'element-plus'
import { IAddUserTagParam } from '@/server/user_tag_request'
import { _ } from '@xr-util/util'
import { IUserEditRequestParam } from '@/server/user_request'
import { UserLevel2NameList } from '@/server/game_request'

const InputRef = ref<InstanceType<typeof ElInput>>()

//初始化
const sessionUserStore = useSessionUserStore()
const chatListStore = useChatListStore()

const colors = ['', 'success', 'danger', 'warning', 'info']

//state
const state = reactive({
  inputVisible: false,
  inputValue: '',
  textarea: '',
  levelName: ''
})
/**
 * 当用户在键盘按下enter键
 * or
 * 用户光标离开的时候
 */
const handleInputConfirm = async () => {
  if (_.isEmpty(state.inputValue)) {
    state.inputValue = ''
    state.inputVisible = false
    return
  }
  //TDOO 调用接口添加tag
  const param: IAddUserTagParam = {
    name: state.inputValue,
    userId: sessionUserStore.userId + ''
  }
  //新增标签
  await sessionUserStore.addUserTag(param)
  //查询标签
  await sessionUserStore.queryUserTag({ id: sessionUserStore.userId + '' })
  state.inputVisible = false
  state.inputValue = ''
}
const showInput = () => {
  state.inputVisible = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
//处理标签 - 删除
const handleClose = async (tag: any) => {
  console.log(tag)
  if (tag?.id) {
    //调用接口删除
    await sessionUserStore.delUserTag(tag.id + '')
    //查询用户标签
    await sessionUserStore.queryUserTag({ id: sessionUserStore.userId + '' })
  }
}
/**
 * 处理备注
 */
const handleRemark = async () => {
  //调用接口（更新备注）
  if (_.isEmpty(state.textarea)) {
    return
  }
  const param: IUserEditRequestParam = {
    id: sessionUserStore.userId + '',
    remark: state.textarea
  }
  await sessionUserStore.updateUser(param)

  const initRequestParam = {
    sessionId: chatListStore.currentSessionId,
    userId: sessionUserStore.userId + ''
  }
  //重新查询用户信息
  await sessionUserStore.init(initRequestParam)

  state.textarea = ''
}

watch(
  () => sessionUserStore.levelName,
  (newValue, _) => {
    if (newValue) {
      const arr = UserLevel2NameList.filter((item) => item.level == newValue)
      if (arr && arr.length > 0) {
        state.levelName = arr[0].name
      }
    }
  }
)

/**
 * 会员等级
 */
const levelName = () => {
  if (sessionUserStore.levelName) {
    const arr = UserLevel2NameList.filter((item) => item.level == sessionUserStore.levelName)
    if (arr && arr.length > 0) {
      state.levelName = arr[0].name
    }
  }
}
//会员等级
levelName()
</script>

<style lang="scss" scoped>
.chat-user-info {
  width: 100%;
  min-height: 80vh;
  //   height: 100%;
  padding: 2rem 1.5rem;
  .chat-user-style {
    display: flex;
    flex-direction: row;
  }
  .user-img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 4px;
  }
  .customer-info {
    .customer-name {
      color: #434343;
      font-size: 1.125rem;
      font-weight: 500;
      margin-left: 8px;
    }
    .add-icon {
      border: 1px solid #bfbfbf;
      width: 5.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      color: #434343;
    }
  }

  .user-tag {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.75rem;
  }

  .customer-remark {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
    p {
      font-size: 14px;
    }
  }
  .customer-tag {
    margin-top: 0.6875rem;
  }
  .li-style {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    margin-top: 0.8125rem;
    .li-item {
      width: 5vw;
      display: flex;
      color: #bfbfbf;
      font-size: 0.875rem;
    }
    .li-item2 {
      font-size: 0.875rem;
      color: #434343;
    }
  }
  .tag-item {
    margin-left: 0.75rem;
  }
  :nth-child(1) {
    margin-left: 0;
  }
}

.emp-style {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 6vw;
    height: 5vw;
  }
  p {
    font-size: 12px;
    color: #ced6e0;
  }
}
</style>
