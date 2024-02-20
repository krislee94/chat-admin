/**
 *  ----  引用axios项目 ----
 *  @auth
 */
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores'
import { messageError, messageWarning } from '@xr-util/xr-ui'

import { useRouter } from 'vue-router'

const router = useRouter()
const TIMEOUT = 10

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

const isMessage = ['/api/msg', '/api/session']

const gateway = import.meta.env.VITE_GATEWAY
const service: AxiosInstance = axios.create({
  baseURL: gateway,
  timeout: TIMEOUT * 1000
})

// let loadingInstance: any = null

const errorCodeList = [
  {
    code: '1004',
    name: '当前token失效，可能是编辑过员工信息，请重新登录'
  }
]

service.interceptors.request.use(
  (config: any) => {
    let la = ''
    if (useUserStore().locale && useUserStore().locale.indexOf('zh') > -1) {
      la = 'zh-CN'
    } else {
      la = useUserStore().locale || window.navigator.language
    }
    config.headers['Accept-Language'] = la
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // loadingInstance.close()
    if (response && response.status === 200) {
      // 接口请求错误
      if (response.data.code != '0') {
        if (response.data.code && response.data.code == '1004') {
          messageWarning('当前登录信息失效，请重新登录')
          useUserStore().loginOut()
          window.history.replaceState(null, '', '/login')
          return
        }
        messageError(response.data.msg ? response.data.msg : '接口请求错误')
      }
      return response.data
    } else {
      messageError(response.data?.msg ? response.data?.msg : '接口请求错误')
      Promise.reject()
    }
  },
  (error: AxiosError) => {
    let errorData: any = error.response?.data
    if (errorData?.code != '0') {
      if (errorData && errorData.code == '1004') {
        messageWarning('当前登录信息失效，请重新登录')
        useUserStore().loginOut()
        window.history.replaceState(null, '', '/login')
        return
      }
      messageError(errorData?.msg ? errorData?.msg : '接口请求错误')
    }
    return Promise.reject()
  }
)

async function get<T>(url: string): Promise<T> {
  const res = await service({
    url,
    method: 'GET'
  })

  return new Promise((resolve, _) => {
    resolve(res.data)
  })
}

async function post<T>(url: string, data: any): Promise<T> {
  const res = await service({
    url,
    data,
    method: 'POST'
  })
  return new Promise((resolve, _) => {
    resolve(res.data)
  })
}

export { get, post, service }
