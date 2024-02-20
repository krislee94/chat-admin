/**
 * 应用 （游戏） 接入
 */
import { IdRequestParam, ResWrap, service } from '@/utils/request'
import { gameInModule } from '@/api'

/**
 * MerchantListRequest
 */
export interface IGameListRequestParam {
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number

  merchantName?: string
}

export interface IGameListResponseParam {
  pageNo?: number
  pageSize?: number
  total?: number
  dataList?: Array<IGameListItem>
}

export interface IGameListItem {
  id?: string
  name?: string
  headerImgUrl?: string
  remark?: string
  createTime?: string
  updateTime?: string
}

/**
 * MerchantAddRequest
 */
export interface IMerchantAddRequestParam {
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 商户名称
   */
  name?: string
  /**
   * 备注
   */
  remark?: string
}

/**
 * MerchantEditRequest
 */
export interface IMerchantEditRequest {
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 商户ID
   */
  id?: number
  /**
   * 商户名称
   */
  name?: string
  /**
   * 备注
   */
  remark?: string
}

/**
 * void
 *
 * Response«MerchantResponse»
 */
export interface IGameDetailResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: MerchantResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * MerchantResponse
 */
export interface MerchantResponse {
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 商户名称
   */
  name?: string
  distributionLevelSwitch?: boolean
  distributionUserSwitch?: boolean
  /**
   * 备注
   */
  remark?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * void
 *
 * Response«List«MerchantDistLevelResponse»»
 */
export interface IMerchantDistLevelResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: MerchantDistLevelResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * MerchantDistLevelResponse
 */
export interface MerchantDistLevelResponse {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 用户等级
   */
  userLevelList?: UserLevelList[]
}

/**
 * 客服等级
 */
export enum CSLevel {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30'
}

export enum UserLevelList {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30',
  Level40 = 'LEVEL_40',
  Level50 = 'LEVEL_50',
  Level60 = 'LEVEL_60',
  Level70 = 'LEVEL_70',
  Level80 = 'LEVEL_80',
  Level90 = 'LEVEL_90'
}

export const UserLevelObj = {
  LEVEL_10: '黑铁',
  LEVEL_20: '青铜',
  LEVEL_30: '白银',
  LEVEL_40: '黄金',
  LEVEL_50: '铂金',
  LEVEL_60: '钻石',
  LEVEL_70: '大师',
  LEVEL_80: '宗师',
  LEVEL_90: '王者'
}

export const UserLevel2NameList = [
  {
    level: 'LEVEL_10',
    name: 'LV.1'
  },
  {
    level: 'LEVEL_20',
    name: 'LV.2'
  },
  {
    level: 'LEVEL_30',
    name: 'LV.3'
  },
  {
    level: 'LEVEL_40',
    name: 'LV.4'
  },
  {
    level: 'LEVEL_50',
    name: 'LV.5'
  },
  {
    level: 'LEVEL_60',
    name: 'LV.6'
  },
  {
    level: 'LEVEL_70',
    name: 'LV.7'
  },
  {
    level: 'LEVEL_80',
    name: 'LV.8'
  },
  {
    level: 'LEVEL_90',
    name: 'LV.9'
  }
]

/**
 * MerchantDistLevelEditRequest
 */
export interface IMerchantDistLevelEditRequest {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 商户ID
   */
  merchantId?: string
  /**
   * 用户等级
   */
  userLevelList?: string[]
}

/**
 * void
 *
 * Response«List«MerchantDistLevelResponse»»
 */
export interface IMerchantDistLevelResponseListParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: MerchantDistLevelResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * MerchantDistLevelResponse
 */
export interface MerchantDistLevelResponse {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 用户等级
   */
  userLevelList?: UserLevelList[]
}

/**
 * MerchantDistSwitchRequest
 */
export interface IMerchantDistSwitchRequest {
  /**
   * 开关值
   */
  enable?: boolean
  /**
   * 商户ID
   */
  merchantId?: string
}

/**
 * MerchantDistPageUserRuleRequest
 */
export interface IMerchantDistPageUserRuleRequest {
  /**
   * 坐席名称（模糊检索）
   */
  employeeName?: string
  /**
   * 坐席短ID
   */
  employeeShortId?: number
  /**
   * 商户ID
   */
  merchantId?: string
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number
  /**
   * 用户ID
   */
  userId?: number
  /**
   * 用户昵称（模糊检索）
   */
  userNickName?: string
}

/**
 * void
 *
 * Response«PageResponse«MerchantDistUserResponse»»
 */
export interface IPageMerchantDistUserResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseMerchantDistUserResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«MerchantDistUserResponse»
 */
export interface PageResponseMerchantDistUserResponse {
  /**
   * 当前页数据列表
   */
  dataList?: MerchantDistUserResponse[]
  /**
   * 页数
   */
  pageNo?: number
  /**
   * 每页条数
   */
  pageSize?: number
  /**
   * 总条数
   */
  total?: number
}

/**
 * MerchantDistUserResponse
 */
export interface MerchantDistUserResponse {
  /**
   * 客服员工ID
   */
  employeeId?: number
  /**
   * 客服员工姓名
   */
  employeeName?: string
  /**
   * 客服员工短ID
   */
  employeeShortId?: number
  /**
   * 关联主键ID
   */
  id?: number
  /**
   * 用户Id
   */
  userId?: number
  /**
   * 用户昵称
   */
  userNickName?: string
}

/**
 * MerchantDistUserAddRequest
 */
export interface IMerchantDistUserAddRequest {
  /**
   * 客服员工短ID
   */
  employeeShortId?: number
  /**
   * 商户ID
   */
  merchantId?: string
  /**
   * 用户Id
   */
  userId?: number
}

/**
 * MerchantDistSwitchRequest
 */
export interface IMerchantDistSwitchRequest {
  /**
   * 开关值
   */
  enable?: boolean
  /**
   * 商户ID
   */
  merchantId?: string
}

export interface IBaseItem {
  id: string
  label: string
  value: string
}

// -------------------------------- 应用相关 ------------------------------------------------------

/**
 * 应用列表
 */
export function gameList(param: IGameListRequestParam): Promise<ResWrap<IGameListResponseParam>> {
  return service.post(`${gameInModule.gameListApi}`, param)
}

/**
 * 游戏应用增加
 */
export function gameAdd(param: IMerchantAddRequestParam): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.gameAddApi}`, param)
}

/**
 * 游戏删除
 */
export function gameDel(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.gameDelApi}`, param)
}

