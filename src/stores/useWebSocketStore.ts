import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { useMessageStore } from './messageStore'
import { useChatListStore } from './chatListStore'
import { useTranslatChangeStore } from './useTranslateChangeStore'
//@ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { timeUtilNowMoment } from '@/utils/timeUtil'
import { noticeWarning } from '@xr-util/xr-ui'

// import { Base64 } from 'js-base64'

interface IWebSocket {
  ws: any
  isConnected: boolean
  //是否主动关闭socket
  isTakeClose: boolean
  //网络状态
  onlineOrOffline: boolean
  interval: any
  sessionId: string
  userId: string
  merchantInfo: IMessageMerchantParam
  userInfo: IMessageUserParam
  audioIns: any
}

interface IMessageMerchantParam {
  merchantId?: string
  merchantName?: string
  merchantImgUrl?: string
}

interface IMessageUserParam {
  userId?: string
  userImgUrl?: string
}

/**
 * 消息类型
 */
export enum MessageType {
  Audio = 'AUDIO',
  Emoji = 'EMOJI',
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT',
  Tip = 'TIP',
  Video = 'VIDEO'
}

export enum UserType {
  CustomerService = 'CUSTOMER_SERVICE',
  System = 'SYSTEM',
  User = 'USER'
}

export const useWebSocketStore = defineStore('websocket', {
  state: (): IWebSocket => {
    return {
      ws: null,
      isConnected: true,
      isTakeClose: false,
      onlineOrOffline: true,
      interval: null,
      sessionId: '',
      userId: '',
      merchantInfo: {},
      userInfo: {},
      audioIns: null
    }
  },

  actions: {
    //---------------------------功能相关------------------------------------
    /**
     * 塞入sessionId
     * @param value
     */
    setSessionId(value: string) {
      if (!value) return
      this.sessionId = value
    },
    /**
     * 塞入UserId
     */
    setUserId(value: string) {
      if (!value) return
      this.userId = value
    },

    //--------------------------websocket相关--------------------------------------
    //连接
    connect() {
      if (
        this.ws &&
        (this.ws.readyState == WebSocket.OPEN || this.ws.readyState == WebSocket.CONNECTING)
      ) {
        console.log(`连接已建立，无需再次连接`, this.ws.readyState)
        return
      }
      // const wsUrl = import.meta.env.VITE_WS_URL
      const localtion = window.location.hostname
      const port = window.location.port
      const gateway = import.meta.env.VITE_GATEWAY
      this.ws = new WebSocket(
        `ws://${localtion}:${port}${gateway}/msg/ws/join/employee?token=${useUserStore().token}`
      )

      this.ws.addEventListener('open', () => {
        console.log('WebSocket连接已建立')
        this.isConnected = true
        this.isTakeClose = false
      })

      this.ws.addEventListener('close', (e: any) => {
        this.isConnected = false
        console.error('WebSocket连接断开', JSON.stringify(e), this.isTakeClose)
      })

      this.ws.addEventListener('message', (event: any) => {
        console.log('Message from Server: ' + event.data)
        // {"content":{"body":"了不起\n","messageTypeEnum":"TEXT","sendTime":"2023-04-10 18:21:22","sendUserId":1644283040761372673,"sessionId":1644283040826044417},"eventTime":"2023-04-10 18:21:22","eventType":"SEND_MSG"}
        if (event.data && event.data != 'pong') {
          const messageInfo: any = JSON.parse(JSON.parse(JSON.stringify(event.data)))
          if (messageInfo && messageInfo?.eventId) {
            //收到消息，回复
            this.send({
              eventId: messageInfo.eventId + '',
              eventTime: new Date(),
              eventType: 'RECEIVE_REPLY'
            })
          }
          //是否是当前会话
          if (messageInfo.content.sessionId == useMessageStore().sessionId) {
            //处理会话 ->
            if (messageInfo && messageInfo.content && messageInfo.content.body) {
              let userType = UserType.System
              if (messageInfo.content.msgType == 'TIP') {
                userType = UserType.System
              } else if (messageInfo.content.sendUserId == useUserStore().id) {
                userType = UserType.CustomerService
              } else if (messageInfo.content.sendUserId != useUserStore().id) {
                userType = UserType.User
              }
              const obj = {
                id: messageInfo.content?.recordId ?? uuidv4(),
                userType: userType,
                messageType:
                  messageInfo.content?.messageTypeEnum || messageInfo.content?.msgType || 'TEXT',
                content: messageInfo.content?.body ?? '',
                sendTime: messageInfo.content?.sendTime ?? '',
                sendUserId: messageInfo.content?.sendUserId ?? '',
                translationText: messageInfo.content?.translationText ?? '',
                withdraw: false,
                recordFileKeys: messageInfo?.content?.recordFileKeys || []
              }
              //塞入聊天数据
              useMessageStore().setData(obj)
              if (userType == UserType.User) {
                //播放语音
                this.playAudio()
              }
              //异步调用最新一条记录
              this.updateChatListStore(messageInfo, false)
            } else if (messageInfo && messageInfo.eventType) {
              //处理<EventType>
              if (messageInfo.eventType == 'SESSION_TRANSFER') {
                //会话转出
                // {"content":{"newEmployeeId":"1642757977402306562","oldEmployeeId":"1639084819549843458","sessionId":"1645767774944808961"},"eventTime":"2023-04-14 10:24:11","eventType":"SESSION_TRANSFER"}
                //需要从聊天会话框中删除该会话。
                if (
                  messageInfo.content &&
                  messageInfo.content.newEmployeeId &&
                  messageInfo.content.oldEmployeeId
                ) {
                  if (messageInfo.content.newEmployeeId != useUserStore().id) {
                    useTranslatChangeStore().closeSelf()
                    useChatListStore().pushChatListChange(useMessageStore().sessionId)
                  }
                }
              } else if (messageInfo.eventType == 'SESSION_END') {
                //会话结束
                //逻辑层处理放在 接口处理了。 不需要特别处理
              } else if (messageInfo.eventType == 'MSG_WITHDRAW') {
                //消息撤回
                // Message from Server: {"content":{"recordId":"1660923115717111810","sessionId":"1660571902168178689"},"eventTime":"2023-05-23 16:20:03.514","eventType":"MSG_WITHDRAW"}
                useMessageStore().widthDrawMessage(messageInfo.content.recordId)
              } else if (
                messageInfo?.eventType &&
                messageInfo?.eventType == 'MSG_SENSITIVE_KEY_WARN'
              ) {
                //敏感词被触发
                this.playWarningAudio(messageInfo)
              }
            }
          } else {
            //处理消息列表 未读消息
            //获取chatListStore.chatList
            const list = useChatListStore().chatList || []
            let len = -1
            if (list && list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                if (list[i].sessionId == messageInfo.content.sessionId) {
                  len = i
                }
              }
            }
            if (len > -1) {
              // let chatItem = list.splice(len, 1)[0]
              // let chatItem = ;
              //处理未读消息
              list[len].unreadNum = list[len]?.unreadNum ? Number(list[len].unreadNum) + 1 : 1
              //处理最后一条消息
              list[len].lastMsg = {
                body: messageInfo?.content?.body ?? '',
                sendTime: timeUtilNowMoment(),
                senderInfo: {
                  id: messageInfo?.content?.senderUserId || ''
                },
                msgType: messageInfo.content?.msgType || 'TEXT'
              }

              useChatListStore().setChatList(list, list[len].sessionId)
            } else {
              //有可能是新会话
              // {"content":{"sessionId":"1665965089187958785"},"eventTime":"2023-06-06 14:13:24.139","eventType":"SESSION_NEW"}
              // {"content":{"sessionId":"1648588695184150530"},"eventTime":"2023-04-19 15:25:49","eventType":"SESSION_NEW"}
              if (
                messageInfo &&
                messageInfo.content &&
                messageInfo.content.sessionId &&
                messageInfo.eventType &&
                messageInfo.eventType == 'SESSION_NEW'
              ) {
                //这里延迟一秒，等待后端事务执行完成之后，再走该程序
                setTimeout(() => {
                  //需要根据sessionId查询会话信息，然后塞入chatListStore
                  useChatListStore().getChatListSingle(messageInfo.content.sessionId)
                }, 1000)
              } else if (
                messageInfo.content &&
                messageInfo.content.sessionId &&
                messageInfo.content.newEmployeeId &&
                messageInfo.content.oldEmployeeId &&
                messageInfo.eventType &&
                messageInfo.eventType == 'SESSION_TRANSFER'
              ) {
                //其他会话转过来，需要添加
                // {"content":{"newEmployeeId":"1639084819549843458","oldEmployeeId":"1647881705718890497",
                // "sessionId":"1648596806580768770"},"eventTime":"2023-04-19 15:59:27","eventType":"SESSION_TRANSFER"}
                // if (messageInfo.content.newEmployeeId == useUserStore().id) {
                //   useChatListStore().getChatListSingle(messageInfo.content.sessionId)
                // }
              } else if (
                messageInfo?.content?.sessionId &&
                messageInfo.eventType &&
                messageInfo.eventType == 'SESSION_PRE_TRANSFER'
              ) {
                // Message from Server: {"content":{"merchantName":"米哈游","newEmployeeId":"1651545668950728705","nickName":"001","oldEmployeeId":"1650033308414439425","reason":"","sessionId":"1663085357650616321","userLabelReplies":[]},"eventTime":"2023-06-06 15:30:30.671","eventType":"SESSION_PRE_TRANSFER"}
                useTranslatChangeStore().setParam(messageInfo.content)
                useTranslatChangeStore().show()
              } else if (
                messageInfo?.eventType &&
                messageInfo.eventType == 'MSG_SENSITIVE_KEY_WARN'
              ) {
                //会话监管 - 告警信息
                this.playWarningAudio(messageInfo)
              }
            }
            this.sendNotice(messageInfo.content?.body ?? 'New Message')
            //播放音频
            this.playAudio(messageInfo)
          }
        }
      })
    },
    /**
     * 发送websocket消息
     *
     * @param data
     */
    send(data: any) {
      try {
        if (this.isConnected) {
          this.ws.send(JSON.stringify(data))
        } else {
          console.warn('webSocket is closed')
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 关闭websocket连接
     */
    async close() {
      this.isConnected = false
      this.isTakeClose = true
      //清空定时器

      this.ws && this.ws.close()
      this.ws &&
        this.ws.removeEventListener('message', () => {
          console.log('断开消息监听')
        })
      this.ws &&
        this.ws.removeEventListener('open', () => {
          console.log('断开连接监听')
        })
      this.ws &&
        this.ws.removeEventListener('close', () => {
          console.log('断开关闭监听')
        })

      this.cancelHeart()
    },
    /**
     * 维持socket心跳
     *
     */
    keepHeart() {
      if (this.interval) {
        console.log('定时器已存在，无需ping')
        return
      }

      this.interval = setInterval(() => {
        this.send('ping')
      }, 6000)
    },

    /**
     * 取消socket心跳
     */
    cancelHeart() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },

    updateChatListStore(messageInfo: any, isNeedUpdate: boolean) {
      const list = useChatListStore().chatList || []
      let len = -1
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].sessionId == messageInfo.content.sessionId) {
            len = i
          }
        }
      }
      if (len > -1) {
        // let chatItem = list.splice(len, 1)[0]
        // let chatItem = ;
        //处理未读消息
        if (isNeedUpdate) {
          list[len].unreadNum = list[len]?.unreadNum ? Number(list[len].unreadNum) + 1 : 1
        }

        //处理最后一条消息
        list[len].lastMsg = {
          body: messageInfo?.content?.body ?? '',
          sendTime: timeUtilNowMoment(),
          senderInfo: {
            id: messageInfo.content.sendUserId || ''
          },
          msgType: messageInfo?.content.msgType || MessageType.Text
        }

        useChatListStore().setChatList(list, list[len].sessionId)
      }
    },

    webSokcetStatus() {
      if (this.ws) {
        return this.ws.readyState
      } else {
        return WebSocket.CLOSED
      }
    },

    setOnline(value: boolean) {
      this.onlineOrOffline = value
    },

    //语音消息提醒
    playAudio(messageInfo?: any) {
      if (messageInfo?.eventType && messageInfo?.eventType == 'MSG_SENSITIVE_KEY_WARN') {
        return
      }

      if (this.audioIns != null) {
        this.audioIns.pause()
        this.audioIns = null
      }
      if (!useUserStore().enableNoticeMusic) return
      let url = ''
      if (useUserStore().noticeMusicUrl) {
        url = useUserStore().noticeMusicUrl
      } else {
        url = useUserStore().audioSystemUrls[0].url
      }
      this.audioIns = new Audio(`${url}`)
      this.audioIns.play()
    },

    //告警提示音
    playWarningAudio(messageInfo?: any) {
      noticeWarning({
        title: 'Sensitive Word Warning',
        message: `Sensitive words are triggered:${messageInfo?.content?.sensitiveKey}`
      })
      if (this.audioIns != null) {
        this.audioIns.pause()
        this.audioIns = null
      }
      if (!useUserStore().enableNoticeMusic) return
      let url = ''
      if (useUserStore().warnMusicUrl) {
        url = useUserStore().warnMusicUrl
      } else {
        url = useUserStore().audioWarningUrls[0].url
      }

      this.audioIns = new Audio(`${url}`)
      this.audioIns.play()
    },

    sendNotice(body: string) {
      console.log(this.isBrowserHidden())
      if (useUserStore().isAllowNotice == 1 && this.isBrowserHidden()) {
        const notification = new Notification('Message Notification', {
          body: `${body}`,
          icon: 'https://github.com/krislee94/img-service/assets/26591239/61b821d5-2df0-41af-849c-38a0bac23ca4'
        })
        console.log('111111', notification)
        // 点击通知时的操作
        notification.onclick = function () {
          console.log('通知被点击')
        }
      }
    },

    isBrowserHidden() {
      return document.visibilityState === 'hidden'
    },

    presist: {
      path: ['interval'],
      storage: sessionStorage
    }
  }
})
