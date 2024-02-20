<template>
  <div class="login-box">
    <header>
      <div class="header-box j-row-center">
        <img src="@/assets/logo@2x.png" alt="" />
        <span class="bt-sapn">KeChat</span>
        <div class="driver-line"></div>
        <span
          style="margin-left: 1.25rem; font-size: 14px; color: #434343"
          v-t="'LOGIN.title'"
        ></span>
      </div>
    </header>

    <div class="j-row" style="min-height: 921px">
      <div class="img-box-main">
        <div>
          <p class="tit-span1">{{ $t('t_welcome') }}</p>
          <p class="tit-span1">{{ $t('t_to_login') }}</p>
        </div>
        <img src="@/assets/chatu.png" alt="" class="img-style" />
      </div>
      <div class="main-box-2-login">
        <p v-t="'LOGIN.loginName'"></p>
        <el-input class="input-1" v-model="state.username" :placeholder="$t('LOGIN.place1')" />
        <el-input
          class="input-2"
          type="password"
          v-model="state.password"
          show-password
          :placeholder="$t('LOGIN.place2')"
        />
        <!-- <div>
            <el-checkbox
              size="large"
              label="三天内自动登录"
              v-model="state.threeDays"
              style="margin-top: 1.875rem"
            />
          </div> -->

        <el-button
          type="primary"
          color="#0D6EFD"
          style="width: 100%; height: 2.5rem; margin-top: 8vh"
          @click="loginEmployee"
          >{{ $t('LOGIN.button') }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive } from 'vue'
import {
  useHotKeyStore,
  useLangStore,
  useSliderStore,
  useUserStore,
  useWebSocketStore
} from '@/stores'
import { useRouter } from 'vue-router'
import { noticeError, noticeSuccess } from '@xr-util/xr-ui'
import { ILoginRequestParam, loginIn } from '@/server/login_request'
import { delSpace } from '@/utils/check'
import { useI18n } from 'vue-i18n'
import moment from 'moment'
import { ISO639List } from '@/api/language'
import { changeLanguage } from '@/server/employee_request'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
const { locale } = useI18n()
const hotKeyStore = useHotKeyStore()
const router = useRouter()
const store = useUserStore()

const state = reactive({
  username: '',
  password: '',
  threeDays: false
})
/**
 * 登录
 */
const loginEmployee = async () => {
  if (!state.username || !state.password) {
    noticeError({
      title: '提示',
      message: '请输入用户名和密码'
    })
  }
  //登录
  const param: ILoginRequestParam = {
    username: delSpace(state.username),
    password: state.password
  }
  await loginIn(param).then((res) => {
    if (res && res.code == '0') {
      noticeSuccess({
        title: $t('BUSINESS.success'),
        message: $t('BUSINESS.login_success')
      })

      const token = res.data?.token || ''
      //塞入token
      store.setToken(token)
    }
  })
  //查询会话信息
  await store.queryUserInfo()
  //查询快捷键
  await hotKeyStore.getHotKeyDetail()
  //侧边栏初始化
  await useSliderStore().init()

  // //登录的时候设置国际化语言
  if (store.locale) {
    if (store.locale.indexOf('zh') > -1) {
      moment.locale('zh')
      locale.value = 'zh'
      useLangStore().setLang('zh-CN')
    } else {
      moment.locale(store.locale)
      locale.value = store.locale
    }
  } else {
    const language = window.navigator.language
    const arr = ISO639List.filter((item) => item.value == language)
    if (arr && arr.length > 0) {
      locale.value = arr[0].value
      useLangStore().setLang(arr[0].value)
      store.locale = arr[0].value
      moment.locale(arr[0].value)
      changeLanguage({
        language: arr[0].re
      })
    }
  }

  //现不需要判断角色，自动连接员工socket.
  useWebSocketStore().connect()
  useWebSocketStore().keepHeart()

  if (useSliderStore().sliderData && useSliderStore().sliderData.length > 0) {
    await router.push(useSliderStore().sliderData[0].path)
  } else {
    router.push('/')
  }
}

const setLanguage = () => {
  const language = window.navigator.language

  if (language && language.indexOf('zh') > -1) {
    moment.locale('zh')
    locale.value = 'zh'
  } else {
    moment.locale(language)
    locale.value = language
  }
}
setLanguage()
//初始的时候需要设置语言
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  //background: #e5f4ff;
  background-image: url('@/assets/bghome.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .header-box {
    width: 100vw;
    height: 8vh;
    min-height: 82px;
    background-color: #fff;
    padding-left: 0.625rem;
    img {
      width: 36px;
      height: 36px;
    }
    .driver-line {
      width: 1px;
      height: 3vh;
      background-color: #d9d9d9;
      margin-left: 1.25rem;
    }
  }
  .main-box-2-login {
    width: 20vw;
    height: 25rem;
    background: #fff;
    box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.12);
    margin-top: 25vh;
    padding: 2.5rem;

    p {
      font-size: 1.5rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #141414;
      line-height: 2.25rem;
      text-align: center;
    }
    .input-1 {
      margin-top: 2.625rem;
    }
    .input-2 {
      margin-top: 2rem;
    }
  }
}
.bt-sapn {
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #434343;
  line-height: 22px;
}
.img-box-main {
  width: 67vw;
  height: 90vh;
  min-width: 924px;
  min-height: 921px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-style {
  width: 35.1rem;
  height: 26.75rem;
}
:deep(.el-notification__group) {
  width: 100% !important;
}
.tit-span1 {
  font-size: 40px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #434343;
  line-height: 60px;
  width: 35.1rem;
  margin-bottom: 1rem;
}
</style>
