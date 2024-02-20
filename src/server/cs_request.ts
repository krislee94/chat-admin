import { service, ResWrap } from '@/utils/request'

import { CSModule } from '@/api'

import { MerchantResponse } from '@/server/game_request'

/**
 * EmployeeCsPageRequest
 */
export interface IEmployeeCsPageRequest {
  /**
   * 客服等级
   */
  csLevel?: CSLevel | null
  /**
   * 客服状态
   */
  csStatus?: CSStatus | null
  /**
   * 员工姓名
   */
  employeeName?: string
  /**
   * 员工手机号
   */
  employeePhone?: string
  /**
   * 员工短ID
   */
  employeeShortId?: string
  /**
   * 服务游戏
   */
  merchantId?: string
  /**
   * 昵称
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
}

/**
 * 客服状态
 */
export enum CSStatus {
  Busy = 'BUSY',
  Free = 'FREE',
  Offline = 'OFFLINE'
}

/**
 * 标签列表
 *
 * Response«PageResponse«EmployeeCsPageResponse»»
 */
export interface IEmployeeCsPageResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseEmployeeCSPageResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«EmployeeCsPageResponse»
 */
export interface PageResponseEmployeeCSPageResponse {
  /**
   * 当前页数据列表
   */
  dataList?: EmployeeCSPageResponse[]
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
 * EmployeeCsPageResponse
 */
export interface EmployeeCSPageResponse {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 客服状态
   */
  csStatus?: CSStatus
  /**
   * 员工账号
   */
  employeeAccount?: string
  /**
   * 员工姓名
   */
  employeeName?: string
  /**
   * 员工手机号
   */
  employeePhone?: string
  /**
   * 员工短ID
   */
  employeeShortId?: string

  /**
   * 所属分组
   */
  employeeGroupString?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 服务游戏
   */
  merchantListString?: string
  /**
   * 客服昵称
   */
  nickName?: string

  /**
   * 服务游戏
   */
  merchantList?: MerchantResponse[]
}

/**
 * 客服等级
 */
export enum CSLevel {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30'
}

/**
 * EmployeeCsEditRequest
 */
export interface IEmployeeCsEditRequest {
  /**
   * 员工ID
   */
  employeeId?: string
  /**
   * 客服等级
   */
  level?: Level | string
  /**
   * 服务游戏
   */
  merchantIds?: string[]
  /**
   * 昵称
   */
  nickName?: string
}

/**
 * 客服等级
 */
export enum Level {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30'
}

//-------------------------------------------------------------------------------------------------------

/**
 * 查询客服列表
 * @param param
 */
export function queryCspage(param: IEmployeeCsPageRequest): Promise<IEmployeeCsPageResponseParam> {
  return service.post(`${CSModule.csPageApi}`, param)
}

/**
 * 编辑客服
 * @param param
 */
export function editorCs(param: IEmployeeCsEditRequest): Promise<ResWrap<null>> {
  return service.post(CSModule.csEditorApi, param)
}
