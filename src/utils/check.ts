/**
 * 校验类TS
 */
import { noticeSuccess, noticeWarning } from '@xr-util/xr-ui'
import { useUserStore } from '@/stores'
import { useI18n } from 'vue-i18n'
// import i18n from '@/locales'

/**
 * 纯数字
 *
 * @param str
 */
export function isNumber(str: any) {
  return /^\d+$/.test(str)
}

/**
 * 判断是否含有HTML标签
 *
 * @param text
 */
export function hasHtmlTags(text: string): boolean {
  const htmlTagRegex = /<[a-z][\s\S]*>/i // 匹配HTML标签的正则表达式
  return htmlTagRegex.test(text)
}

/**
 * 使用正则， 或者 trim() 去除空格
 * @param str
 */
export function delSpace(str: string) {
  // 使用正则表达式替换空格
  return str.replace(/\s+/g, '')
}

export function isSupportedNotification(title: string, messageOne?: string, messageTwo?: string) {
  console.log(useI18n)
  if ('Notification' in window) {
    // 支持Web Notification API
    Notification.requestPermission().then(function (permission) {
      console.log('permission', permission)
      if (permission === 'granted') {
        // 用户授予了权限
        useUserStore().isAllowNotice = 1
      } else {
        // 用户拒绝了权限
        noticeWarning({
          title: `${title}`,
          message: `${messageOne}`
        })
      }
    })
  } else {
    // 不支持Web Notification API
    noticeWarning({
      title: `${title}`,
      message: `${messageTwo}`
    })
  }
}
