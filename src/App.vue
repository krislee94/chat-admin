<template>
  <el-config-provider :locale="langStore.lang">
    <div class="main" v-if="userStore.token">
      <leftChat />
      <main>
        <RouterView />
      </main>
    </div>

    <Login v-if="!userStore.token" />

    <ChatTranslate v-if="changeStore.visible" />
    <!-- 截图功能 -->
    <CropperVue v-if="cropperStore.visible" />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { RouterView } from 'vue-router'
import leftChat from './views/customer/component/left-chat.vue'
import {
  useUserStore,
  useWebSocketStore,
  useLangStore,
  useTranslatChangeStore,
  useCropperStore
} from './stores'
import Login from './views/login/index.vue'
import { useI18n } from 'vue-i18n'
import ChatTranslate from '@/components/chat-translate/index.vue'
import CropperVue from '@/components/cropper/index.vue'
import { isSupportedNotification } from '@/utils/check'

const userStore = useUserStore()
const webSocketStore = useWebSocketStore()
const langStore = useLangStore()
const changeStore = useTranslatChangeStore()
const cropperStore = useCropperStore()
const { locale } = useI18n()

//创建国际化实例
//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

window.addEventListener('online', (e) => {
  //这种情况是offline-online的情况。
  console.log('offline-online')
  webSocketStore.setOnline(true)
  const status = webSocketStore.webSokcetStatus()
  console.log(status)
  if (status !== WebSocket.OPEN || status !== WebSocket.CONNECTING) {
    webSocketStore.connect()
    webSocketStore.keepHeart()
  }
})

window.addEventListener('offline', (e) => {
  //网络波动 online->offline
  webSocketStore.setOnline(false)
  webSocketStore.close()
})

//防止浏览器刷新，导致语言改变行为
locale.value = langStore.lang.name

isSupportedNotification(
  $t('t_attention'),
  $t('t_user_refused_attention'),
  $t('t_browser_not_supported')
)

//init
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.main {
  display: flex;
  flex-direction: row;
  position: relative;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

:deep(.el-notification__group) {
  width: 100% !important;
}
</style>
