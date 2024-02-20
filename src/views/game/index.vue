<template>
  <div class="j-row">
    <div class="setting-component-box">
      <settingTitle :title="$t('GAME.game_title')" />
      <!-- 设置主内容加载在这里(= =) -->
      <main>
        <div class="setting-main">
          <gameIn />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import settingTitle from '@/views/setting/component/setting-title.vue'
import gameIn from '../setting/game-in.vue'
</script>

<style lang="scss" scoped>
.setting-component-box {
  width: 96.5vw;
  height: 100vh;
  background-color: var(--xr-color-bg);
  padding: 1.25rem;

  .setting-main {
    margin-top: 17px;
    width: 100%;
    height: 88vh;
  }
}
</style>
