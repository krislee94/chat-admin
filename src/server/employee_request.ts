import { ResWrap, service } from '@/utils/request'
import { employeeModule } from '@/api'

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.user.app.api.http.response.LoginInfoResponse>
 *
 * Response«LoginInfoResponse»
 */
export interface ILoginInfoResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: LoginInfoResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * LoginInfoResponse
 */
export interface LoginInfoResponse {
  /**
   * 登录账号名
   */
  accountName?: string
  /**
   * 客服信息
   */
  csInfo?: EmployeeCSResponse
  /**
   * 头像url
   */
  headerImgUrl?: string
  /**
   * 主键ID
   */
  id?: number
  /**
   * 偏好语言
   */
  language?: Language
  /**
   * 员工名称
   */
  name?: string
  /**
   * 员工手机号
   */
  phone?: string
  /**
   * 角色列表
   */
  roleList?: RoleList[]
  /**
   * 短ID
   */
  shortId?: number

  /**
   * notice-music
   */
  noticeMusicInfo?: INoticeMusicInfoParam

  /**
   * 权限列表
   */
  permissionList: string[]

  /**
   * 角色
   */
  roleEntityList?: RoleEntity[]
}

export interface RoleEntity {
  id?: string
  name?: string
}

export interface EmployeeCSResponse {
  /**
   * 客服等级
   */
  csLevel?: CSLevel
  /**
   * 客服状态
   */
  csStatus?: CSStatus
  /**
   * 主键ID
   */
  id?: number
  /**
   * 客服昵称
   */
  nickName?: string
  /**
   * 是否是临时客服
   */
  tempCs?: boolean
}

interface INoticeMusicInfoParam {
  enableNoticeMusic?: boolean
  noticeMusicKey?: string
  noticeMusicUrl?: string
  /**
   * 告警铃声-文件key
   */
  warnMusicKey?: string
  /**
   * 告警铃声-文件url
   */
  warnMusicUrl?: string
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
 * 客服状态
 */
export enum CSStatus {
  Busy = 'BUSY',
  Free = 'FREE'
}

export enum RoleList {
  CS = 'CS',
  CheckAdmin = 'CHECK_ADMIN',
  GameAdmin = 'GAME_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  TempCS = 'TEMP_CS'
}

export const RoleRouterList = ['CS', 'CHECK_ADMIN', 'GAME_ADMIN', 'SUPER_ADMIN', 'TEMP_CS']

/**
 * LoginChangeLanguageRequest
 */
export interface ILoginChangeLanguageRequest {
  language?: Language
}

export enum Language {
  BelaRussian = 'BELA_RUSSIAN',
  BengaliIndia = 'BENGALI_INDIA',
  Burmese = 'BURMESE',
  Chinese = 'CHINESE',
  Dutch = 'DUTCH',
  English = 'ENGLISH',
  Filipino = 'FILIPINO',
  German = 'GERMAN',
  Hindi = 'HINDI',
  Indonesian = 'INDONESIAN',
  Italy = 'ITALY',
  Japanese = 'JAPANESE',
  Korean = 'KOREAN',
  Laos = 'LAOS',
  Malay = 'MALAY',
  Mongolian = 'MONGOLIAN',
  Portuguese = 'PORTUGUESE',
  Russian = 'RUSSIAN',
  Spanish = 'SPANISH',
  Thai = 'THAI',
  Vietnamese = 'VIETNAMESE'
}

/**
 * LoginChangeCsStatusRequest
 */
export interface LoginChangeCsStatusRequest {
  csStatus?: CSStatus
}

export interface IChangePasswordParam {
  password?: string
}

export interface IChangeImgParam {
  /**
   * 头像
   */
  headerImgUrl?: string
}

/**
 * EmployeeChangeNoticeMusicRequest
 */
export interface IEmployeeChangeNoticeMusicRequest {
  /**
   * 是否启用通知铃声
   */
  enableNoticeMusic?: boolean
  /**
   * 通知铃声（此处如使用s3，则为对应的key）
   */
  noticeMusic?: string

  /**
   * 告警铃声（此处如使用s3，则为对应的key）
   */
  warnMusic?: string
}

/**
 * 获取登录详情
 */
export function getLoginInfoDetail(): Promise<ILoginInfoResponseParam> {
  return service.get(`${employeeModule.employeeInfoApi}`)
}

/**
 * 退出登录
 */
export function loginOut(): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.employeeOutApi}`, {})
}

/**
 * 坐席更改密码
 * @param param
 */
export function changePassword(param: IChangePasswordParam): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.changePasswordApi}`, param)
}

/**
 * 更改坐席状态
 *
 * @param param
 */
export function changeStatus(param: LoginChangeCsStatusRequest): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.changeStatusApi}`, param)
}

/**
 * 更改语言
 *
 * @param param
 */
export function changeLanguage(param: ILoginChangeLanguageRequest): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.changeLanguageApi}`, param)
}

/**
 * 更改头像
 */
export function changeHeaderImg(param: IChangeImgParam): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.changeHeaderImgApi}`, param)
}

/**
 * 更改通知铃声
 */
export function changeNoticeMusic(
  param: IEmployeeChangeNoticeMusicRequest
): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.changeRingApi}`, param)
}

/**
 * 重置通知铃声
 */
export function resetNoticeMusic(): Promise<ResWrap<null>> {
  return service.post(`${employeeModule.resetRingApi}`, {})
}
