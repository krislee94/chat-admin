/**
 * 快捷键store
 */
import { defineStore } from 'pinia'

import { getDetailFastSet } from '@/server/user_fast_request'

/**
 * 快捷键设置
 */
export const useHotKeyStore = defineStore('hotkey', {
  state: () => {
    return {
      sendKey: 'Enter',
      newLine: 'Ctrl+Enter'
    }
  },
  actions: {
    /**
     * 获取快捷键详情
     */
    async getHotKeyDetail() {
      await getDetailFastSet().then((res) => {
        if (res && res.code == '0') {
          this.sendKey = res?.data?.sendMsg ?? 'Enter'
          this.newLine = res?.data?.dialogNewline ?? 'Ctrl+Enter'
        }
      })
    },
    /**
     * 设置快捷键
     *
     * @param value
     */
    setHotKey(value: string) {
      if (!value) return
      this.sendKey = value
    }
  },
  persist: {
    storage: sessionStorage
  }
})
