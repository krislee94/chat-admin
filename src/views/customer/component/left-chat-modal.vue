<template>
  <el-popover
    placement="right"
    :width="300"
    trigger="click"
    :hide-after="0"
    style="border-radius: 1rem !important"
  >
    <template #reference>
      <div class="tou-xiang">
        <img
          :src="userStore.headerImgUrl"
          class="default-header-img-max"
          style="cursor: pointer"
          v-img-error:headerImgUrl-employee
          alt=""
        />
        <i
          class="iconfont color1 ic-absolute"
          v-if="csStatus == CSStatus.Free"
          style="font-size: 0.75rem"
          >&#xe612;</i
        >
        <i
          class="iconfont color2 ic-absolute"
          v-if="csStatus == CSStatus.Busy"
          style="font-size: 0.75rem"
          >&#xe610;</i
        >
      </div>
    </template>

    <div>
      <div class="left-chat-modal-header j-row">
        <el-upload
          :before-upload="beforeUpload"
          ref="uploadRef"
          :show-file-list="false"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
        >
          <img
            :src="uploadImgUrl"
            class="default-header-img-max"
            v-img-error:headerImgUrl-employee
            alt=""
          />
        </el-upload>
        <div class="j-cloumn" style="margin-left: 0.75rem">
          <span class="user-name">{{ userStore.name }}</span>
          <span v-for="item in userStore.roleList" class="role-name" :key="item.id">{{
            _formatName(item)
          }}</span>
        </div>
      </div>
      <el-divider />

      <div class="left-chat-modal-bottom j-column">
        <div class="text-sp">
          <span class="t1" v-t="'USER.userid'"></span>
          <span class="t2">{{ userStore.shortId }}</span>
        </div>
        <div
          class="text-sp"
          v-if="userStore.permissionList && userStore.permissionList.includes('im:cs')"
        >
          <span class="t1" v-t="'USER.name'"></span>
          <span class="t2">{{ userStore.name }}</span>
        </div>
        <div class="text-sp">
          <span class="t1" v-t="'USER.account'"></span>
          <span class="t2">{{ userStore.accountName }}</span>
        </div>
        <div class="text-sp">
          <span class="t1" v-t="'USER.password'"></span>

          <span class="t2" v-show="!showPasswordFlag">********</span>
          <el-input
            v-model="password"
            v-show="showPasswordFlag"
            @blur="cPassWordModal"
            :placeholder="$t('USER.setTitle')"
            size="small"
          />
          <el-button
            v-if="showPasswordFlag"
            type="primary"
            @mousedown="changepwd"
            style="margin-left: 3px"
            >{{ $t('COMMON.confirm') }}</el-button
          >

          <el-button
            v-show="!showPasswordFlag"
            type="primary"
            link
            size="small"
            style="margin-left: 0.5rem"
            @click="cPassWordModal"
            >{{ $t('USER.change') }}</el-button
          >
        </div>
      </div>

      <el-divider />

      <div class="j-row-center">
        <span v-t="'USER.language'"></span>
        <el-select
          v-model="selectLanaguage"
          style="margin-left: 10px; width: 8vw"
          size="small"
          @change="changeLan"
        >
          <el-option
            v-for="item in ISO639List"
            :id="item.value"
            :label="item.text"
            :value="item.re"
            :key="item.value"
          />
        </el-select>
      </div>
      <el-divider />
      <div v-if="userStore.permissionList && userStore.permissionList.includes('im:cs')">
        <div class="icon-item" @click="changeCsStatus(CSStatus.Free)">
          <i class="iconfont color1">&#xe612;</i>
          <span v-t="'USER.free'"></span>
        </div>
        <div class="icon-item" @click="changeCsStatus(CSStatus.Busy)">
          <i class="iconfont color2">&#xe610;</i>
          <span v-t="'USER.busy'"></span>
        </div>
        <el-divider />
      </div>

      <div class="log-out-item" @click="logoutUser" v-t="'USER.loginout'"></div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from 'vue'
import { useLangStore, useUserStore } from '@/stores'
import {
  changeHeaderImg,
  changeLanguage,
  changePassword,
  changeStatus,
  CSStatus,
  loginOut
} from '@/server/employee_request'
import { UploadRawFile } from 'element-plus'
import { ISO639List } from '@/api/language'
import { messageSuccess, messageWarning } from '@xr-util/xr-ui'
import { uploadFileAndDownload } from '@/utils/file2bite'
import { useI18n } from 'vue-i18n'
import moment from 'moment'
import { setMomentLang } from '@/utils/lang-moment'

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const userStore = useUserStore()
const langStore = useLangStore()

