<template>
  <div class="setting-menu">
    <el-menu
      default-active="/customer-control"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#409EFF"
      router
    >
      <!-- 偏好设置 -->
      <el-menu-item index="/login/setting" v-auth:im:setting:preference>
        <div class="set-box">
          <icon-park
            type="edit-name"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />
          <span class="set-box-span"> {{ $t('SETTING.perferences') }} </span>
        </div>
      </el-menu-item>
      <el-menu-item index="/setting/chat/fastReply" v-auth:im:setting:fastreply>
        <div class="set-box">
          <icon-park
            type="airplane"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />
          <span class="set-box-span"> {{ $t('CHAT.fast_reply') }} </span>
        </div>
      </el-menu-item>
      <el-menu-item index="/setting/chat/replace" v-auth:im:setting:sensitive
        ><div class="set-box">
          <icon-park
            type="repair"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />
          <span class="set-box-span"> {{ $t('SETTING.sensitive-change') }}</span>
        </div></el-menu-item
      >
      <el-menu-item index="/hole/setting" v-auth:im:setting:hole>
        <div class="set-box">
          <icon-park
            type="tool"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />
          <span class="set-box-span">{{ $t('xr_hole_tile') }}</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/account/allocation" v-auth:im:setting:thirdapp>
        <!-- <people-right theme="outline" size="24" fill="#333"/> -->
        <div class="set-box">
          <icon-park
            type="people-right"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />
          <span class="set-box-span">{{ $t('t_distribute') }}</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/role" v-auth:im:setting:role>
        <!-- <people-right theme="outline" size="24" fill="#333"/> -->
        <div class="set-box">
          <icon-park
            type="permissions"
            theme="outline"
            size="20"
            fill="#333"
            style="margin-right: 0.75rem"
          />

          <span class="set-box-span">{{ $t('t_role_control') }}</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { IconPark } from '@icon-park/vue-next/es/all'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.setting-menu {
  height: 100vh;
  width: 13.3vw;
  padding: 1.25rem 0.5rem;
  .set-box {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    .icon {
      font-size: 1.25rem;
    }
    .set-box-span {
      font-size: 0.875rem;
      color: #434343;
      font-weight: 500;
      line-height: 1.375rem;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

:deep(.el-menu) {
  //   height: 100vh;
  border-right: none;
}
:deep(.el-menu-item:hover) {
  border-radius: 6px;
  background-color: #e6f0ff;
}
</style>
