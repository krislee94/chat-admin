import { defineStore } from 'pinia'
//element

//自己创建的语言包
import {
  ms,
  hi,
  lo,
  fil,
  my,
  it,
  zhCn,
  en,
  id,
  vi,
  th,
  ja,
  pt,
  bn,
  mn,
  nl,
  ko,
  fi,
  ru,
  de,
  es
} from '@/server/lang'
//dayjs

interface IStateParam {
  //element的lang.
  lang: any
}

/**
 * defineStore
 * >>>>>>>>>>>
 * 国际化 - STORE
 *
 */
export const useLangStore = defineStore('useLangStore', {
  state: (): IStateParam => {
    return {
      lang: ''
    }
  },

  actions: {
    setLang(value: string) {
      if (!value) {
        return
      }
      //this.lang = elementLang[`${value}`] || en

      switch (value) {
        case 'en':
          this.lang = en
          break
        case 'it':
          this.lang = it
          break
        case 'id':
          this.lang = id
          break
        case 'vi':
          this.lang = vi
          break
        case 'th':
          this.lang = th
          break
        case 'ja':
          this.lang = ja
          break
        case 'pt':
          this.lang = pt
          break
        case 'bn':
          this.lang = bn
          break
        case 'mn':
          this.lang = mn
          break
        case 'ms':
          this.lang = ms
          break
        case 'hi':
          this.lang = hi
          break
        case 'lo':
          this.lang = lo
          break
        case 'nl':
          this.lang = nl
          break
        case 'ko':
          this.lang = ko
          break
        case 'fi':
          this.lang = fi
          break
        case 'ru':
          this.lang = ru
          break
        case 'be':
          this.lang = ru
          break
        case 'de':
          this.lang = de
          break
        case 'zh':
          this.lang = zhCn
          break
        case 'es':
          this.lang = es
          break
        case 'fil':
          this.lang = fil
          break
        case 'tl':
          this.lang = fil
          break
        case 'my':
          this.lang = my
          break

        default:
          this.lang = en
          break
      }
    }
  },

  //持久化
  persist: {
    storage: sessionStorage
  }
})
