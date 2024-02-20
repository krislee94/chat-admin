import { IdRequestParam, ResWrap, service } from '@/utils/request'
import { userFastGroupModule, userFastReplyModule, personSettingModule } from '@/api'
import { messageError } from '@xr-util/xr-ui'
/**
 * FastReplyGroupListRequest
 */
export interface IFastGroupRequestParam {
  /**
   * 商户ID，type为MERCHANT，该值必填
   */
  merchantId?: number
  /**
   * 快捷回复分组类型
   */
  type?: Type
}

/**
 * 快捷回复分组类型
 */
export enum Type {
  Employee = 'EMPLOYEE',
  Merchant = 'MERCHANT',
  Platform = 'PLATFORM'
}

/**
 * void
 *
 * Response«List«FastReplyGroupResponse»»
 */
export interface IFastGroupResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: FastReplyGroupResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * FastReplyGroupResponse
 */
export interface FastReplyGroupResponse {
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 商户ID
   */
  merchantId?: number
  /**
   * 分组名称
   */
  name?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 快捷回复分组类型
   */
  type?: Type
  /**
   * 更新时间
   */
  updateTime?: string

  useChannel?: string
}

/**
 * FastReplyGroupAddRequest
 */
export interface IAddGroupRequestParam {
  /**
   * 商户ID，如果type为MERCHANT，则该值必传
   */
  merchantId?: number
  /**
   * 分组名称
   */
  name?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 分组类型
   */
  type?: Type
}

export interface IUpdateFastGroupParam {
  /**
   * 主键ID
   */
  id?: string
  /**
   * 分组名称
   */
  name?: string
}
/**
 * FastReplyAddRequest
 */
export interface IFastReplyAddParam {
  /**
   * 快捷回复内容（支持富文本）
   */
  content?: string
  /**
   * 分组ID
   */
  groupId?: number
  /**
   * 快捷键
   */
  shortcuts?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 标题
   */
  title?: string
}

/**
 * FastReplyEditRequest
 */
export interface IFastReplyEditRequestParam {
  /**
   * 快捷回复内容（支持富文本）
   */
  content?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 快捷键
   */
  shortcuts?: string
  /**
   * 标题
   */
  title?: string
}

/**
 * FastReplyListRequest
 */
export interface IFastReplyListRequest {
  /**
   * 分组ID
   */
  groupId?: number | string
}

/**
 * void
 *
 * Response«List«FastReplyResponse»»
 */
export interface IFastReplyListResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: FastReplyResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * FastReplyResponse
 */
export interface FastReplyResponse {
  /**
   * 快捷回复内容（支持富文本）
   */
  content?: string
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 分组ID
   */
  groupId?: number
  /**
   * 主键ID
   */
  id?: number
  /**
   * 商户ID
   */
  merchantId?: number
  /**
   * 快捷键
   */
  shortcuts?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 标题
   */
  title?: string
  /**
   * 快捷回复类型
   */
  type?: Type
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * void
 *
 * Response«List«FastReplyResponse»»
 */
export interface IFastReplyResponseListParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: FastReplyResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * FastReplyResponse
 */
export interface FastReplyResponse {
  /**
   * 快捷回复内容（支持富文本）
   */
  content?: string
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 分组ID
   */
  groupId?: number
  /**
   * 主键ID
   */
  id?: number
  /**
   * 商户ID
   */
  merchantId?: number
  /**
   * 快捷键
   */
  shortcuts?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 标题
   */
  title?: string
  /**
   * 快捷回复类型
   */
  type?: Type
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 快捷键
 *
 * Response«EmployeeShortcutsResponse»
 */
export interface IEmployeeShortcutsResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: EmployeeShortcutsResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * EmployeeShortcutsResponse
 */
export interface EmployeeShortcutsResponse {
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 对话框换行
   */
  dialogNewline?: string

  /**
   * 对话框sendMsg
   */
  sendMsg?: string
  /**
   * 主键ID，同员工ID
   */
  id?: number
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * EmployeeShortcutsRequest
 */
export interface IEmployeeShortcutsRequest {
  /**
   * 对话框换行
   */
  dialogNewline?: string
}

/**
 * 查询分组
 *
 * @param param
 */
export function queryFastGroup(param: IFastGroupRequestParam): Promise<IFastGroupResponseParam> {
  if (param.type && param.type == Type.Merchant) {
    if (!param.merchantId) {
      return new Promise((_, reject) => {
        messageError('商户Id为必传')
        reject('error')
      })
    }
  }
  if (!param.type) {
    param.type = Type.Employee
  }
  return service.post(`${userFastGroupModule.fastGroupListApi}`, param)
}

/**
 * 新增快捷回复分组
 *
 * @param param
 */
export function addFastGroup(param: IAddGroupRequestParam): Promise<void> {
  if (param.type && param.type == Type.Merchant) {
    if (!param.merchantId) {
      return new Promise((_, reject) => {
        messageError('商户Id必传')
        reject('error')
      })
    }
  }
  if (!param.type) {
    param.type = Type.Employee
  }
  return service.post(`${userFastGroupModule.fastGroupAddApi}`, param)
}

/**
 * 快捷分组删除
 *
 * @param param
 */
export function delFastGroup(param: IdRequestParam): Promise<void> {
  return service.post(`${userFastGroupModule.fastGroupDelApi}`, param)
}

/**
 * 快捷分组更新
 * @param param
 */
export function updateFastGroup(param: IUpdateFastGroupParam): Promise<void> {
  return service.post(`${userFastGroupModule.fastGroupUpdateApi}`, param)
}

/**
 * 新增-快捷操作回复
 *
 * @param param
 */
export function addFastReply(param: IFastReplyAddParam): Promise<void> {
  return service.post(`${userFastReplyModule.fastReplyAddApi}`, param)
}

/**
 * 更新-快捷回复
 *
 * @param param
 */
export function updateFastReply(param: IFastReplyEditRequestParam): Promise<void> {
  return service.post(`${userFastReplyModule.fastReplyUpdateApi}`, param)
}

/**
 * 删除-快捷回复
 * @param param
 */
export function delFastReply(param: IdRequestParam): Promise<void> {
  return service.post(`${userFastReplyModule.fastReplyDelApi}`, param)
}

/**
 * 详情- 快捷回复
 * @param param
 */
export function detailFastReply(param: IdRequestParam): Promise<void> {
  return service.post(`${userFastReplyModule.detailReplyApi}`, param)
}

/**
 * 详情列表
 * @param param
 */
export function fastReplyList(param: IFastReplyListRequest): Promise<IFastReplyListResponseParam> {
  return service.post(`${userFastReplyModule.fastReplyListApi}`, param)
}

/**
 * 常用快捷回复列表
 * @param param
 */
export function oftenFastReply(): Promise<IFastReplyResponseListParam> {
  return service.get(`${userFastReplyModule.oftenFastReplyApi}`)
}

/**
 * 快捷键详情
 */
export function getDetailFastSet(): Promise<IEmployeeShortcutsResponseParam> {
  return service.get(`${personSettingModule.getFastDetailApi}`)
}

/**
 * 更新快捷键
 *
 * @param param
 */
export function updateFastSet(param: IEmployeeShortcutsRequest): Promise<ResWrap<null>> {
  return service.post(`${personSettingModule.updateFastSetApi}`, param)
}
