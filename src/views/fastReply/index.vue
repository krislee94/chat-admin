<template>
  <div class="j-row">
    <MenuVue />
    <div class="setting-component-box">
      <settingTitle :title="$t('SETTING.customize_reply')" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <div class="setting-main">
          <fastReply />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import settingTitle from '@/views/setting/component/setting-title.vue'
import fastReply from '../setting/component/fast-reply.vue'
import MenuVue from '@/components/setting/menu.vue'
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 83.4vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    height: 90vh;
  }
}
</style>
