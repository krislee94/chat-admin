import { service, ResWrap, IdRequestParam } from '@/utils/request'

import { ThirdAccountModule } from '@/api'

/**
 * ThirdAppPageRequest
 */
export interface IThirdAppPageRequest {
  /**
   * 账号（模糊检索）
   */
  account?: string
  /**
   * 商户ID
   */
  merchantId?: number
  /**
   * 是否查询商户ID为空
   */
  merchantIdIsNull?: boolean
  /**
   * 页数；例如：1
   */
  pageNo?: number
  /**
   * 每页条数；例如：10
   */
  pageSize?: number
  /**
   * 手机号（模糊检索）
   */
  phone?: string
  /**
   * APP平台
   */
  thirdApp?: ThirdApp
  /**
   * 用户名称（模糊检索）
   */
  useName?: string
}

/**
 * APP平台
 */
export enum ThirdApp {
  Zalo = 'ZALO'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.PageResponse<com.cynray.outsourcing.im.user.app.api.http.response.thirdapp.ThirdAppAccountResponse>
 *
 * PageResponse«ThirdAppAccountResponse»
 */
export interface IThirdAppAccountResponse {
  /**
   * 当前页数据列表
   */
  dataList?: ThirdAppAccountResponse[]
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

export interface SimpleEmployeeInfo {
  /**
   * 员工ID
   */
  employeeId?: string
  /**
   * 员工名称
   */
  employeeName?: string
}

/**
 * ThirdAppAccountResponse
 */
export interface ThirdAppAccountResponse {
  /**
   * APP平台账号
   */
  account?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 分配类型
   */
  distributionType?: DistributionType
  /**
   * 邮箱
   */
  email?: string
  /**
   * 头像地址
   */
  headerImgUrl?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 商户ID
   */
  merchantId?: string
  /**
   * 商户名称
   */
  merchantName?: string
  /**
   * 在线状态
   */
  onlineStatus?: boolean
  /**
   * 手机号
   */
  phone?: string
  /**
   * 第三方app平台
   */
  thirdApp?: ThirdApp
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * APP平台用户ID
   */
  userId?: string
  /**
   * APP平台用户名称
   */
  userName?: string

  /**
   * 分配的客服列表
   */
  csList?: SimpleEmployeeInfo[]
}

/**
 * 分配类型
 */
export enum DistributionType {
  FixCS = 'FIX_CS',
  System = 'SYSTEM'
}

/**
 * ThirdAppEditRequest
 */
export interface IThirdAppEditRequest {
  /**
   * 分配方式
   */
  distributionType?: DistributionType
  /**
   * 坐席ID列表
   */
  employeeIds?: string[]
  /**
   * 主键ID
   */
  id?: string
  /**
   * 商户ID
   */
  merchantId?: string
}

/**
 * 查询账号列表
 *
 *
 * @param param
 */
export function thirdAccountPage(
  param: IThirdAppPageRequest
): Promise<ResWrap<IThirdAppAccountResponse>> {
  return service.post(ThirdAccountModule.thirdAccountPageApi, param)
}

/**
 * 账号编辑
 *
 *
 * @param param
 */
export function thirdAccountUpdate(param: IThirdAppEditRequest): Promise<ResWrap<null>> {
  return service.post(ThirdAccountModule.thirdAccountEditorApi, param)
}

/**
 * 账号删除
 *
 * @param param
 */
export function thirdAccountDel(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(ThirdAccountModule.thirdAccountDelApi, param)
}
