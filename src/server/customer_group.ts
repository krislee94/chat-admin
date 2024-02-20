import { customerGroupModule } from '@/api'
import { ResWrap, service, IdRequestParam } from '@/utils/request'

/**
 * EmployeeGroupAddRequest
 */
export interface IEmployeeGroupAddRequest {
  /**
   * 分组名称
   */
  name?: string
}

/**
 * EmployeeGroupEditRequest
 */
export interface IEmployeeGroupEditRequest {
  /**
   * 主键ID
   */
  id?: number
  /**
   * 分组名称
   */
  name?: string
}

/**
 * void
 *
 * Response«List«EmployeeGroupResponse»»
 */
export interface IEmployeeGroupResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: EmployeeGroupResponse[]
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * EmployeeGroupResponse
 */
export interface EmployeeGroupResponse {
  /**
   * 主键ID
   */
  id?: string
  /**
   * 分组名称
   */
  name?: string
  /**
   * 排序值
   */
  sort?: number
}

/**
 * 新增员工分组
 */
export function addEmployeeGroup(param: IEmployeeGroupAddRequest): Promise<ResWrap<null>> {
  return service.post(`${customerGroupModule.customerGroupAddApi}`, param)
}
/**
 * 编辑员工分组
 *
 * @param param
 */
export function editEmployeeGroup(param: IEmployeeGroupEditRequest): Promise<ResWrap<null>> {
  return service.post(`${customerGroupModule.customerGroupEditApi}`, param)
}

/**
 * 员工分组删除
 *
 * @param param
 */
export function delEmployeeGroup(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${customerGroupModule.customerGroupDelApi}`, param)
}

/**
 * 员工分组列表
 */
export function employeeGroupList(
  param: IEmployeeGroupAddRequest
): Promise<IEmployeeGroupResponseParam> {
  return service.post(`${customerGroupModule.customerGroupListApi}`, param)
}
