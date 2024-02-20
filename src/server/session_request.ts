/**
 * 用户会话request
 */
import { ResWrap, service } from '@/utils/request'
import { sessionModule } from '@/api'
import { MessageType } from './message_request'

export interface ISessionListResParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: SessionListByCSResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * SessionListByCsResponse
 */
export interface SessionListByCSResponse {
  /**
   * 会话创建时间
   */
  createTime?: string
  /**
   * 会话结束时间
   */
  endTime?: string
  /**
   * 最近一条消息
   */
  lastMsg?: SessionChatRecordResponse

  userInfo?: UserInfo
  /**
   * 会话ID
   */
  sessionId?: string
  /**
   * 会话名称
   */
  sessionName?: string
  /**
   * 会话状态
   */
  status?: string

  /**
   * 未读消息
   */
  unreadNum?: number

  /**
   * fanyi开关
   */
  translationSwitch: boolean

  /**
   * 会话是否置顶
   */
  topPlace?: boolean
  /**
   * 会话置顶时间
   */
  topPlaceTime?: string | any

  /**
   * 三方APP
   */
  thirdApp?: string
}

export interface UserInfo {
  /**
   * 头像地址
   */
  headerImgUrl?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 用户ID
   */
  userId?: number
}

/**
 * request
 */
export interface IGetSessionUserInfoParam {
  /**
   * 会话sessionId
   */
  sessionId?: string
  /**
   * 用户ID
   */
  userId?: string
}

export interface ISessionUserResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: SessionUserInfoResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * SessionUserInfoResponse
 */
export interface SessionUserInfoResponse {
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 用户等级
   */
  levelName?: string
  userLevel?: string
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
   * 请求IP
   */
  requestIp?: string
  /**
   * 请求来源地址
   */
  requestSourceUrl?: string
  /**
   * 用户ID
   */
  userId?: number
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
 * 消息关联文件key信息
 *
 * RecordFileKey
 */
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
   * 主键ID
   */
  id?: number
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

  translationText?: string

  /**
   * 是否撤回
   * true:撤回
   * false:未撤回
   */
  withDraw?: boolean

  /**
   * 文件列表
   */
  recordFileKeys?: RecordFileKey[]
}

/**
 * MessageForwardRequest
 */
export interface IMessageForwardRequest {
  /**
   * 消息类型
   */
  messageType?: MsgType | any
  recordIds?: { [key: string]: any }[]
  sessionIds?: { [key: string]: any }[]
}

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
  userType?: UserType
}

/**
 * 消息发送者类型
 */
export enum UserType {
  CustomerService = 'CUSTOMER_SERVICE',
  System = 'SYSTEM',
  User = 'USER'
}

/**
 * SessionEndRequest
 */
export interface ISessionEndRequest {
  /**
   * 聊天会话ID
   */
  sessionId?: string
}

/**
 * SessionCsTransSwitchRequest
 */
export interface ISessionCsTransSwitchRequest {
  /**
   * 会话sessionId
   */
  sessionId?: string
  /**
   * 翻译开关
   */
  translationSwitch?: boolean
}

/**
 * SessionTransferRequest
 */
export interface ISessionTransferRequest {
  /**
   * 会话接收者，客服员工Id
   */
  newEmployeeId?: string
  /**
   * 转接原因
   */
  reason?: string
  /**
   * 聊天会话ID
   */
  sessionId?: string

  /**
   * 老的会话ID
   */
  oldEmployeeId?: string
}

/**
 * EmployeeCsPageWithTransferRequest
 */
export interface IEmployeeCsPageWithTransferRequest {
  /**
   * 关键词检索：shortId / 员工名称
   */
  keyword?: string
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
}

/**
 * 标签列表
 *
 * Response«PageResponse«EmployeeCsTransferResponse»»
 */
export interface IEmployeeCsTransferResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseEmployeeCSTransferResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«EmployeeCsTransferResponse»
 */
