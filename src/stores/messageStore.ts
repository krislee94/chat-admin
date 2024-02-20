import { defineStore } from 'pinia'
import {
  ISessionChatRecordRequest,
  ISessionChatRecordResponseParam,
  queryCsHistoryRecord
} from '@/server/session_request'
import { v4 as uuidv4 } from 'uuid'
import { UserType } from './useWebSocketStore'
import { timeUtilNowMoment } from '@/utils/timeUtil'
import { useUserStore } from './userStore'

/**
 * message-store 只记录和处理当前聊天内容。
 * 1. 请求接口，拿到最近20条消息，进行处理
 * 2. 根据socket内容 。 处理塞入
 */
export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      sessionId: '',
      userId: '',
      senderImg: '',
      senderName: '',
      geterImg: '',
      data: [] as any,
      newMessageNumber: 0,
      translationSwitch: false,
      fastReply: '',
      isNeedUpdate: true
    }
  },
  actions: {
    /**
     * 塞入值
     */
    setParams(param: any) {
      if (param?.sessionId) {
        this.sessionId = param.sessionId
      }
      if (param?.userId) {
        this.userId = param.userId
      }
      if (param?.senderImg) {
        this.senderImg = param.senderImg
      }
      if (param?.senderName) {
        this.senderName = param.senderName
      }
      if (param?.geterImg) {
        this.geterImg = param.geterImg
      }
      if (param?.fastReply) {
        this.fastReply = param.fastReply
      }
      if (param?.isNeedUpdate) {
        this.isNeedUpdate = true
      }
    },
    setTranslation(value: boolean) {
      this.translationSwitch = value
    },
    //切换导航。 重新塞入
    switchMessage() {
      this.sessionId = ''
      this.userId = ''
      this.senderImg = ''
      this.senderName = ''
      this.geterImg = ''
      this.data = []
      this.newMessageNumber = 0
      this.isNeedUpdate = true
    },
    setNewMessageNumber() {
      this.newMessageNumber = this.newMessageNumber + 1
    },
    /**
     * 塞入sessionId
     *
     * @param value
     */
    setSessionId(value: string) {
      this.sessionId = value
    },
    /**
     * 来了ws消息，塞入
     *
     * @param obj
     */
    setData(obj: any) {
      this.data.push(obj)
    },
    clearData() {
      this.data = []
    },
    clearFastReply() {
      this.fastReply = ''
    },

    //刷新聊天消息
    refreshMsgHistory() {
      const param: ISessionChatRecordRequest = {
        sessionId: this.sessionId,
        size: 20
      }
      queryCsHistoryRecord(param).then((res) => {
        this.data = this.msgHistoryRecordConverter(res)
      })
    },

    //append聊天记录
    appendMsgHistory: function () {
      if (!this.sessionId) {
        return
      }
      if (!this.isNeedUpdate) {
        return
      }
      const size = 20
      const param: ISessionChatRecordRequest = {
        sessionId: this.sessionId,
        size: size,
        recordId: this.data[0].recordId
      }
      queryCsHistoryRecord(param).then((res) => {
        const msgList = this.msgHistoryRecordConverter(res)
        if (msgList.length <= 0) {
          this.isNeedUpdate = false
          return
        }
        this.data = msgList.concat(this.data)
        if (msgList.length < size) {
          this.isNeedUpdate = false
        }
      })
    },
    //查询消息历史
    msgHistoryRecordConverter(res: ISessionChatRecordResponseParam): any[] {
      if (!res || res.code != '0') {
        return []
      }
      if (!res.data || res.data.length <= 0) {
        return []
      }
      const arr: any[] = []
      res.data.forEach((item) => {
        const obj = {
          id: item?.id ?? uuidv4(),
          recordId: item?.id,
          userType: item?.senderInfo?.userType,
          messageType: item?.msgType || 'TEXT',
          content: item.body,
          sendTime: item?.sendTime ?? '',
          senderUserId: item?.senderInfo?.id,
          translationText: item?.translationText ?? '',
          withdraw: item?.withDraw ?? false,
          recordFileKeys: item?.recordFileKeys || []
        }
        arr.push(obj)
      })
      return arr
    },

    //删除消息《以后也可以用到消息撤回》
    delMessageListItem(id: string) {
      let index = -1
      if (this.data && this.data.length > 0) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id == id) {
            index = i
          }
        }
      }
      //删除当前消息
      if (index > -1) {
        this.data.splice(index, 1)[0]
      }
    },

    //消息撤回
    widthDrawMessage(id: string) {
      //接受 recordId
      let index = -1
      if (this.data && this.data.length > 0) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id == id) {
            index = i
          }
        }
      }

      if (index > -1) {
        const messageItem = this.data[index]
        //塞入一个
        const obj = {
          id: uuidv4(),
          recordId: '',
          userType: messageItem.userType,
          messageType: 'TEXT',
          content: 'This message was recalled',
          sendTime: timeUtilNowMoment(),
          senderUserId: useUserStore().id || '',
          translationText: '',
          withdraw: true
        }
        this.data.splice(index, 1, obj)
      }
    }
  }
})
