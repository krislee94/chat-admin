<template>
  <div class="echarts">
    <div :id="id" :style="{ width: x, height: y }"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted, getCurrentInstance } from 'vue'
const id = ref(Math.random().toString().slice(2))

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const title21 = ref($t('HOME.title2-1'))
const title22 = ref($t('HOME.title2-2'))

const lenData = [`${title21.value}`, `${title22.value}`]

const props = defineProps({
  x: {
    type: String,
    default: '600px'
  },
  y: {
    type: String,
    default: '400px'
  },
  xList: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  yList: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  type: {
    type: String,
    default: 'bar'
  }
})
onMounted(() => {
  drawEcharts()
})

const drawEcharts = () => {
  if (id && document.getElementById(id.value)) {
    //@ts-ignore
    let myCharts = echarts.init(document.getElementById(id.value))
    //
    let option = {
      legend: {
        data: lenData
      },
      // toolbox: {
      //   show: true,
      //   orient: 'vertical',
      //   left: 'right',
      //   top: 'center',
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar', 'stack'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      tooltip: [
        {
          z: 60,
          show: true,
          showContent: true,
          triggerOn: 'mousemove',
          alwaysShowContent: false,
          displayMode: 'single',
          renderMode: 'auto',
          confine: null,
          showDelay: 0,
          hideDelay: 100,
          transitionDuration: 0.4,
          enterable: false,
          backgroundColor: '#fff',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, .2)',
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          borderRadius: 4,
          borderWidth: 1,
          padding: null
        }
      ],
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        data: props.xList
      },
      yAxis: {
        type: 'value'
      },
      series: props.yList
    }
    // 使用刚指定的配置项和数据显示图表。
    myCharts.setOption(option)
  }
}
</script>

<style lang="scss" scoped></style>
