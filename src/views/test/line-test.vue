<template>
  <div class="circle">
    <div class="outer-circle"></div>
    <div class="inner-circle"></div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.circle {
  width: 200px; /* 设置圆的直径 */
  height: 200px; /* 设置圆的直径 */
  position: relative; /* 设置相对定位，以便子元素可以相对于父元素进行定位 */
  margin: 0 auto; /* 居中显示 */
  animation: circleRotate 2s linear infinite; /* 设置整个圆形的旋转动画 */
}

.outer-circle {
  width: 100%; /* 设置外圈圆形的直径 */
  height: 100%; /* 设置外圈圆形的直径 */
  border: 2px solid black; /* 设置外圈圆形的边框 */
  border-radius: 50%; /* 将元素的形状调整为圆形 */
  position: absolute; /* 设置绝对定位，相对于父元素进行定位 */
  top: 0; /* 将外圈圆形的顶部定位到父元素的顶部 */
  left: 0; /* 将外圈圆形的左侧定位到父元素的左侧 */
  border-bottom: none; /* 只显示圆形的上半部分 */
  clip-path: polygon(
    0 0,
    100% 0,
    100% 50%,
    50% 50%,
    50% 100%,
    0 100%
  ); /* 使用clip-path属性定义只在指定区域显示内容 */
}

.inner-circle {
  width: 50%; /* 设置内圈圆形的直径为外圈圆形的一半 */
  height: 50%; /* 设置内圈圆形的直径为外圈圆形的一半 */
  background-color: blue; /* 设置内圈圆形的背景颜色 */
  border-radius: 50%; /* 将元素的形状调整为圆形 */
  position: absolute; /* 设置绝对定位，相对于父元素进行定位 */
  top: 50%; /* 将内圈圆形的顶部定位到父元素的中心位置 */
  left: 50%; /* 将内圈圆形的左侧定位到父元素的中心位置 */
  transform: translate(-50%, -50%); /* 将内圈圆形的中心位置定位到父元素的中心位置 */
}

@keyframes circleRotate {
  0% {
    transform: rotate(0deg); /* 设置初始旋转角度为0度 */
  }
  100% {
    transform: rotate(360deg); /* 设置最终旋转角度为360度 */
  }
}
</style>
