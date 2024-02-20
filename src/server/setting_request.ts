import { service, ResWrap } from '@/utils/request'

import { TranslateListModule } from '@/api'

/**
 * 请求返回数据
 */
export interface ITranslateParam {
  code?: string
  data?: TranslationConfigEntity[]
  msg?: string
}

/**
 * TranslationConfigEntity
 */
export interface TranslationConfigEntity {
  /**
   * 创建人
   */
  createBy?: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 主键id
   */
  id?: string
  /**
   * 钥匙或者是appid等
   */
  key?: string
  /**
   * 翻译源名称
   */
  name?: string
  /**
   * 密钥
   */
  secret?: string
  /**
   * 是否选择：true-选择的数据源，false-未选择
   */
  selected?: boolean
  /**
   * 更新人
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * TranslationConfigEditRequest
 */
export interface ITranslationConfigEditRequest {
  /**
   * 主键id
   */
  id?: string
  /**
   * 钥匙或者是appid等
   */
  key?: string
  /**
   * 翻译源名称
   */
  name?: string
  /**
   * 密钥
   */
  secret?: string
  /**
   * 是否选择：true-选择的数据源，false-未选择
   */
  selected?: boolean
}

export function getTranslateList(): Promise<ITranslateParam> {
  return service.post(`${TranslateListModule.tranlsteListApi}`, {})
}

/**
 * 更新翻译源
 * @param param
 */
export function updateTranslate(param: ITranslationConfigEditRequest): Promise<ResWrap<null>> {
  return service.post(`${TranslateListModule.translateUpdateApi}`, param)
}
