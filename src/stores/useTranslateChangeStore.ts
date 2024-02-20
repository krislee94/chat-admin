import { defineStore } from 'pinia'

/**
 * 处理新用户会话转接功能
 * 
 * eg:
 * -->  // Message from Server: {"content":{"merchantName":"米哈游","newEmployeeId":"1651545668950728705",
 * "nickName":"001","oldEmployeeId":"1650033308414439425","reason":"",
 * "sessionId":"1663085357650616321","userLabelReplies":[]},"eventTime":"2023-06-06 15:30:30.671",
 * "eventType":"SESSION_PRE_TRANSFER"}
 * 
 * 
 * @author krislee

 */
export const useTranslatChangeStore = defineStore('translatChangeStore', {
  state: () => {
    return {
      //是否展示
      visible: false,
      //时间
      timeSecond: 30,
      //定时器
      timer: -1,
      //应用名称
      merchantName: '',
      //前客服ID
      oldEmployeeId: '',
      //当前客服
      newEmployeeId: '',
      //用户名称
      nickName: '',
      headerImgUrl: '',
      //sessionId 会话ID
      sessionId: '',
      //转接理由
      reason: '',

      //自己的时间
      self: {
        visible: false,
        selfTimer: -1,
        newEmployeeName: '',
        selfSecond: 30
      }
    }
  },

  actions: {
    setParam(param: any): void {
      if (param && param.merchantName) {
        this.merchantName = param.merchantName
      }

      if (param && param.oldEmployeeId) {
        this.oldEmployeeId = param.oldEmployeeId
      }

      if (param && param.nickName) {
        this.nickName = param.nickName
      }

      if (param && param.sessionId) {
        this.sessionId = param.sessionId
      }

      if (param && param.newEmployeeId) {
        this.newEmployeeId = param.newEmployeeId
      }

      if (param && param.headerImgUrl) {
        this.headerImgUrl = param.headerImgUrl
      }
    },

    show() {
      this.visible = true
      this.startInterval()
    },

    //开始定时器
    startInterval() {
      return new Promise((resolve, reject) => {
        this.timer = setInterval(() => {
          if (this.timeSecond > 0) {
            this.timeSecond = this.timeSecond - 1
          } else {
            this.close()
          }
        }, 1000)
      })
    },

    close() {
      this.timer && clearInterval(this.timer)
      this.resetParam()
    },

    //重置
    resetParam() {
      this.visible = false
      this.timeSecond = 30
      this.timer = -1
      this.merchantName = ''
      this.oldEmployeeId = ''
      this.newEmployeeId = ''
      this.nickName = ''
      this.sessionId = ''
      this.reason = ''
      this.headerImgUrl = ''
    },

    startSelfInterval() {
      this.self.visible = true
      return new Promise((resolve, reject) => {
        this.self.selfTimer = setInterval(() => {
          if (this.self.selfSecond > 0) {
            this.self.selfSecond = this.self.selfSecond - 1
          } else {
            //重置
            this.closeSelf()
          }
        }, 1000)
      })
    },

    setSelfParam(value: string) {
      this.self.newEmployeeName = value
    },

    closeSelf() {
      this.self.visible = false
      this.self.selfTimer && clearInterval(this.self.selfTimer)
      this.self.newEmployeeName = ''
      this.self.selfSecond = 30
    }
  }
})
