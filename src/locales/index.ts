/**
 * 语言设置
 */
import { createI18n } from 'vue-i18n'

//英文
import en from './lang/en.json'
//中文
import zh from './lang/zh.json'
//韩文
import ko from './lang/ko.json'
//意大利语
import it from './lang/it.json'
//印地文
import hi from './lang/hi.json'
//印尼文
import id from './lang/id.json'
//日文
import ja from './lang/ja.json'
//越南文
import vi from './lang/vi.json'
//泰文
import th from './lang/th.json'
//葡萄牙文
import pt from './lang/pt.json'
//孟加拉文
import bn from './lang/bn.json'
//蒙古文 mn-Cyrl(蒙古-里希尔文)
import mn from './lang/mn.json'
//马来语
import ms from './lang/ms.json'
//老挝语
import lo from './lang/lo.json'
//荷兰语
import nl from './lang/nl.json'
//菲律宾文
import fil from './lang/fil.json'
//他加禄语（菲律宾语）
import tl from './lang/tl.json'
//俄语
import ru from './lang/ru.json'
//德语
import de from './lang/de.json'
//缅甸语
import my from './lang/my.json'
//西班牙语
import es from './lang/es.json'
//白俄罗斯。
import be from './lang/be.json'

import zhCn from './lang/zh-cn.json'

/**
 * |message|
 * Message.info
 */
function message() {
  return {
    en,
    zh,
    ko,
    it,
    hi,
    id,
    ja,
    vi,
    th,
    pt,
    bn,
    mn,
    ms,
    lo,
    nl,
    fil,
    tl,
    ru,
    de,
    my,
    es,
    be,
    zhCn
  }
}

const language = window.navigator.language
console.log('浏览器语言是：', language)
const i18n = createI18n({
  locale: language && language.indexOf('zh') > -1 ? 'zh' : language,
  globalInjection: true,
  fallbackLocale: 'en',
  messages: message(),
  legacy: false
})

export default i18n
