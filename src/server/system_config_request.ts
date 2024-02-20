/**
 *
 * 系统配置
 *
 */

import { service, ResWrap } from '@/utils/request'

import { SystemConfigModule } from '@/api'

/**
 * SysConfigGetConfigListRequest
 */
export interface ISysConfigGetConfigListRequest {
  /**
   * 系统配置列表
   */
  keyList?: KeyList[]
}

export enum KeyList {
  SessionAutoEndTime = 'SESSION_AUTO_END_TIME',
  SessionAutoTransferTime = 'SESSION_AUTO_TRANSFER_TIME',
  SessionCheckReplyTime = 'SESSION_CHECK_REPLY_TIME'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<java.util.List<com.cynray.outsourcing.im.user.app.api.http.response.SysConfigResponse>>
 *
 * Response«List«SysConfigResponse»»
 */
export interface ISysConfigResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: SysConfigResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * SysConfigResponse
 */
export interface SysConfigResponse {
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * json值
   */
  jsonValue?: JSONObjectParam | any
  /**
   * 系统配置类型
   */
  key?: Key
  /**
   * 开关值
   */
  switchValue?: boolean
  /**
   * 文本值
   */
  textValue?: string
  /**
   * 配置KEY
   */
  type?: Type
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * json值
 *
 * JSONObject
 */
export interface JSONObject {
  /**
   * data[].jsonValue.key
   */
  key?: { [key: string]: any }
}

export interface JSONObjectParam {
  timeUnit?: string
  timeValue?: number
}

/**
 * 系统配置类型
 */
export enum Key {
  SessionAutoEndTime = 'SESSION_AUTO_END_TIME',
  SessionAutoTransferTime = 'SESSION_AUTO_TRANSFER_TIME',
  SessionCheckReplyTime = 'SESSION_CHECK_REPLY_TIME'
}

/**
 * 配置KEY
 */
export enum Type {
  JSON = 'JSON',
  Switch = 'SWITCH',
  Text = 'TEXT'
}

/**
 * SysConfigSessionAutoEndRequest
 */
export interface ISysConfigSessionAutoRequest {
  /**
   * 配置
   */
  config?: SysConfigTimeUnit
}

/**
 * 配置
 *
 * SysConfigTimeUnit
 */
export interface SysConfigTimeUnit {
  /**
   * 时间单位
   */
  timeUnit?: string
  /**
   * 时间值
   */
  timeValue?: number
}

/**
 * 时间单位
 */
export enum TimeUnit {
  AmPm = 'AM_PM',
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfWeekInMonth = 'DAY_OF_WEEK_IN_MONTH',
  DayOfYear = 'DAY_OF_YEAR',
  Era = 'ERA',
  Hour = 'HOUR',
  HourOfDay = 'HOUR_OF_DAY',
  Millisecond = 'MILLISECOND',
  Minute = 'MINUTE',
  Month = 'MONTH',
  Second = 'SECOND',
  WeekOfMonth = 'WEEK_OF_MONTH',
  WeekOfYear = 'WEEK_OF_YEAR',
  Year = 'YEAR'
}

//--------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取配置列表
 *
 * @param param
 */
export const getConfigList = (
  param: ISysConfigGetConfigListRequest
): Promise<ISysConfigResponseParam> => {
  return service.post(`${SystemConfigModule.getConfigListApi}`, param)
}

/**
 * 更新自动会话结束
 *
 * @param param
 */
export const updateSessionAutoEnd = (
  param: ISysConfigSessionAutoRequest
): Promise<ResWrap<null>> => {
  return service.post(`${SystemConfigModule.updateSessionAutoEndApi}`, param)
}

/**
 * 自动转接
 * @param param
 */
export const updateSessionAutoTransfer = (
  param: ISysConfigSessionAutoRequest
): Promise<ResWrap<null>> => {
  return service.post(`${SystemConfigModule.updateSessionAutoTransferApi}`, param)
}

/**
 *
 * 更新回复监管
 * @param param
 */
export const updateSessionCheckReply = (
  param: ISysConfigSessionAutoRequest
): Promise<ResWrap<null>> => {
  return service.post(`${SystemConfigModule.updateSessionCheckReplyApi}`, param)
}
