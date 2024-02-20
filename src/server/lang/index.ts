export { default as ms } from './locale/ms'

export { default as hi } from './locale/hi'

export { default as lo } from './locale/lo'

export { default as fil } from './locale/fil'

export { default as my } from './locale/my'

export { default as af } from './locale/af'
export { default as ar } from './locale/ar'
export { default as az } from './locale/az'
export { default as bg } from './locale/bg'
export { default as bn } from './locale/bn'
export { default as ca } from './locale/ca'
export { default as cs } from './locale/cs'
export { default as da } from './locale/da'
export { default as de } from './locale/de'
export { default as el } from './locale/el'
export { default as en } from './locale/en'
export { default as eo } from './locale/eo'
export { default as es } from './locale/es'
export { default as et } from './locale/et'
export { default as eu } from './locale/eu'
export { default as fa } from './locale/fa'
export { default as fi } from './locale/fi'
export { default as fr } from './locale/fr'
export { default as he } from './locale/he'
export { default as hr } from './locale/hr'
export { default as hu } from './locale/hu'
export { default as hyAm } from './locale/hy-am'
export { default as id } from './locale/id'
export { default as it } from './locale/it'
export { default as ja } from './locale/ja'
export { default as kk } from './locale/kk'
export { default as km } from './locale/km'
export { default as ko } from './locale/ko'
export { default as ku } from './locale/ku'
export { default as ky } from './locale/ky'
export { default as lt } from './locale/lt'
export { default as lv } from './locale/lv'
export { default as mn } from './locale/mn'
export { default as nbNo } from './locale/nb-no'
export { default as nl } from './locale/nl'
export { default as pa } from './locale/pa'
export { default as pl } from './locale/pl'
export { default as ptBr } from './locale/pt-br'
export { default as pt } from './locale/pt'
export { default as ro } from './locale/ro'
export { default as ru } from './locale/ru'
export { default as sk } from './locale/sk'
export { default as sl } from './locale/sl'
export { default as sr } from './locale/sr'
export { default as sv } from './locale/sv'
export { default as ta } from './locale/ta'
export { default as th } from './locale/th'
export { default as tk } from './locale/tk'
export { default as tr } from './locale/tr'
export { default as ugCn } from './locale/ug-cn'
export { default as uk } from './locale/uk'
export { default as uzUz } from './locale/uz-uz'
export { default as vi } from './locale/vi'
export { default as zhCn } from './locale/zh-cn'
export { default as zhTw } from './locale/zh-tw'

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  el: TranslatePair
}
