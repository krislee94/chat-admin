import { defineStore } from 'pinia'
import { employeeGroupList, EmployeeGroupResponse } from '@/server/customer_group'

/**
 * 定义分组store
 */
interface ICustomerGroupParam {
  id: string
  name: string
}
interface IStateParam {
  customerGroup: ICustomerGroupParam[]
}

export const useCustomerGroupStore = defineStore('customerStore', {
  state: (): IStateParam => {
    return {
      customerGroup: []
    }
  },
  actions: {
    getCustomerGroup() {
      employeeGroupList({}).then((res) => {
        if (res && res.code == '0') {
          //@ts-ignore
          this.customerGroup = res.data ? res.data : []
        }
      })
    },
    setGroup(value: any) {
      this.customerGroup = value
    }
  }
})
