/**
 *  ----  引用axios项目 ----
 *  @主要用于下载，超时时间200s
 *  @auth
 */
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

import { messageError } from '@xr-util/xr-ui'

const TIMEOUT = 200

export type ResWrap<T> = {
  code: string
  message: string
  data: T
}

export interface IdRequestParam {
  /**
   * 主键ID
   */
  id?: string
}

const service: AxiosInstance = axios.create({
  timeout: TIMEOUT * 1000
})

// let loadingInstance: any = null

service.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  //@ts-ignore
  (response: any) => {
    // loadingInstance.close()
    if (response && response.status === 200) {
      return 'success'
    } else {
      messageError(response.data.msg ? response.data.msg : '接口请求错误')
      Promise.reject()
    }
  },
  (error: AxiosError) => {
    let errorData: any = error.response?.data
    if (errorData?.code != '0') {
      messageError(errorData?.msg ? errorData.msg : '接口请求错误')
    }
    return Promise.reject()
  }
)

export { service as serviceUpload }
