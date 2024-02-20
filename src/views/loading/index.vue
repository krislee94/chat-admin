<template>
  <div class="loading-box">
    <span class="text-span">系统正在初始化....</span>
  </div>
</template>

<script lang="ts" setup>
/**
 * 在这做websocket模块
 * 初始化模块
 */
import { ElLoading } from 'element-plus'
import { getLoginInfoDetail } from '@/server/employee_request'
import { useUserStore } from '@/stores'
import { useRouter, Router } from 'vue-router'

const instance = ElLoading.service({
  fullscreen: true
})
const router: Router = useRouter()
const userStore = useUserStore()
/**
 * 请求员工信息
 */
const queryEmployeeInfo = async () => {
  await getLoginInfoDetail().then((res) => {
    if (res && res.code == '0') {
      if (res.data) {
        userStore.setValue(res.data)
      }
    }
    instance.close()
  })

  router.push('/')
}

queryEmployeeInfo()
</script>

<style lang="scss" scoped>
.loading-box {
  width: 100vw;
  height: 100vh;
}
.text-span {
  z-index: 9999;
  position: absolute;
  top: 55vh;
  left: 43vw;
}
</style>
