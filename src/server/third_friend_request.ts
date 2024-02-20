import { service, ResWrap, IdRequestParam } from '@/utils/request'

import { ThirdPlatformModule } from '@/api'

/**
 * ThirdAppFriendPageRequest
 */
export interface IThirdAppFriendPageRequest {
  /**
   * 用户名称（模糊检索）
   */
  nickName?: string
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number
  /**
   * 第三方账号ID (不为空)
   */
  thirdAppAccountId?: string
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.common.response.PageResponse<com.cynray.outsourcing.im.user.app.api.http.response.thirdapp.ThirdAppAccountPageResponse>>
 *
 * Response«PageResponse«ThirdAppAccountPageResponse»»
 */
export interface IPageResponseThirdAppAccountPageResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseThirdAppAccountPageResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«ThirdAppAccountPageResponse»
 */
export interface PageResponseThirdAppAccountPageResponse {
  /**
   * 当前页数据列表
   */
  dataList?: ThirdAppAccountPageResponse[]
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
 * ThirdAppAccountPageResponse
 */
export interface ThirdAppAccountPageResponse {
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
   * 商户ID
   */
  merchantId?: number
  /**
   * 游戏平台的游戏玩家ID
   */
  merchantUserId?: string
  /**
   * 用户昵称
   */
  nickName?: string
  /**
   * 第三方app平台
   */
  thirdApp?: ThirdApp
  /**
   * 第三方APP账号表的主键ID
   */
  thirdAppAccountId?: number
  /**
   * 第三方APP账号表的userId
   */
  thirdAppUserId?: string
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * C用户ID
   */
  userId?: number
}

/**
 * 第三方app平台
 */
export enum ThirdApp {
  Zalo = 'ZALO'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.user.app.api.http.response.thirdapp.ThirdAppAccountDetailResponse>
 *
 * Response«ThirdAppAccountDetailResponse»
 */
export interface IThirdAppAccountDetailResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: ThirdAppAccountDetailResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * ThirdAppAccountDetailResponse
 */
export interface ThirdAppAccountDetailResponse {
  /**
   * 好友关系ID
   */
  friendId?: number
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 商户ID
   */
  merchantId?: number
  /**
   * 商户名称
   */
  merchantName?: string
  /**
   * 商户外部用户ID
   */
  merchantUserId?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 用户备注
   */
  remark?: string
  /**
   * 用户ID
   */
  userId?: number
  /**
   * 用户等级
   */
  userLevel?: UserLevel
}

/**
 * 用户等级
 */
export enum UserLevel {
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

/**
 * 获取好友列表
 *
 * @param param
 */
export function getFriendList(
  param: IThirdAppFriendPageRequest
): Promise<IPageResponseThirdAppAccountPageResponse> {
  return service.post(`${ThirdPlatformModule.thirdPlatformFriendPageApi}`, param)
}

/**
 * 好友详情
 * @param param
 */
export function userDetails(param: IdRequestParam): Promise<IThirdAppAccountDetailResponse> {
  return service.post(`${ThirdPlatformModule.thirdPlatformFriendDetailApi}`, param)
}

/**
 * 好友刷新
 *
 * @param param
 */
export function userFriendRefresh(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${ThirdPlatformModule.thridPlatformFriendRefreshApi}`, param)
}
