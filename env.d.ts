/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_SERVER_PORT: number
  readonly VITE_APP: string
  readonly VITE_BASE_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_APP_CODE: string
  readonly VITE_MESSAGE_URL: string
  readonly VITE_GATEWAY
  readonly VITE_BASE
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'v-contextmenu'

declare module 'vue3-discordpicker'
