import { service } from '@/utils/request'

import { homeModule } from '@/api'

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.user.app.api.http.response.HomeDataSummaryResponse>
 *
 * Response«HomeDataSummaryResponse»
 */
export interface ISummaryResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: HomeDataSummaryResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * HomeDataSummaryResponse
 */
export interface HomeDataSummaryResponse {
  /**
   * 新增客户总数
   */
  addUserNum?: number
  /**
   * 坐席在线总数
   */
  csOnlineNum?: number
  /**
   * 敏感词总数
   */
  sensitiveWordNum?: number
  /**
   * 会话总数
   */
  sessionAddNum?: number
}

/**
 * HomeDataTrendRequest
 */
export interface IHomeDataTrendRequest {
  /**
   * 结束日期，闭区间
   */
  endTime?: string
  /**
   * 开始日期，开区间
   */
  startTime?: string
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<java.util.List<com.cynray.outsourcing.im.user.app.api.http.response.HomeDataTrendResponse>>
 *
 * Response«List«HomeDataTrendResponse»»
 */
export interface IHomeDataTrendResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: HomeDataTrendResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * HomeDataTrendResponse
 */
export interface HomeDataTrendResponse {
  /**
   * 新增客户总数
   */
  addUserNum?: number
  /**
   * 会话总数
   */
  sessionAddNum?: number
  /**
   * 统计日期
   */
  statDay?: string
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<java.util.List<com.cynray.outsourcing.im.user.app.api.http.response.HomeDataRankingResponse>>
 *
 * Response«List«HomeDataRankingResponse»»
 */
export interface IHomeRankResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: HomeDataRankingResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * HomeDataRankingResponse
 */
export interface HomeDataRankingResponse {
  /**
   * 员工ID
   */
  employeeId?: number
  /**
   * 员工名称
   */
  employeeName?: string
  /**
   * 员工头像
   */
  headerImgUrl?: string
  /**
   * 接待数
   */
  receptionNum?: number
}

/**
 * HomeDataRankingRequest
 */
export interface IHomeDataRankingRequest {
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number
  /**
   * 排行榜类型
   */
  rankingType?: RankingType
}

/**
 * 排行榜类型
 */
export enum RankingType {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

/**
 * 数据概况
 */
export function summaryData(): Promise<ISummaryResponseParam> {
  return service.get(`${homeModule.todayDataApi}`)
}

/**
 * 数据趋势
 * @param param
 */
export function trendData(param: IHomeDataTrendRequest): Promise<IHomeDataTrendResponseParam> {
  return service.post(`${homeModule.trendApi}`, param)
}

/**
 * 排行数据
 *
 * @param param
 */
export function rankingData(param: IHomeDataRankingRequest): Promise<IHomeRankResponseParam> {
  return service.post(`${homeModule.rankingApi}`, param)
}
