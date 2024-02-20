<template>
  <div class="account-allocation-style">
    <MenuVue />
    <div class="setting-component-box">
      <settingTitle :title="$t('t_distribute')" />

      <main style="padding: 1rem 1rem 1rem 0">
        <div class="allocation-content">
          <el-col>
            <el-row :gutter="10">
              <div>
                <el-tabs tab-position="left" style="height: 87vh">
                  <el-tab-pane label="Zalo"><Distribute /></el-tab-pane>
                  <!-- <el-tab-pane label="telegream">Telegream</el-tab-pane> -->
                </el-tabs>
              </div>
            </el-row>
            <el-row :gutter="10">
              <div></div>
            </el-row>
          </el-col>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuVue from '@/components/setting/menu.vue'
import settingTitle from '@/views/setting/component/setting-title.vue'
import Distribute from './component/index.vue'
</script>

<style lang="scss" scoped>
.account-allocation-style {
  display: flex;
  flex-direction: row;
  height: 100%;

  .setting-component-box {
    width: 82vw;
    height: 100vh;
    background-color: var(--xr-color-bg);
    padding: 1.25rem;

    .allocation-content {
      width: 100%;
      height: 90vh;

      box-sizing: border-box;
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.05);

      padding: 1rem;
    }
  }
}
</style>
