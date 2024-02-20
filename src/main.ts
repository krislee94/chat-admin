import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入环境垫片
import 'babel-polyfill'
//引入持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//引入element-plus
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入iconfont
import '@/assets/iconfont/iconfont.css'
// import '@/style/element/style.scss'
//图片预览~
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
//@ts-ignore
import mitt from 'mitt'
//引入右击菜单
//@ts-ignore
import contextmenu from './server/contextmenu/index.esm.js'
import 'v-contextmenu/dist/themes/default.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
//调整样式覆盖顺序
import 'element-plus/dist/index.css'
import './style/element/conflict.css'
import './directives/img-error'

import i18n from '@/locales'

import { img_err, unmounted_img_err } from '@/directives/img-error'

//引入icon-park样式
import '@icon-park/vue-next/styles/index.css'

//引入ckeditor
//@ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue'

import IllestWaveform from '1llest-waveform-vue'
import '1llest-waveform-vue/lib/style.css'

import { permissionDirective } from '@/utils/permission/permission-auth'

//引入图片编辑器

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(contextmenu)
app.use(VueViewer)
//挂载全局事件总线。
app.config.globalProperties.Bus = mitt()
//解决iconpark-icon报错问题 (Failed to resolve component: iconpark-icon)
app.config.compilerOptions.isCustomElement = (tag) => tag === 'iconpark-icon'

// 默认图错误
app.directive('img-error', {
  mounted: img_err,
  unmounted: unmounted_img_err
})
//注册自定义指令集
app.directive('auth', permissionDirective)

app.use(i18n)
app.use(CKEditor)
app.use(IllestWaveform)

app.mount('#app')
