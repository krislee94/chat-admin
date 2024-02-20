import { messageModule } from '@/api'
import { ResWrap, service } from '@/utils/request'
/**
 * MessageSendRequest
 */
export interface IMessageSendParam {
  /**
   * 消息类型
   */
  messageType?: MessageType
  /**
   * 消息内容
   */
  msg?: string
  /**
   * 富文本s3的key
   */
  recordFileKeys?: RecordFileKey[]
  /**
   * 聊天会话ID
   */
  sessionId?: string
}

/**
 * 消息类型
 */
export enum MessageType {
  Audio = 'AUDIO',
  Emoji = 'EMOJI',
  File = 'FILE',
  Image = 'IMAGE',
  MergeMsg = 'MERGE_MSG',
  RichText = 'RICH_TEXT',
  Text = 'TEXT',
  Tip = 'TIP',
  Video = 'VIDEO',
  Loading = 'LOADING',
  Voice = 'VOICE'
}

/**
 * 消息关联文件key
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
 * MessageUserWithdrawRequest
 */
export interface IMessageUserWithdrawRequest {
  /**
   * 消息记录ID
   */
  recordId?: number
  /**
   * 聊天会话ID
   */
  sessionId?: number
  /**
   * 用户ID
   */
  userId?: number
}

/**
 * 用户发送信息
 *
 * @param param
 */
export function sendMessage(param: IMessageSendParam): Promise<ResWrap<null>> {
  return service.post(`${messageModule.sendMessageApi}`, param)
}

/**
 * 撤回消息
 * @param param
 */
export function widthDrawMessage(param: IMessageUserWithdrawRequest): Promise<ResWrap<null>> {
  return service.post(`${messageModule.withdrawApi}`, param)
}
