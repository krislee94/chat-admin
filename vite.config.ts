import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

console.log('运行环境', process.env.NODE_ENV)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('iconpark')
        }
      }
    }),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: 'sass'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    },
    preprocessorOptions: {
      scss: {
        // 自定义的主题色
        additionalData: `@use "@/style/element/style.scss" as *;`
      }
    }
  },
  base: process.env.NODE_ENV == 'development' ? '/' : '/web/chat-admin',
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/admin': {
        target: 'http://im-gateway.outsourcing-im.svc.cluster.local:8080',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/admin/, '')
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      //构建选项。  production的时候 ，去除console 和 debugger .
      compress: {
        drop_console:
          process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging' ? true : false,
        drop_debugger:
          process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging' ? true : false
      }
    }
  },
  envDir: './'
})
