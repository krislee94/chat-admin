import { service, ResWrap, IdRequestParam } from '@/utils/request'

import { customerModule } from '@/api'

import { moment } from '@xr-util/util'

/**
 * EmployeeListRequest
 */
export interface IEmployeeListRequestParam {
  /**
   * 员工登录账号
   */
  accountName?: string
  /**
   * 坐席等级筛选
   */
  csLevelList?: CSLevelList[]
  /**
   * 分组ID筛选
   */
  groupId?: number
  /**
   * 服务游戏筛选
   */
  merchantIdList?: number[]
  /**
   * 员工名称（模糊检索）
   */
  name?: string
  /**
   * 员工昵称（模糊检索）
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
  /**
   * 手机号（模糊检索）
   */
  phone?: string
  /**
   * 角色筛选
   */
  roleList?: string[]
  /**
   * 员工短ID筛选
   */
  shortId?: number
}

export enum CSLevelList {
  Level10 = 'LEVEL_10',
  Level20 = 'LEVEL_20',
  Level30 = 'LEVEL_30'
}

/**
 * 标签列表
 *
 * Response«PageResponse«EmployeeResponse»»
 */
export interface IEmployeeListResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseEmployeeResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«EmployeeResponse»
 */
export interface PageResponseEmployeeResponse {
  /**
   * 当前页数据列表
   */
  dataList?: EmployeeResponse[]
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
 * EmployeeResponse
 */
export interface EmployeeResponse {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 分组列表
   */
  groupList?: GroupSimpleInfo[]
  /**
   * 主键ID
   */
  id?: number
  /**
   * 服务游戏
   */
  merchantList?: MerchantSimpleInfo[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工昵称
   */
  nickName?: string
  /**
   * 员工手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 角色列表
   */
  roleList?: string[]
  /**
   * 性别
   */
  sex?: number
  /**
   * 短ID
   */
  shortId?: number
  /**
   * 更新人员工ID
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
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
 * 分组简单信息
 *
 * GroupSimpleInfo
 */
export interface GroupSimpleInfo {
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * 商户简单信息
 *
 * MerchantSimpleInfo
 */
export interface MerchantSimpleInfo {
  /**
   * 游戏头像
   */
  headerImgUrl?: string
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * EmployeeAddRequest
 */
export interface IEmployeeAddRequestParam {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 员工分组列表
   */
  groupIdList?: number[]
  /**
   * 服务游戏
   */
  merchantIdList?: number[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工昵称
   */
  nickName?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 角色列表
   */
  roleList?: RoleList[]
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
}

/**
 * EmployeeAddRequest
 */
export interface IEmployeeAddRequestV2Param {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 监管员信息
   */
  checkAdminInfo?: CheckAdminInfo
  /**
   * 客服信息
   */
  csInfo?: CSInfo
  /**
   * 游戏管理员信息
   */
  gameAdminInfo?: GameAdminInfo
  /**
   * 员工分组列表
   */
  groupIdList?: number[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
  /**
   * 超级管理员信息
   */
  superAdminInfo?: SuperAdminInfo
}

export interface CSPermission {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 是否有客服权限
   */
  enable?: boolean
  merchantIdList?: string[]
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否临时客服
   */
  tempCs?: boolean
}

export interface ICSPermission {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 是否启用
   */
  enable?: boolean
  merchantList?: SimpleMerchantInfo[]
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否临时客服
   */
  tempCs?: boolean
}

/**
 * EmployeeAddRequest
 */
export interface IEmployeeAddRequestV3Param {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 客服信息
   */
  csPermission?: CSPermission
  groupIdList?: string[]
  /**
   * 头像
   */
  headerImgUrl?: string
  merchantIdList?: string[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  roleIdList?: string[]
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
}

/**
 * 监管员信息
 *
 * CheckAdminInfo
 */
export interface CheckAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 监管游戏（商户ID）
   */
  merchantIdList?: number[]
}

/**
 * 客服信息
 *
 * CsInfo
 */
export interface CSInfo {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 服务游戏
   */
  merchantIdList?: number[]
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否临时客服
   */
  tempCs?: boolean
}

/**
 * 游戏管理员信息
 *
 * GameAdminInfo
 */
export interface GameAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 管理游戏（商户ID）
   */
  merchantId?: number
}

/**
 * 超级管理员信息
 *
 * SuperAdminInfo
 */
export interface SuperAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
}

export enum RoleList {
  CS = 'CS',
  CheckAdmin = 'CHECK_ADMIN',
  GameAdmin = 'GAME_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  TempCS = 'TEMP_CS'
}

export const RoleListObj = {
  CS: '坐席',
  CheckAdmin: '质检员',
  GameAdmin: '游戏管理员',
  SuperAdmin: '超级管理员',
  TempCS: '临时管理员'
}

/**
 * 详情
 *
 * Response«EmployeeResponse»
 */
export interface IEmployeeDetailResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: EmployeeResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * EmployeeResponse
 */
export interface EmployeeResponse {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 分组列表
   */
  groupList?: GroupSimpleInfo[]
  /**
   * 主键ID
   */
  id?: number
  /**
   * 服务游戏
   */
  merchantList?: MerchantSimpleInfo[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工昵称
   */
  nickName?: string
  /**
   * 员工手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 角色列表
   */
  roleList?: string[]
  /**
   * 性别
   */
  sex?: number
  /**
   * 短ID
   */
  shortId?: number
  /**
   * 更新人员工ID
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 分组简单信息
 *
 * GroupSimpleInfo
 */
export interface GroupSimpleInfo {
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * 商户简单信息
 *
 * MerchantSimpleInfo
 */
export interface MerchantSimpleInfo {
  /**
   * 游戏头像
   */
  headerImgUrl?: string
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * EmployeeEditRequest
 */
export interface IEmployeeEditRequestParam {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 员工分组列表
   */
  groupIdList?: number[]
  /**
   * 员工ID
   */
  id?: number
  /**
   * 服务游戏
   */
  merchantIdList?: number[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工昵称
   */
  nickName?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 角色列表
   */
  roleList?: string[]
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
}

/**
 * 详情
 *
 * Response«EmployeeDetailResponse»
 */
export interface IEmployeeDetailV2Response {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: EmployeeDetailResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * EmployeeDetailResponse
 */
export interface EmployeeDetailResponse {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 监管员信息
   */
  checkAdminInfo?: SimpleCheckAdminInfo
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 客服信息
   */
  csInfo?: SimpleCSInfo
  /**
   * 游戏管理员信息
   */
  gameAdminInfo?: SimpleGameAdminInfo
  /**
   * 分组列表
   */
  groupList?: SimpleGroupInfo[]
  /**
   * 主键ID
   */
  id?: number
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 性别
   */
  sex?: number
  /**
   * 短ID
   */
  shortId?: number
  /**
   * 超级管理员信息
   */
  superAdminInfo?: SimpleSuperAdminInfo
  /**
   * 更新人员工ID
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 监管员信息
 *
 * SimpleCheckAdminInfo
 */
export interface SimpleCheckAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 监管游戏（商户ID）
   */
  merchantList?: SimpleMerchantInfo[]
}

/**
 * 简单商户信息
 *
 * SimpleMerchantInfo
 *
 * 管理游戏（商户信息）
 */
export interface SimpleMerchantInfo {
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * id
   */
  id?: string
  /**
   * 商户名称
   */
  name?: string
}

/**
 * 客服信息
 *
 * SimpleCsInfo
 */
export interface SimpleCSInfo {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 服务游戏
   */
  merchantList?: SimpleMerchantInfo[]
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否临时客服
   */
  tempCs?: boolean
}

/**
 * 游戏管理员信息
 *
 * SimpleGameAdminInfo
 */
export interface SimpleGameAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 管理游戏（商户信息）
   */
  merchant?: SimpleMerchantInfo
}

/**
 * 分组简单信息
 *
 * SimpleGroupInfo
 */
export interface SimpleGroupInfo {
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * 超级管理员信息
 *
 * SimpleSuperAdminInfo
 */
export interface SimpleSuperAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
}

/**
 * EmployeeEditRequest
 */
export interface IEmployeeEditRequest {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 监管员信息
   */
  checkAdminInfo?: CheckAdminInfo
  /**
   * 客服信息
   */
  csInfo?: CSInfo
  /**
   * 游戏管理员信息
   */
  gameAdminInfo?: GameAdminInfo
  /**
   * 员工分组列表
   */
  groupIdList?: string[]
  /**
   * 员工ID
   */
  id?: number
  /**
   * 员工名称
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
  /**
   * 超级管理员信息
   */
  superAdminInfo?: SuperAdminInfo
}

/**
 * 监管员信息
 *
 * CheckAdminInfo
 */
export interface CheckAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 监管游戏（商户ID）
   */
  merchantIdList?: number[]
}

/**
 * 客服信息
 *
 * CsInfo
 */
export interface CSInfo {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 服务游戏
   */
  merchantIdList?: number[]
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否临时客服
   */
  tempCs?: boolean
}

/**
 * 游戏管理员信息
 *
 * GameAdminInfo
 */
export interface GameAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
  /**
   * 管理游戏（商户ID）
   */
  merchantId?: number
}

/**
 * 超级管理员信息
 *
 * SuperAdminInfo
 */
export interface SuperAdminInfo {
  /**
   * 是否启用
   */
  enable?: boolean
}

//----------------------编辑员工-------------------
/**
 * EmployeeEditRequest
 */
export interface IEmployeeEditRequestV2Param {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 客服信息
   */
  csPermission?: CSPermission
  groupIdList?: string[]
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * 员工ID
   */
  id?: number

  merchantIdList?: string[]
  /**
   * 员工名称
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  roleIdList?: string[]
  /**
   * 性别（1：男，0：女）
   */
  sex?: number
}

//-----------------------------详情------------------------------
/**
 * 请求返回数据
 */
export interface Response {
  code?: string
  data?: IBaseEmployeeDetailResponse
  msg?: string
}

/**
 * EmployeeDetailResponse
 */
export interface IBaseEmployeeDetailResponse {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 出生日期
   */
  birthday?: string
  /**
   * 创建人员工ID
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 客服信息
   */
  csPermission?: ICSPermission
  groupList?: SimpleGroupInfo[]
  /**
   * 主键ID
   */
  id?: number
  /**
   * 员工名称
   */
  name?: string
  permissionList?: string[]
  /**
   * 员工手机号
   */
  phone?: string
  /**
   * 备注
   */
  remark?: string
  roleList?: RoleEntity[]
  /**
   * 性别
   */
  sex?: number
  /**
   * 短ID
   */
  shortId?: number
  /**
   * 更新人员工ID
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string

  merchantIdList?: string[]
}

/**
 * 服务游戏
 *
 * SimpleMerchantInfo
 */
export interface SimpleMerchantInfo {
  /**
   * 头像
   */
  headerImgUrl?: string
  /**
   * id
   */
  id?: string
  /**
   * 商户名称
   */
  name?: string
}

/**
 * 分组列表
 *
 * SimpleGroupInfo
 */
export interface SimpleGroupInfo {
  /**
   * id
   */
  id?: number
  /**
   * 游戏名称
   */
  name?: string
}

/**
 * 角色信息
 *
 * RoleEntity
 */
export interface RoleEntity {
  /**
   * 创建的员工ID
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
   * 角色名称
   */
  name?: string
  /**
   * 是否是超级管理员
   */
  supered?: boolean
  /**
   * 更新的员工ID
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
}

//------------------------------------------------------------
/**
 * 员工列表
 */
export function customerList(
  param: IEmployeeListRequestParam
): Promise<IEmployeeListResponseParam> {
  return service.post(`${customerModule.customerListApi}`, param)
}

/**
 * 新增客服
 */
export function customerAdd(param: IEmployeeAddRequestV3Param): Promise<ResWrap<null>> {
  if (param && param.birthday) {
    param.birthday = moment(param.birthday).format('YYYY-MM-DD HH:mm:ss')
  }
  return service.post(`${customerModule.customerAddApi}`, param)
}

/**
 * 删除坐席
 */
export function customerDel(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${customerModule.customerDelApi}`, param)
}

/**
 * 坐席详情
 *
 * @param param
 */
export function customerDetail(
  param: IdRequestParam
): Promise<ResWrap<IBaseEmployeeDetailResponse>> {
  return service.post(`${customerModule.customerDetailApi}`, param)
}

/**
 * 坐席编辑
 *
 * @param param
 */
export function customerUpdate(param: IEmployeeEditRequestV2Param): Promise<ResWrap<null>> {
  if (param && param.birthday) {
    param.birthday = moment(param.birthday).format('YYYY-MM-DD HH:mm:ss')
  }
  return service.post(`${customerModule.customerEditApi}`, param)
}
