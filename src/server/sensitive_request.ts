import { sensitiveKeyWordModule } from '@/api'
import { IdRequestParam, ResWrap, service } from '@/utils/request'

/**
 * SensitiveKeywordListRequest
 */
export interface ISensitiveListRequestParam {
  /**
   * 敏感词（模糊检索）
   */
  keyword?: string
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
 * void
 *
 * Response«PageResponse«SensitiveKeywordResponse»»
 */
export interface ISensitiveListResponseParam {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: PageResponseSensitiveKeywordResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * PageResponse«SensitiveKeywordResponse»
 */
export interface PageResponseSensitiveKeywordResponse {
  /**
   * 当前页数据列表
   */
  dataList?: SensitiveKeywordResponse[]
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
  total: number
}

/**
 * SensitiveKeywordResponse
 */
export interface SensitiveKeywordResponse {
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
   * 敏感词
   */
  keyword?: string
  /**
   * 替换内容
   */
  replaceContent?: string
  /**
   * 状态
   */
  status?: Status
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 状态
 */
export enum Status {
  Disable = 'DISABLE',
  Enable = 'ENABLE'
}

/**
 * 敏感词列表
 * @param param
 */
export function sensitiveList(
  param: ISensitiveListRequestParam
): Promise<ISensitiveListResponseParam> {
  return service.post(`${sensitiveKeyWordModule.sensitiveListApi}`, param)
}

/**
 * SensitiveKeywordBatchAddRequest
 */
export interface ISensitiveBatchAddRequestParm {
  /**
   * 敏感词
   */
  keywordList?: string[]
  /**
   * 替换内容
   */
  replaceContent?: string
  /**
   * 状态
   */
  status?: Status
}

/**
 * SensitiveKeywordEditRequest
 */
export interface ISensitiveUpdateParam {
  /**
   * 主键ID
   */
  id?: number
  /**
   * 敏感词
   */
  keyword?: string
  /**
   * 替换内容
   */
  replaceContent?: string
  /**
   * 状态
   */
  status?: Status
}

/**
 * 敏感词删除
 * @param param
 */
export function sensitiveDel(param: IdRequestParam): Promise<ResWrap<null>> {
  return service.post(`${sensitiveKeyWordModule.sensitiveDelApi}`, param)
}

/**
 * 敏感词批量新增
 *
 * @param param
 */
export function sensitiveAdd(param: ISensitiveBatchAddRequestParm): Promise<ResWrap<null>> {
  if (!param.status) {
    param.status = Status.Enable
  }
  return service.post(`${sensitiveKeyWordModule.sensitiveAddApi}`, param)
}

/**
 * 敏感词更新
 *
 * @param param
 */
export function sensitiveUpdate(param: ISensitiveUpdateParam): Promise<ResWrap<null>> {
  if (!param.status) {
    param.status = Status.Enable
  }
  return service.post(`${sensitiveKeyWordModule.sensitiveUpdateApi}`, param)
}
