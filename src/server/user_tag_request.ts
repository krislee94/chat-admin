import { ResWrap, service, IdRequestParam } from '@/utils/request'
import { userTagModule } from '@/api'

/**
 * 标签列表
 *
 * Response«List«UserLabelReply»»
 */
export interface IUserTagResParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: UserLabelReply[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * UserLabelReply
 */
export interface UserLabelReply {
  /**
   * 创建人员工ID
   */
  createEmployeeId?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 标签
   */
  name?: string
  /**
   * 所属用户
   */
  userId?: number
}

export interface IAddUserTagParam {
  name?: string
  userId?: string
}

/**
 * 查询用户标签
 */
export function querySessionUserTag(param: IdRequestParam): Promise<IUserTagResParam> {
  return service.post(`${userTagModule.queryUserTagListApi}`, param)
}

/**
 * 新增用户标签
 */
export function addSessinUserTag(param: IAddUserTagParam): Promise<void> {
  return service.post(`${userTagModule.addUserTagApi}`, param)
}

/**
 * 删除用户标签
 */
export function delSessionUserTag(param: IdRequestParam): Promise<void> {
  return service.post(`${userTagModule.delUserTagApi}`, param)
}
