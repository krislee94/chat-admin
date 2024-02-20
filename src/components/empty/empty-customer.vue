<template>
  <div>
    <div class="empty-customer-box" v-if="props.emptyType == 'customer'">
      <img src="@/assets/empty-customer.png" />
      <span>未添加员工</span>
      <p>暂无员工，赶紧添加团队成员吧！</p>
    </div>

    <div class="empty-customer-box" v-if="props.emptyType == 'game'">
      <img src="@/assets/empty-game.png" />
      <span>未添加游戏</span>
      <p>未添加游戏，接入后可解锁更多功能！</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  emptyType: {
    type: String,
    required: false,
    default: 'customer'
  }
})
</script>

<style lang="scss" scoped>
.empty-customer-box {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 12vw;
    height: 14vh;
  }
  span {
    margin-top: 3.4375rem;
  }
  p {
    color: #bfbfbf;
    font-size: 0.875rem;
  }
}
</style>
