import { defineStore } from 'pinia'
//@test
import { customerInfo } from '@/api/mock'
import { CSLevel } from '@/server/employee_request'

/**
 * 客户 信息事件
 */

export interface ICustomerParam {
  /**
   * 客户头像
   */
  customerImg?: string
  /**
   * 客户名称
   */
  customerName?: string
  /**
   * 客户标签
   */
  customerTag?: Array<any>
  /**
   * 客户登记
   */
  customerLevel?: string
  /**
   * 客户备注
   */
  customerRemark?: string

  /**
   * 来源信息
   */
  fromInfo?: string
  /**
   * 接入方式
   */
  fromWay?: string

  /**
   * 来源IP
   */
  fromIp?: string
  /**
   * 来源系统
   */
  fromSystem?: string

  /**
   * 浏览器
   */
  browser?: string

  customerId?: string

  platformId?: string

  platformName?: string
}
export const useCustomerStore = defineStore('customer', {
  state: (): ICustomerParam => {
    return {
      customerId: '',
      customerImg: '',
      customerName: '',
      customerTag: [],
      customerLevel: '',
      customerRemark: '',
      platformId: '',
      platformName: '',
      fromInfo: '',
      fromWay: '',
      fromIp: '',
      fromSystem: '',
      browser: ''
    }
  },
  //触发事件
  actions: {
    init() {
      this.customerId = customerInfo.customerId
      this.customerImg = customerInfo.customerImg
      this.customerName = customerInfo.customerName
      this.customerLevel = customerInfo.customerLevel
      this.customerRemark = customerInfo.customerRemark
      this.customerTag = customerInfo.customerTag
      this.fromInfo = customerInfo.fromInfo
      this.fromWay = customerInfo.fromWay
      this.fromIp = customerInfo.fromIp
      this.fromSystem = customerInfo.fromSystem
      this.platformId = customerInfo.platformId
      this.platformName = customerInfo.platformName
    },
    //新增标签
    addTag(name: string) {
      //name
      // this.customerTag =
    },
    //删除标签
    deleteTag(id: string) {
      this.customerTag =
        this.customerTag && this.customerTag.length > 0
          ? this.customerTag.filter((tag) => tag.id !== id)
          : []
    }
  }
})
