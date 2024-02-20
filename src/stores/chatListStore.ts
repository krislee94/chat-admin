import { defineStore } from 'pinia'
import {
  querySessionList,
  SessionListByCSResponse,
  allSessionRead,
  sessionUnRead,
  sessionToTop,
  sessionCancelTop,
  IQueryChatListParam
} from '@/server/session_request'
import { moment } from '@xr-util/util'
import { useTemplateRefsList } from '@vueuse/core'
import { useUserStore, useMessageStore } from '@/stores'
import { RoleList } from '@/server/employee_request'
import { timeUtilNow, timeUtilNowMoment } from '@/utils/timeUtil'

interface IChatListStateParam {
  chatList: SessionListByCSResponse[]
  currentSessionId: string
  // unReadList: string[]
}
/**
 * 会话列表
 */
export const useChatListStore = defineStore('chatListStore', {
  state: (): IChatListStateParam => {
    return {
      chatList: [],
      currentSessionId: ''
      // unReadList: []
    }
  },
  getters: {
    unReadNumber(): number {
      let number = 0
      if (this.chatList && this.chatList.length > 0) {
        this.chatList.forEach((item) => {
          number = Number(item.unreadNum || 0) + number
        })
      }
      return number
    }
  },
  actions: {
    //用户列表初始化
    async init() {
      if (!useUserStore().permissionList || !useUserStore().permissionList.includes('im:cs')) {
        return
      }
      await querySessionList({}).then((res) => {
        if (res.code == '0') {
          //@ts-ignore
          this.chatList = res.data ? res.data : []

          return res?.data ?? []
        }
      })
    },
    //搜索session-list
    searchSessionList(param: IQueryChatListParam) {
      querySessionList(param).then((res) => {
        if (res && res.code == '0') {
          //@ts-ignore
          this.chatList = res.data ? res.data : []

          return res?.data ?? []
        }
      })
    },
    //查询单个并放置到最上面 （新会话、转接过来的会话）
    getChatListSingle(sessionId: string) {
      const param = {
        sessionId
      }
      querySessionList(param).then((res) => {
        if (res && res.code == '0') {
          if (res.data && res.data.length > 0) {
            this.chatList.push(res.data[0])
            setTimeout(() => {
              if (res && res.data && res.data[0].sessionId) {
                this.sortBySessionId(res.data[0].sessionId)
              }
            }, 200)
          }
        }
      })
    },
    //塞入未读消息的sessionId
    setUnReadItem(item: string) {
      //调用接口 ，消息未读
      sessionUnRead({
        sessionId: item
      }).then((res) => {
        if (res && res.code == '0') {
          //同时找到当前的sessionId. 处理未读消息
          for (let i = 0; i < this.chatList.length; i++) {
            if (this.chatList[i].sessionId == item) {
              this.chatList[i].unreadNum = (Number(this.chatList[i].unreadNum) || 0) + 1
            }
          }
        }
      })
    },
    popReadItem(item: string) {},
    //塞入当前
    setCurrentSessionId(value: string) {
      this.currentSessionId = value
    },
    /**
     * 更改arr的顺序
     * @param arr
     */
    setChatList(arr: SessionListByCSResponse[], sessionId?: string) {
      this.chatList = arr
      if (sessionId) {
        //重新排序
        this.sortBySessionId(sessionId)
      }
    },
    //chatListStore 往后面塞(push)
    pushChatListChange(sessionId: string) {
      if (!this.chatList || this.chatList.length == 0) {
        return
      }
      const list = this.chatList
      let index = -1
      for (let i = 0; i < list.length; i++) {
        if (list[i].sessionId == sessionId) {
          index = i
        }
      }
      if (index > -1) {
        //清除会话
        this.chatList.splice(index, 1)[0]
        this.chatList = list
        useMessageStore().switchMessage()
      }
    },
    //unshiftChatList 往前面塞
    unshiftChatListChange(sessionId: string) {},
    /**
     * 会话消息已读
     * @param sessionId
     */
    async sessionAllRead(sessionId: string) {
      allSessionRead({
        sessionId: sessionId
      }).then((res) => {
        if (res && res.code == '0') {
          //查找当前的sessionId.把未读消息重置为0.
          const arr = this.chatList.filter((item) => item.sessionId == sessionId)
          if (arr && arr.length > 0) {
            arr[0].unreadNum = 0
          }
        }
      })
    },

    /**
     * 会话置顶
     */
    async sessionToTop(sessionId: string) {
      await sessionToTop({
        sessionId
      }).then((res) => {
        if (res && res.code == '0') {
          //吧当前会话塞到第一位。
          let index = -1
          for (let i = 0; i < this.chatList.length; i++) {
            if (this.chatList[i].sessionId == sessionId) {
              this.chatList[i].topPlace = true
              this.chatList[i].topPlaceTime = timeUtilNowMoment()
              index = i
            }
          }
          if (index > -1) {
            const arr = this.chatList.splice(index, 1)[0]
            this.chatList.unshift(arr)
          }
        }
      })
    },

    /**
     * 取消会话置顶
     */
    async sessionToBottom(sessionId: string) {
      await sessionCancelTop({
        sessionId
      }).then((res) => {
        if (res && res.code == '0') {
          this.chatList = this.chatList.map((item) => {
            if (item.sessionId == sessionId) {
              item.topPlace = false
            }
            return item
          })
          setTimeout(() => {
            //重新排序
            this.sortBySessionId(sessionId)
          }, 200)
        }
      })
    },

    /**
     * 根据sessionId重新排序
     *
     */
    sortBySessionId(sessionId: string) {
      if (this.chatList && this.chatList.length > 0) {
        //筛选出 置顶的
        const toPlace = this.chatList.filter((item) => item.topPlace) || []
        //筛选出未置顶的
        const unPlace = this.chatList.filter((item) => !item.topPlace) || []
        let index = -1
        if (unPlace && unPlace.length > 0) {
          for (let i = 0; i < unPlace.length; i++) {
            if (unPlace[i].sessionId == sessionId) {
              index = i
            }
          }

          if (index > -1) {
            const item = unPlace.splice(index, 1)[0]
            unPlace.unshift(item)
          }
        }
        //联合
        this.chatList = toPlace.concat(unPlace)
      }
    },
    setTranslation(sessionId: string, translationSwitch: boolean) {
      this.chatList
        .filter((chat) => chat.sessionId === sessionId)
        .map((chat) => (chat.translationSwitch = translationSwitch))
    },
    cleanChatList() {
      this.chatList = []
      this.currentSessionId = ''
    }
  }
  // //持久化
  // persist: {
  //   // storage: sessionStorage
  // }
})
