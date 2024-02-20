import { service } from '@/utils/request'
import { checkModule } from '@/api'

/**
 * SessionByChatRecordRequest
 */
export interface ISessionByChatRecordRequest {
  /**
   * 会话创建的结束时间
   */
  createEndTime?: string | number
  /**
   * 会话创建的开始时间
   */
  createStartTime?: string | number
  /**
   * 员工ID
   */
  employeeId?: string
  /**
   * 坐席姓名
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
   * 会话状态列表
   */
  statusList?: StatusList[]
  /**
   * 用户昵称
   */
  userName?: string
}

export enum StatusList {
  CSAccess = 'CS_ACCESS',
  End = 'END',
  UserAccess = 'USER_ACCESS'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.common.response.PageResponse<com.cynray.outsourcing.im.msg.app.api.http.response.SessionByChatRecordResponse>>
 *
 * Response«PageResponse«SessionByChatRecordResponse»»
 */
export interface IChatCheckResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseSessionByChatRecordResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«SessionByChatRecordResponse»
 */
export interface PageResponseSessionByChatRecordResponse {
  /**
   * 当前页数据列表
   */
  dataList?: SessionByChatRecordResponse[]
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
 * SessionByChatRecordResponse
 */
export interface SessionByChatRecordResponse {
  /**
   * 会话创建时间
   */
  createTime?: string
  /**
   * 员工ID
   */
  employeeId?: number
  /**
   * 员工名称
   */
  employeeName?: string
  /**
   * 员工昵称
   */
  employeeNickName?: string
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
   * 会话名称
   */
  sessionName?: string
  /**
   * 会话状态
   */
  status?: Status
  /**
   * 用户ID
   */
  userId?: number
  /**
   * 用户昵称
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

/**
 * SessionListBySkRequest
 */
export interface ISessionListBySkRequest {
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
 * Response«PageResponse«SessionBySkResponse»»
 */
export interface ICheckSensitiveResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseSessionBySkResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«SessionBySkResponse»
 */
export interface PageResponseSessionBySkResponse {
  /**
   * 当前页数据列表
   */
  dataList?: SessionBySkResponse[]
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
 * SessionBySkResponse
 */
export interface SessionBySkResponse {
  /**
   * 会话创建时间
   */
  createTime?: string
  /**
   * 员工昵称
   */
  csNickName?: string
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
  // /**
  //  * 敏感词字符串
  //  */
  // sensitiveKeywordStr?: string
  /**
   * 敏感词,消息记录ID
   */
  sensitiveKeywords?: MapLong
  /**
   * 会话ID
   */
  sessionId?: number
  /**
   * 会话名称
   */
  sessionName?: string
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
 * 敏感词,消息记录ID
 *
 * Map«Long»
 */
export interface MapLong {
  key?: string
}

/**
 * SessionChatRecordRequest
 */
export interface ISessionChatRecordRequest {
  /**
   * 聊天记录ID，非必传
   * 传：则取指定记录ID后消息
   * 不传：则取最新记录后消息
   */
  recordId?: string
  /**
   * 会话编号
   */
  sessionId?: string
  /**
   * 取消息记录条数，默认20
   */
  size?: number

  /**
   * 关键字检索
   */
  keyword?: string

  /**
   * 消息记录符号
   */
  recordSqlKeyword?: RecordSQLKeyword | String
}

/**
 * 消息记录符号
 */
export enum RecordSQLKeyword {
  And = 'AND',
  Asc = 'ASC',
  Between = 'BETWEEN',
  Desc = 'DESC',
  Eq = 'EQ',
  Exists = 'EXISTS',
  //表示大于等于
  Ge = 'GE',
  GroupBy = 'GROUP_BY',
  //大于
  Gt = 'GT',
  Having = 'HAVING',
  In = 'IN',
  IsNotNull = 'IS_NOT_NULL',
  IsNull = 'IS_NULL',
  //表示小于等于
  LE = 'LE',
  Like = 'LIKE',
  //小于
  Lt = 'LT',
  Ne = 'NE',
  Not = 'NOT',
  NotBetween = 'NOT_BETWEEN',
  NotExists = 'NOT_EXISTS',
  NotIn = 'NOT_IN',
  NotLike = 'NOT_LIKE',
  Or = 'OR',
  OrderBy = 'ORDER_BY'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<java.util.List<com.cynray.outsourcing.im.msg.app.api.http.response.SessionChatRecordResponse>>
 *
 * Response«List«SessionChatRecordResponse»»
 */
export interface ISessionChatRecordResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: SessionChatRecordResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * SessionChatRecordResponse
 */

/**
 * 消息类型
 */
export enum MsgType {
  Audio = 'AUDIO',
  Emoji = 'EMOJI',
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT',
  Tip = 'TIP',
  Video = 'VIDEO',
  Loading = 'LOADING',
  MergeMsg = 'MERGE_MSG',
  RichText = 'RICH_TEXT',
  Voice = 'VOICE'
}

/**
 * 消息发送者类型
 */
export enum SendUserType {
  CustomerService = 'CUSTOMER_SERVICE',
  System = 'SYSTEM',
  User = 'USER'
}

/**
 * SessionChatRecordResponse
 */
export interface SessionChatRecordResponse {
  /**
   * 消息体
   */
  body?: string
  /**
   * 是否含有敏感词
   */
  containSensitiveKeyword?: boolean
  /**
   * 会话创建时间
   */
  createTime?: string
  /**
   * 译文
   */
  translationText?: string
  /**
   * 主键ID
   */
  id?: string
  /**
   * 消息类型
   */
  msgType?: MsgType
  /**
   * 消息发送者信息
   */
  senderInfo?: SenderInfo
  /**
   * 发送时间
   */
  sendTime?: string
  /**
   * 敏感词
   */
  sensitiveKeyword?: string
  /**
   * 会话ID
   */
  sessionId?: number
  /**
   * 用户ID（发起客服聊天的用户）
   */
  userId?: number

  recordFileKeys?: RecordFileKey[]
}

export interface RecordFileKey {
  /**
   * 文件key
   */
  fileKey?: string
  /**
   * 文件url
   */
  fileUrl?: string
  /**
   * 关联的json内容
   */
  value?: string
}

/**
 * 消息发送者信息
 *
 * SenderInfo
 */
export interface SenderInfo {
  /**
   * 消息发送者的头像
   */
  headerImgUrl?: string
  /**
   * 消息发送者的ID，用户ID/员工ID
   */
  id?: number
  /**
   * 消息发送者的名称
   */
  name?: string
  /**
   * 消息发送者类型
   */
  userType?: SendUserType
}

/**
 * 查询会话监管记录
 */
export function checkChat(param: ISessionByChatRecordRequest): Promise<IChatCheckResponse> {
  return service.post(`${checkModule.chatCheckApi}`, param)
}

/**
 * 查询敏感词记录
 */
export function checkSensitive(param: ISessionListBySkRequest): Promise<ICheckSensitiveResponse> {
  return service.post(`${checkModule.sensitiveKeyWrodCheckApi}`, param)
}

/**
 * 查询聊天记录
 */
export function queryHistoryRecord(
  param: ISessionChatRecordRequest
): Promise<ISessionChatRecordResponseParam> {
  return service.post(`${checkModule.queryHistoryRecordApi}`, param)
}
