import { service } from '@/utils/request'

import { S3Module } from '@/api'

/**
 * UploadPreSignUrlRequest
 */
export interface IUploadPreSignUrlRequest {
  /**
   * 文件名称，例如：abc.jpg
   */
  fileName?: string
  /**
   * 上传的文件类型
   */
  uploadFileTypeEnum?: UploadFileTypeEnum | undefined
  /**
   * 用户ID，不必传
   */
  userId?: string
}

/**
 * 上传的文件类型
 */
export enum UploadFileTypeEnum {
  Audio = 'AUDIO',
  File = 'FILE',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.user.app.api.http.response.UploadPreSignUrlResponse>
 *
 * Response«UploadPreSignUrlResponse»
 */
export interface IUploadPreSignUrlResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: UploadPreSignURLResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * UploadPreSignUrlResponse
 */
export interface UploadPreSignURLResponse {
  /**
   * 桶对象key
   */
  key?: string
  /**
   * 预签名url
   */
  preSignUrl?: string
}

/**
 * DownloadPreSignUrlRequest
 */
export interface IDownloadPreSignUrlRequest {
  /**
   * 文件key
   */
  key?: string
  /**
   * 用户ID，不必传
   */
  userId?: string
}

/**
 *
 * com.cynray.outsourcing.im.common.response.Response<com.cynray.outsourcing.im.user.app.api.http.response.DownloadPreSignUrlResponse>
 *
 * Response«DownloadPreSignUrlResponse»
 */
export interface IDownloadPreSignUrlResponse {
  /**
   * 请求返回编码
   */
  code?: string
  /**
   * 请求返回数据
   */
  data?: DownloadPreSignURLResponse
  /**
   * 请求返回消息
   */
  msg?: string
}

/**
 * 请求返回数据
 *
 * DownloadPreSignUrlResponse
 */
export interface DownloadPreSignURLResponse {
  /**
   * 桶对象key
   */
  key?: string
  /**
   * 预签名url
   */
  preSignUrl?: string
}

/**
 * 上传的URL
 *
 * @param param
 */
export function uploadUrl(param: IUploadPreSignUrlRequest): Promise<IUploadPreSignUrlResponse> {
  return service.post(`${S3Module.getUploadUrlApi}`, param)
}

export function downloadUrl(
  param: IDownloadPreSignUrlRequest
): Promise<IDownloadPreSignUrlResponse> {
  return service.post(`${S3Module.downUrlApi}`, param)
}
