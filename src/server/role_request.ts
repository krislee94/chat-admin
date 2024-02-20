/**
 * 角色权限对应的 service
 */

import { service, ResWrap, IdRequestParam } from '@/utils/request'
import { RolePermissionsModule } from '@/api'

/**
 * RoleAddRequest
 */
export interface IRoleAddRequest {
  /**
   * 角色名称
   */
  name?: string
  permissionIdList?: string[]
}

/**
 * RoleEditRequest
 */
export interface IRoleEditRequest {
  /**
   * 角色id
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
  /**
   * 权限
   */
  permissionIdList?: string[]
}

/**
 * 请求返回数据
 */
export interface IRoleDetailResponseParam {
  code?: string
  data?: RoleResponse
  msg?: string
}

/**
 * RoleResponse
 */
export interface RoleResponse {
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
   * 权限树
   */
  permissionTreeResponse?: PermissionTreeResponse
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

/**
 * 权限树
 *
 * PermissionTreeResponse
 */
export interface PermissionTreeResponse {
  permissionTreeList?: { [key: string]: any }[]
}

/**
 * RoleListRequest
 */
export interface IRoleListRequest {
  /**
   * 角色名称
   */
  name?: string
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
 * 请求返回数据
 */
export interface IPageResponseRoleResponseParam {
  code?: string
  data?: PageResponseRoleResponse
  msg?: string
}

export interface PermissionTreeResponse {
  permissionTreeList?: { [key: string]: any }[]
}

/**
 * PageResponse«RoleResponse»
 */
export interface PageResponseRoleResponse {
  dataList?: RoleResponse[]
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
 * 当前页数据列表
 *
 * RoleResponse
 */
export interface RoleResponse {
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
   * 权限树
   */
  permissionTreeResponse?: PermissionTreeResponse
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

export interface IdsRequestParam {
  ids?: string[]
}

/**
 * PermissionListResponse
 */
export interface PermissionListResponse {
  permissionCodeList?: string[]
}

/**
 * 新增角色
 * @param param
 */
export function addRole(param: IRoleAddRequest): Promise<ResWrap<null>> {
  return service.post(`${RolePermissionsModule.addRoleApi}`, param)
}

/**
 * 更新角色
 * @param param
 */
export function updateRole(param: IRoleEditRequest): Promise<ResWrap<null>> {
  return service.post(`${RolePermissionsModule.updateRoleApi}`, param)
}

/**
 * 删除角色
 * @param param
 */
export function deleteRole(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${RolePermissionsModule.delRoleApi}`, param)
}

/**
 * 角色详情
 * @param param
 */
export function roleDetail(param: IdRequestParam): Promise<IRoleDetailResponseParam> {
  return service.post(`${RolePermissionsModule.roleDetailApi}`, param)
}

/**
 * 分页查询
 * @param param
 */
export function rolePage(param: IRoleListRequest): Promise<IPageResponseRoleResponseParam> {
  return service.post(`${RolePermissionsModule.rolePageApi}`, param)
}

/**
 * 权限列表
 */
export function permissionQuery(): Promise<ResWrap<PermissionTreeResponse>> {
  return service.post(`${RolePermissionsModule.permissionlistApi}`, {})
}

/**
 * 根据角色Id,查询权限列表
 *
 * @param param
 */
export function queryPermissionByRoleIds(
  param: IdsRequestParam
): Promise<ResWrap<PermissionListResponse>> {
  return service.post(`${RolePermissionsModule.roleIdsQueryApi}`, param)
}
