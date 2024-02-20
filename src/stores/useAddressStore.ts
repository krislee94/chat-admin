import { defineStore } from 'pinia'

/**
 * 通讯录STORE管理
 */
export const useAddressStore = defineStore('address', {
  state: () => {
    return {
      platform: 'zalo',
      accountId: '',
      userId: '',
      accountList: []
    }
  },

  actions: {
    setPlatform(value: string) {
      this.platform = value
    },
    setAccountId(value: string) {
      this.accountId = value
    },
    setUserId(value: string) {
      this.userId = value
    },
    setAccountList(value: any) {
      this.accountList = value
    }
  }
})