const { locale } = useI18n()

const showPasswordFlag = ref(false)
const password = ref('')
const selectLanaguage = ref(userStore.language)
const uploadImgUrl = ref(userStore.headerImgUrl)

const csStatus = ref(userStore.csStatus)
const _formatName = (item: { name: any }) => {
  if (item) {
    return item?.name || ''
  }
}

watch(
  () => userStore.csStatus,
  (newValue) => {
    csStatus.value = newValue
  }
)
watch(
  () => userStore.language,
  (newValue) => {
    selectLanaguage.value = newValue
  }
)
/**
 * 退出登录
 */
const logoutUser = () => {
  loginOut().then((res) => {
    if (res && res.code == '0') {
      console.log('退出登录成功')
    }
  })

  userStore.loginOut()
}

const beforeUpload = async (rawFile: UploadRawFile) => {
  uploadFileAndDownload(rawFile, false).then((res) => {
    if (res && res?.key && res.url) {
      uploadImgUrl.value = res.url
      const param = {
        headerImgUrl: res.key
      }
      changeHeaderImg(param).then((res) => {
        if (res && res.code == '0') {
          messageSuccess($t('BUSINESS.header_change_success'))
          userStore.queryUserInfo()
        }
      })
    }
  })

  return false
}
/**
 * 更改语言
 */

const changeLan = async () => {
  if (!selectLanaguage.value) return

  console.log('selectLanguage:', selectLanaguage.value)

  const arr = ISO639List.filter((item) => item && item.re == selectLanaguage.value)
  if (arr && arr.length > 0) {
    langStore.setLang(arr[0].value)
    locale.value = arr[0].value
    userStore.locale = arr[0].value
    if (arr[0].value == 'zh') {
      //2.8.1弃用 moment.lang  2.12.0已弃用moment.locale, 使用
      moment.updateLocale('zh-cn', null)
    } else {
      //moment.设置语言
      // moment.updateLocale(`${arr[0].value}`, null)
      setMomentLang(arr[0].value)
    }
  }
  changeLanguage({
    //@ts-ignore
    language: selectLanaguage.value
  }).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.lan_set_success'))
      userStore.queryUserInfo()
    }
  })
}

/**
 * 更改坐席状态
 *
 * @param value
 */
const changeCsStatus = async (value: string) => {
  //更改状态
  await changeStatus({
    //@ts-ignore
    csStatus: value
  }).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.agent_set_success'))
    }
  })
  //查询用户信息
  await userStore.queryUserInfo()
}

/**
 * 更改密码
 *
 */
const cPassWordModal = () => {
  //更改Mima
  showPasswordFlag.value = !showPasswordFlag.value
}

const changepwd = (event: any) => {
  event.stopPropagation() // 阻止事件冒泡
  if (password.value.length == 0) {
    messageWarning($t('BUSINESS.password_not_empty'))
    return
  } else if (password.value.length < 6) {
    messageWarning($t('BUSINESS.password_length_error'))
    return
  }

  changePassword({
    password: password.value
  }).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('BUSINESS.password_success'))
      cPassWordModal()
    }
  })
  password.value = ''
}
</script>

<style lang="scss" scoped>
.left-chat-modal-header {
  .user-name {
    font-size: 1.125rem;
    font-weight: 500;
    color: #434343;
  }
  .role-name {
    color: #bfbfbf;
    font-size: 0.875rem;
  }
}
.text-sp {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  .t1 {
    width: 5.5rem;
    color: #bfbfbf;
    font-size: 0.875rem;
    display: flex;
  }
  .t2 {
    // margin-left: ;
    font-size: 0.875rem;
    color: #434343;
  }
}
.icon-item {
  width: 100%;
  height: 32px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin-left: 20px;
    font-size: 14px;
    color: #434343;
  }
}
.icon-item:hover {
  background: #e5f4ff;
}
.color1 {
  color: rgb(50, 202, 100);
}
.color2 {
  color: rgb(249, 112, 42);
}
.log-out-item {
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.log-out-item:hover {
  background-color: #e5f4ff;
}
.tou-xiang {
  position: relative;

  .ic-absolute {
    position: absolute;
    bottom: -3px;
    right: 0;
  }
}
.user-img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 4px;
}
</style>
