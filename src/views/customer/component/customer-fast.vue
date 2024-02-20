<!-- 快捷回复折叠面板 -->
<template>
  <div class="fast-reply-customer">
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      accordion
      v-if="state.groupList && state.groupList.length > 0"
    >
      <el-collapse-item :title="item.name" :name="item.id" v-for="item in state.groupList">
        <div
          v-for="reply in state.fastReplyList"
          class="content-box j-row-center"
          @click="clickAdd(reply)"
        >
          <span>{{ reply.content }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="no-fast-reply" v-if="!state.groupList || state.groupList.length < 1">
      <img src="@/assets/empty-fast-set.png" />

      <span>{{ $t('CHAT.unset_fast_reply') }}</span>

      <el-button @click="goSet" type="primary" link style="margin-top: 0.56rem">{{
        $t('CHAT.go_set')
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  queryFastGroup,
  Type,
  FastReplyGroupResponse,
  fastReplyList,
  IFastReplyListRequest,
  FastReplyResponse
} from '@/server/user_fast_request'
import { ref, reactive } from 'vue'
import { useMessageStore, useUserStore } from '@/stores'
import { IconPark } from '@icon-park/vue-next/es/all'
import { useRouter } from 'vue-router'
import { RoleList } from '@/server/employee_request'
const router = useRouter()
interface IStateParam {
  groupList: FastReplyGroupResponse[]
  fastReplyList: FastReplyResponse[]
}

const userStore = useUserStore()
const activeNames = ref([''])
const handleChange = (val: string) => {
  if (!val) return
  const param: IFastReplyListRequest = {
    groupId: val
  }
  //查询分组详情
  fastReplyList(param).then((res) => {
    if (res && res.code == '0') {
      if (res.data && res.data.length > 0) {
        state.fastReplyList = res.data ? res.data : []
      }
    }
  })
}

const state: IStateParam = reactive({
  groupList: [],
  fastReplyList: []
})

/**
 * 初始化
 */
const init = () => {
  if (!userStore.permissionList && !userStore.permissionList.includes('im:cs')) {
    return
  }
  queryFastGroup({
    type: Type.Employee
  }).then((res) => {
    if (res && res.code == '0') {
      if (res.data && res.data.length > 0) {
        //分配分组。
        state.groupList = res.data.filter((item) => item.useChannel == 'DEFAULT')
      }
    }
  })
}
init()

/**
 * 双击添加到会话框
 */
const clickAdd = (reply: FastReplyResponse) => {
  //用户产生双击行为
  if (reply && reply.content) {
    useMessageStore().setParams({ fastReply: reply.content })
  }
}

const goSet = () => {
  router.push('/setting/chat/fastReply')
}
</script>

<style lang="scss" scoped>
.fast-reply-customer {
  padding: 1.25rem;

  .goto-set-box {
    width: 100%;
    height: 2rem;
  }

  .content-box {
    padding-left: 1.25rem;
    height: 2rem;
    cursor: pointer;
    span {
      color: #434343;
      font-size: 0.875rem;
    }
  }

  .content-box:hover {
    background-color: #e5f4ff;
  }

  .tooltip-width {
    max-width: 200px;
    margin-top: 10px;
  }

  .no-fast-reply {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
    img {
      width: 4.5rem;
      height: 3.875rem;
    }

    span {
      font-size: 0.875rem;
      color: #434343;
      margin-top: 1rem;
    }
  }
}
</style>
