import { service } from '@/utils/request'

import { loginModule } from '@/api'

/**
 * LoginRequest
 */
export interface ILoginRequestParam {
  /**
   * 密码
   */
  password?: string
  /**
   * 用户名: 账号名/手机号/员工ID
   */
  username?: string
}

/**
 * token
 *
 * Response«LoginResponse»
 */
export interface ILoginResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: LoginResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * LoginResponse
 */
export interface LoginResponse {
  /**
   * 会话token
   */
  token?: string
}

/**
 * 登录模块
 *
 * - username
 * - password （明文）
 * -
 */
export function loginIn(param: ILoginRequestParam): Promise<ILoginResponseParam> {
  return service.post(`${loginModule.loginInApi}`, param)
}
