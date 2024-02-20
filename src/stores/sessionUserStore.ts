import { defineStore } from 'pinia'
import {
  querySessionUserInfo,
  SessionUserInfoResponse,
  IGetSessionUserInfoParam
} from '@/server/session_request'

import {
  addSessinUserTag,
  delSessionUserTag,
  querySessionUserTag,
  IAddUserTagParam
} from '@/server/user_tag_request'
import { IdRequestParam } from '@/utils/request'
import { IUserEditRequestParam, updateUserInfo } from '@/server/user_request'
import { useMessageStore } from './messageStore'
import { userDetails } from '@/server/third_friend_request'

interface ISessionUserStoreParam extends SessionUserInfoResponse {
  userTagList?: Array<any>
  friendId: string
}

/**
 * 会话用户信息
 */
export const useSessionUserStore = defineStore('session_user_store', {
  state: (): ISessionUserStoreParam => {
    return {
      headerImgUrl: '',
      /**
       * 用户等级
       */
      levelName: '',
      /**
       * 商户ID
       */
      merchantId: 0,
      /**
       * 商户名称
       */
      merchantName: '',
      /**
       * 商户外部用户ID
       */
      merchantUserId: '',
      /**
       * 昵称
       */
      nickName: '',
      /**
       * 用户备注
       */
      remark: '',
      /**
       * 请求IP
       */
      requestIp: '',
      /**
       * 请求来源地址
       */
      requestSourceUrl: '',
      /**
       * 用户ID
       */
      userId: 0,
      /**
       * 用户标签
       */
      userTagList: [],
      /**
       * 好友关系ID
       */
      friendId: ''
    }
  },
  actions: {
    /**
     * 初始化(用户信息)
     */
    async init(param: IGetSessionUserInfoParam) {
      if (!param.sessionId || !param.userId) {
        return
      }
      //查询用户信息
      await querySessionUserInfo(param).then((res) => {
        //赋值
        if (res.code == '0') {
          this.headerImgUrl = res?.data?.headerImgUrl
          this.levelName = res?.data?.userLevel
          this.userLevel = res?.data?.userLevel
          this.merchantId = res?.data?.merchantId
          this.merchantName = res?.data?.merchantName
          this.merchantUserId = res?.data?.merchantUserId
          this.nickName = res?.data?.nickName
          this.remark = res?.data?.remark
          this.requestIp = res?.data?.requestIp
          this.requestSourceUrl = res?.data?.requestSourceUrl
          this.userId = res?.data?.userId

          useMessageStore().setParams({
            senderImg: res?.data?.headerImgUrl,
            senderName: res?.data?.nickName
          })
        }
      })
      //查询标签
      const tagRequest: IdRequestParam = {
        id: param.userId + ''
      }
      await this.queryUserTag(tagRequest)
    },

    //查询用户标签
    async queryUserTag(param: IdRequestParam) {
      await querySessionUserTag(param).then((res) => {
        if (res.code == '0') {
          this.userTagList = res.data
        }
      })
    },

    //新增<add-tag>
    async addUserTag(param: IAddUserTagParam) {
      await addSessinUserTag(param)
    },

    //删除<del-tag>
    async delUserTag(id: string) {
      await delSessionUserTag({ id: id })
    },

    //更新用户信息
    async updateUser(param: IUserEditRequestParam) {
      if (!param.id) {
        return
      }
      await updateUserInfo(param)
    },

    //查询用户信息 和 tag
    async queryUserInfo(id: string) {
      await userDetails({
        id
      }).then((res) => {
        if (res && res.code == '0') {
          this.headerImgUrl = res?.data?.headerImgUrl
          this.levelName = res?.data?.userLevel
          this.userLevel = res?.data?.userLevel
          this.merchantId = res?.data?.merchantId
          this.merchantName = res?.data?.merchantName
          this.merchantUserId = res?.data?.merchantUserId
          this.nickName = res?.data?.nickName
          this.remark = res?.data?.remark
          // this.requestIp = res?.data?.requestIp
          // this.requestSourceUrl = res?.data?.requestSourceUrl
          this.userId = res?.data?.userId
          this.friendId = res?.data?.friendId + ''
        }
      })

      //查询标签
      const tagRequest: IdRequestParam = {
        id
      }
      await this.queryUserTag(tagRequest)
    }
  }
})
