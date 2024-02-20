import moment from 'moment'
//导入moment 语言
import 'moment/locale/zh-cn'
import 'moment/locale/ja'

/**
 * 设置国际化语言
 * @param value
 */
export const setMomentLang = (value: string): void => {
  moment.defineLocale(`${value}`, null)
  //
  moment.locale(value)
}