export interface PageResponseEmployeeCSTransferResponse {
  /**
   * 当前页数据列表
   */
  dataList?: EmployeeCSTransferResponse[]
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
 * EmployeeCsTransferResponse
 */
export interface EmployeeCSTransferResponse {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 当前正在服务的会话数
   */
  currentSessionNum?: number
  /**
   * 员工名称
   */
  employeeName?: string
  /**
   * 主键ID
   */
  id?: string
  /**
   * 员工短ID
   */
  shortId?: number
  /**
   * 是否是临时客服
   */
  tempCs?: boolean
}

/**
 * 客服等级
 */
export enum CSLevel {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30'
}

export interface IQueryChatListParam {
  sessionId?: string

  userNickName?: string

  thirdApp?: string
}

/**
 * SessionIdRequest
 */
export interface ISessionIdRequest {
  /**
   * 聊天会话ID
   */
  sessionId?: string
}

/**
 * MessageTranslationRequest
 */
export interface IMessageTranslationRequest {
  /**
   * 需要翻译的消息
   */
  msg?: string

  msgType?: MessageType
}

/**
 * SessionPreTransferRequest
 */
export interface ISessionPreTransferRequest {
  /**
   * 会话接收者，客服员工Id
   */
  newEmployeeId?: string
  /**
   * 转接原因
   */
  reason?: string
  /**
   * 聊天会话ID
   */
  sessionId?: string
  /**
   * 会话用户，用户id
   */
  userId?: string
}

/**
 * 根据sessionId 和userId 查询
 * @param param
 */
export function querySessionUserInfo(
  param: IGetSessionUserInfoParam
): Promise<ISessionUserResponseParam> {
  return service.post(sessionModule.querySessionUserInfoApi, param)
}

/**
 * 查询用户会话列表
 */
export function querySessionList(param: IQueryChatListParam): Promise<ISessionListResParam> {
  return service.post(sessionModule.querySessionListApi, param)
}

/**
 * 查询坐席会话历史记录
 */
export function queryCsHistoryRecord(
  param: ISessionChatRecordRequest
): Promise<ISessionChatRecordResponseParam> {
  return service.post(`${sessionModule.queryHistoryRecordCsApi}`, param)
}

/**
 * 结束会话
 *
 * @param param
 */
export function finishedSession(param: ISessionEndRequest): Promise<ResWrap<null>> {
  return service.post(sessionModule.finishedApi, param)
}

/**
 * 翻译开关
 *
 * @param param
 */
export function translateSwitch(param: ISessionCsTransSwitchRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.translateSwitchApi}`, param)
}

/**
 * 转接会话
 * (转接会话)
 * @param param
 */
export function transferCustomer(param: ISessionTransferRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.transferCustomerApi}`, param)
}

/**
 * 查看客服列表
 */
export function pageEmployeeCsList(
  param: IEmployeeCsPageWithTransferRequest
): Promise<IEmployeeCsTransferResponseParam> {
  if (!param.pageNo) {
    param.pageNo = 1
  }
  if (!param.pageSize) {
    param.pageSize = 10
  }
  return service.post(`${sessionModule.pageEmployeeTransferApi}`, param)
}

/**
 * 全部消息已读
 */
export function allSessionRead(param: ISessionIdRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.sessionAllReadApi}`, param)
}

/**
 * 会话消息未读(消息内容+1)
 *
 * @param param
 */
export function sessionUnRead(param: ISessionIdRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.sessionUnReadApi}`, param)
}

/**
 * 会话置顶
 *
 * @param param
 */
export function sessionToTop(param: ISessionIdRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.csToTopPlaceApi}`, param)
}

/**
 * 会话取消置顶
 *
 * @param param
 */
export function sessionCancelTop(param: ISessionIdRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.csCancelTopApi}`, param)
}

/**
 * 单个消息翻译
 *
 * @param param
 */
export function translateOne(param: IMessageTranslationRequest): Promise<ResWrap<string>> {
  return service.post(`${sessionModule.translateOneApi}`, param)
}

/**
 * 预转接
 *
 * @param param
 */
export function preTranslateChange(param: ISessionPreTransferRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.translatePreApi}`, param)
}

/**
 * 消息转发
 *
 * @param param
 */
export function transferMsg(param: IMessageForwardRequest): Promise<ResWrap<null>> {
  return service.post(`${sessionModule.transferMsgApi}`, param)
}
