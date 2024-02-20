<template>
  <div class="loading-box"></div>
</template>

<script lang="ts" setup>
import { ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore, useMessageStore } from '@/stores'
import { getLoginInfoDetail } from '@/server/employee_request'
import { sliderData } from '@/api/slider'

const router = useRouter()
const userStore = useUserStore()

const openFullScreen = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'loading...',
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.7)'
  })

  getLoginInfoDetail()
    .then((res) => {
      if (res && res.code == '0') {
        if (res.data) {
          //塞入当前值
          userStore.setValue(res.data)
          //塞入聊天内容中
          if (res.data && res.data?.headerImgUrl) {
            useMessageStore().setParams({ geterImg: res.data.headerImgUrl })
          } else {
            useMessageStore().setParams({
              geterImg: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            })
          }
        }
      }
    })
    .then(() => {
      if (sliderData && sliderData.length > 0) {
        //跳转到对应的页面
        loading.close()
        router.push(sliderData[0].path)
      } else {
        // messageError('您暂未拥有任何权限，请联系管理员设置')
        loading.close()
        ElMessage({
          message: '您暂未拥有任何权限，请联系管理员设置',
          duration: 6000,
          showClose: true
        })
        setTimeout(() => {
          userStore.loginOut()
        }, 300)
      }
    })
}

openFullScreen()
</script>

<style lang="scss" scoped>
.loading-box {
  width: 100vw;
  height: 100vh;
}
</style>
