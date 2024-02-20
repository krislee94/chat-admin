import { service } from '@/utils/request'

import { ReplyCheckModule } from '@/api'

/**
 * SessionListByReplyCheckRequest
 */
export interface ISessionListByReplyCheckRequest {
  /**
   * 会话创建时间-结束时间
   */
  createEndTime?: string
  /**
   * 会话创建时间-开始时间
   */
  createStartTime?: string
  /**
   * 坐席昵称（模糊查询）
   */
  csNickName?: string
  /**
   * 员工姓名（模糊查询）
   */
  employeeName?: string
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number
  /**
   * 用户昵称（模糊检索）
   */
  userNickName?: string
}

/**
 * void
 *
 * Response«PageResponse«SessionByReplyCheckResponse»»
 */
export interface ISessionByReplyCheckResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseSessionByReplyCheckResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«SessionByReplyCheckResponse»
 */
export interface PageResponseSessionByReplyCheckResponse {
  /**
   * 当前页数据列表
   */
  dataList?: SessionByReplyCheckResponse[]
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
 * SessionByReplyCheckResponse
 */
export interface SessionByReplyCheckResponse {
  /**
   * 会话创建时间
   */
  createTime?: string
  /**
   * 员工昵称
   */
  csNickName?: string
  /**
   * 客服回复超时次数
   */
  csReplyTimeoutNum?: number
  /**
   * 员工ID
   */
  employeeId?: number
  /**
   * 员工姓名
   */
  employeeName?: string
  /**
   * 员工短ID
   */
  employeeShortId?: string
  /**
   * 会话结束时间
   */
  endTime?: string
  /**
   * 会话ID
   */
  sessionId?: number
  /**
   * 会话状态
   */
  status?: Status
  /**
   * 客户昵称
   */
  userNickName?: string
}

/**
 * 会话状态
 */
export enum Status {
  CSAccess = 'CS_ACCESS',
  End = 'END',
  UserAccess = 'USER_ACCESS'
}

//----------------------------------------------------------------------------------------------
/**
 * 查询回复监管列表
 * @param param
 */
export function queryCheckReplyList(
  param: ISessionListByReplyCheckRequest
): Promise<ISessionByReplyCheckResponseParam> {
  return service.post(ReplyCheckModule.checkReplyListApi, param)
}