/**
 * 游戏更新
 */
export function gameEdit(param: IMerchantEditRequest): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.gameUpdateApi}`, param)
}

/**
 * 游戏详情
 */
export function gameDetail(param: IdRequestParam): Promise<IGameDetailResponseParam> {
  return service.post(`${gameInModule.gameDetailApi}`, param)
}

//----------------------------------- 游戏分配规则 模块 ------------------------------------------------

/**
 * 查看等级分配规则
 * ID：游戏（应用id）
 * 客服等级对应
 */
export function queryDistributionRuleList(
  param: IdRequestParam
): Promise<IMerchantDistLevelResponseParam> {
  return service.post(`${gameInModule.distributionLevelRuleListApi}`, param)
}

/**
 * 编辑等级分配规则
 * @param param
 */
export function editDistributionRule(
  param: IMerchantDistLevelEditRequest
): Promise<IMerchantDistLevelResponseListParam> {
  return service.post(`${gameInModule.distributionLevelRuleEditApi}`, param)
}

/**
 * 开关等级分配规则
 * @param param
 */
export function switchLevelRule(param: IMerchantDistSwitchRequest): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.switchLevelRuleApi}`, param)
}

/**
 * 查看用户分配规则
 * @param param
 */
export function queryPageUserRule(
  param: IMerchantDistPageUserRuleRequest
): Promise<IPageMerchantDistUserResponseParam> {
  return service.post(`${gameInModule.pageUserRuleApi}`, param)
}

/**
 * 删除用户分配规则
 */
export function delUserRuleDistribution(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.delUserRuleApi}`, param)
}

/**
 * 新增用户分配规则
 * @param param
 */
export function addUserRuleDistribution(
  param: IMerchantDistUserAddRequest
): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.addUserRuleApi}`, param)
}

/**
 * 开关用户分配规则
 *
 * @param param
 */
export function switchUserRule(param: IMerchantDistSwitchRequest): Promise<ResWrap<null>> {
  return service.post(`${gameInModule.switchUserRule}`, param)
}

//----------------------------------- 方法 ----------------------------------

/**
 * 初始化用户数据
 */
export function initLevelData() {
  return [
    {
      csLevel: CSLevel.Level10,
      userLevelList: []
    },
    {
      csLevel: CSLevel.Level20,
      userLevelList: []
    },
    {
      csLevel: CSLevel.Level30,
      userLevelList: []
    }
  ]
}

export const csLevelList: IBaseItem[] = [
  {
    id: 'LEVEL_10',
    label: '初级',
    value: CSLevel.Level10
  },
  {
    id: CSLevel.Level20,
    label: '中级',
    value: CSLevel.Level20
  },
  {
    id: CSLevel.Level30,
    label: '高级',
    value: CSLevel.Level30
  }
]

export const userLevelList: IBaseItem[] = [
  {
    id: UserLevelList.Level10,
    label: 'VIP1',
    value: UserLevelList.Level10
  },
  {
    id: UserLevelList.Level20,
    label: 'VIP2',
    value: UserLevelList.Level20
  },
  {
    id: UserLevelList.Level30,
    label: 'VIP3',
    value: UserLevelList.Level30
  },
  {
    id: UserLevelList.Level40,
    label: 'VIP4',
    value: UserLevelList.Level40
  },
  {
    id: UserLevelList.Level50,
    label: 'VIP5',
    value: UserLevelList.Level50
  },
  {
    id: UserLevelList.Level60,
    label: 'VIP6',
    value: UserLevelList.Level60
  },
  {
    id: UserLevelList.Level70,
    label: 'VIP7',
    value: UserLevelList.Level70
  },
  {
    id: UserLevelList.Level80,
    label: 'VIP8',
    value: UserLevelList.Level80
  },
  {
    id: UserLevelList.Level90,
    label: 'VIP9',
    value: UserLevelList.Level90
  }
]

export function formatCs(val: string): string {
  if (val == CSLevel.Level10) {
    return '初级'
  } else if (val == CSLevel.Level20) {
    return '中级'
  } else if (val == CSLevel.Level30) {
    return '高级'
  } else {
    return '未知'
  }
}

export function formatUser(val: string): string {
  const arr = userLevelList.filter((item) => item.value == val)
  if (arr && arr.length > 0) {
    return arr[0].label
  }
  return ''
}

/**
 * 返回item操作
 */
export function formatUserList(arr: string[]): IBaseItem[] {
  const arrReturn: IBaseItem[] = []
  if (arr && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      userLevelList.forEach((item) => {
        if (arr[i] == item.value) {
          arrReturn.push(item)
        }
      })
    }
  }

  return arrReturn
}
