import { serviceUpload } from './fetch'
import {
  downloadUrl,
  uploadUrl,
  IUploadPreSignUrlRequest,
  UploadFileTypeEnum,
  IDownloadPreSignUrlRequest
} from '@/server/s3_request'
import { messageError } from '@xr-util/xr-ui'
import { useMessageStore, useRichStore } from '@/stores'
import { MsgType, UserType } from '@/server/session_request'
import { v4 as uuidv4 } from 'uuid'

/**
 * 文件处理成字节
 *
 * @param file
 * @param callback
 */
export function readFileAsByteArray(file: any, callback: Function) {
  const reader: any = new FileReader()
  reader.onload = function () {
    const byteArray = new Uint8Array(reader.result)
    callback(byteArray)
  }
  reader.readAsArrayBuffer(file)
}

interface IUploadResParam {
  type: UploadFileTypeEnum | string
  url: string | undefined
  key: string | undefined
}

/**
 * 文件处理流程
 *
 * @param file
 * @param isNeedAddMessage
 */
export function uploadFileAndDownload(
  file: any,
  isNeedAddMessage: boolean
): Promise<IUploadResParam> {
  return new Promise((resolve) => {
    //确认type
    let fileType: UploadFileTypeEnum = UploadFileTypeEnum.Image

    let key = ''
    if (file.type && file.type.indexOf('image') > -1) {
      fileType = UploadFileTypeEnum.Image
    } else if (file.type && file.type.indexOf('video') > -1) {
      fileType = UploadFileTypeEnum.Video
    } else if (file.type && file.type.indexOf('audio') > -1) {
      fileType = UploadFileTypeEnum.Audio
    } else if (file.type && (file.type.indexOf('application') > -1 || file.type == 'text/plain')) {
      fileType = UploadFileTypeEnum.File
    } else {
      messageError('无法识别该文件类型')
      return
    }
    //文件解析
    readFileAsByteArray(file, (byteArray: any) => {
      console.log('转换结果')
      console.log(byteArray)
      const param: IUploadPreSignUrlRequest = {
        fileName: file.name,
        uploadFileTypeEnum: fileType
      }
      uploadUrl(param)
        .then((res) => {
          if (res && res.code == '0') {
            key = res.data?.key ?? ''
            return res.data?.preSignUrl
          }
        })
        .then((url) => {
          const id = uuidv4()
          if (isNeedAddMessage && !useRichStore().visible) {
            addMessageLoading(id)
          }
          if (url) {
            serviceUpload.put(url, byteArray).then((res) => {
              console.log(res)
              //@ts-ignore
              if (res && res == 'success') {
                //删除messageloading
                if (isNeedAddMessage) {
                  delMessageLoading(id)
                }
                //通过key下载
                const param: IDownloadPreSignUrlRequest = {
                  key
                }
                downloadUrl(param).then((res) => {
                  console.log(res)
                  if (res && res.code == '0') {
                    //发送事件
                    resolve({
                      key,
                      type: fileType,
                      url: res.data?.preSignUrl ?? ''
                    })
                  }
                })
              }
            })
          }
        })
    })
  })
}
/**
 * 剪切板图片上传
 *
 * @param byteArray
 * @param fileType
 */
export function clipboardImageUpload(byteArray: any, fileType: string) {
  const footerStr = fileType.split('/')[1]

  return new Promise((resolve, reject) => {
    let key = ''
    const param: IUploadPreSignUrlRequest = {
      fileName: uuidv4() + '.' + footerStr,
      uploadFileTypeEnum: UploadFileTypeEnum.Image
    }
    uploadUrl(param)
      .then((res) => {
        if (res && res.code == '0') {
          key = res.data?.key ?? ''
          return res.data?.preSignUrl
        }
      })
      .then((url) => {
        if (url) {
          serviceUpload.put(url, byteArray).then((res) => {
            console.log(res)
            //@ts-ignore
            if (res && res == 'success') {
              //通过key下载
              const param: IDownloadPreSignUrlRequest = {
                key
              }
              downloadUrl(param).then((res) => {
                console.log(res)
                if (res && res.code == '0') {
                  //发送事件
                  resolve({
                    key,
                    type: UploadFileTypeEnum.Image,
                    url: res.data?.preSignUrl ?? ''
                  })
                }
              })
            }
          })
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

interface IAudioParam {
  key?: string
  type?: string
  url?: string
}

/**
 * 上传语音文件
 *
 * @param buyteArray
 */
export function uploadAudioFunc(buyteArray: any): Promise<IAudioParam> {
  return new Promise((resolve) => {
    let key = ''
    const param: IUploadPreSignUrlRequest = {
      fileName: uuidv4() + '.webm',
      uploadFileTypeEnum: UploadFileTypeEnum.Audio
    }

    uploadUrl(param)
      .then((res) => {
        console.log(res)
        if (res && res.code == '0') {
          key = res.data?.key ?? ''
          return res.data?.preSignUrl
        }
      })
      .then((url) => {
        console.log(url)
        if (url) {
          serviceUpload.put(url, buyteArray).then((res) => {
            //@ts-ignore
            if (res && res == 'success') {
              const param: IDownloadPreSignUrlRequest = {
                key
              }
              downloadUrl(param).then((res) => {
                if (res && res.code == '0') {
                  //发送事件
                  resolve({
                    key,
                    type: UploadFileTypeEnum.Audio,
                    url: res.data?.preSignUrl ?? ''
                  })
                }
              })
            }
          })
        }
      })
  })
}

export function addMessageLoading(id: string) {
  const messageStore = useMessageStore()
  const obj = {
    id,
    userType: UserType.CustomerService,
    messageType: MsgType.Loading,
    content: 'loading...',
    sendTime: '',
    sendUserId: ''
  }
  messageStore.setData(obj)
}

/**
 * 删除messageLoading
 *
 * @param id
 */
export function delMessageLoading(id: string) {
  const messageStore = useMessageStore()
  messageStore.delMessageListItem(id)
}

/**
 * 将blob转成arraybuffer
 *
 */
export function blobToByteArray(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const arrayBuffer: any = reader.result
      const byteArray = new Uint8Array(arrayBuffer)
      console.log(byteArray)
      resolve(byteArray)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(blob)
  })
}

// /**
//  * 处理上传的图片
//  *
//  * @param file
//  */
// export function fileToByteArray(file: any) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload = () => {
//       const arrayBuffer: any = reader.result
//       const byteArray = new Uint8Array(arrayBuffer)
//       console.log(byteArray)
//       resolve(byteArray)
//     }
//     reader.onerror = reject
//     reader.readAsArrayBuffer(file)
//   })
// }
