import { defineStore } from 'pinia'

/**
 * 部门搜索 store
 */
export const usePartmentSearchStore = defineStore('partment-serch', {
  state: () => {
    return {
      groupId: ''
    }
  },
  actions: {
    /**
     * 塞入
     * @param value
     */
    setGroupId(value: string) {
      this.groupId = value
    }
  }
})
