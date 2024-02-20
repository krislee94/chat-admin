<template>
  <div class="home-box j-row">
    <div class="j-column">
      <div class="summary-box base-content">
        <span class="summary-title" v-t="'HOME.title1'"></span>

        <el-row style="margin-top: 6vh">
          <el-col :span="6">
            <div class="j-row tabu">
              <img src="@/assets/u1.png" alt="" />
              <div class="tabu-title j-column">
                <span class="span1" v-t="'HOME.title1-1'"></span>
                <span class="span2">{{ state.addUserNum }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="j-row tabu">
              <img src="@/assets/u2.png" alt="" />
              <div class="tabu-title j-column">
                <span class="span1" v-t="'HOME.title1-2'"></span>
                <span class="span2">{{ state.sessionAddNum }}</span>
              </div>
            </div></el-col
          >
          <el-col :span="6">
            <div class="j-row tabu">
              <img src="@/assets/u3.png" alt="" />
              <div class="tabu-title j-column">
                <span class="span1" v-t="'HOME.title1-3'"></span>
                <span class="span2">{{ state.csOnlineNum }}</span>
              </div>
            </div></el-col
          >
          <el-col :span="6">
            <div class="j-row tabu">
              <img src="@/assets/u4.png" alt="" />
              <div class="tabu-title j-column">
                <span class="span1" v-t="'HOME.title1-4'"></span>
                <span class="span2">{{ state.sensitiveWordNum }}</span>
              </div>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="echart-box base-content">
        <span class="summary-title" v-t="'HOME.title2'"></span>
        <EchartsVue
          :x-list="state.xList"
          :y-list="state.yList"
          x="65vw"
          y="60vh"
          v-if="state.xList.length > 0"
        />
      </div>
    </div>

    <div class="rank-box base-content">
      <rank :rank-data="state.rankData" @change="_changeDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive } from 'vue'
import {
  HomeDataRankingResponse,
  HomeDataTrendResponse,
  IHomeDataRankingRequest,
  rankingData,
  RankingType,
  summaryData,
  trendData
} from '@/server/home_request'
import { moment } from '@xr-util/util'
import EchartsVue from './component/index.vue'
import rank from './component/rank.vue'

interface IStateParam {
  addUserNum: number
  sessionAddNum: number
  csOnlineNum: number
  sensitiveWordNum: number
  trendData: HomeDataTrendResponse[]
  rankingType: RankingType
  rankData: HomeDataRankingResponse[]
  xList: any[]
  yList: any[]
}

const state: IStateParam = reactive({
  /**
   * 新增用户总数
   */
  addUserNum: 0,
  /**
   * 坐席在线总数
   */
  csOnlineNum: 0,
  /**
   * 敏感词总数
   */
  sensitiveWordNum: 0,
  /**
   * 会话总数
   */
  sessionAddNum: 0,
  trendData: [],
  rankingType: RankingType.Weekly,
  rankData: [],
  xList: [],
  yList: []
})
//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext.config.globalProperties
/**
 * 初始化
 */
const _init = async () => {
  //查询概况
  await summaryData().then((res) => {
    if (res && res.code == '0') {
      state.addUserNum = res?.data?.addUserNum ?? 0
      state.csOnlineNum = res?.data?.csOnlineNum ?? 0
      state.sensitiveWordNum = res?.data?.sensitiveWordNum ?? 0
      state.sessionAddNum = res?.data?.sessionAddNum ?? 0
    }
  })
  const arr = _getDays()
  const trendRequest = {
    startTime: arr[0],
    endTime: arr[arr.length - 1]
  }
  //查询图表信息
  await trendData(trendRequest).then((res) => {
    if (res && res.code == '0') {
      state.trendData = res?.data ?? []
    }
  })
  await _handleData()
  //查询rank排行
  await _getRankData()
}
_init()
/**
 * 获取rank数据
 */
const _getRankData = async () => {
  const rankParam: IHomeDataRankingRequest = {
    pageNo: 1,
    pageSize: 15,
    rankingType: state.rankingType
  }
  await rankingData(rankParam).then((res) => {
    if (res && res.code == '0') {
      state.rankData = res?.data ?? []
    }
  })
}

/**
 * 查询从昨天开始往前推，一个星期的信息
 */
const _getDays = (): string[] => {
  let arr = []
  for (let i = 8; i > 0; i--) {
    let date = null
    if (i == 1) {
      date = moment().subtract(i, 'days').format('YYYY-MM-DD')
    } else {
      date = moment().subtract(i, 'days').format('YYYY-MM-DD')
    }

    arr.push(date)
  }
  return arr
}
interface ISeriesParam {
  name: string
  type: string
  data: any[]
  itemStyle: any
}
//处理数据
const _handleData = async () => {
  let series: ISeriesParam[] = [
    {
      name: $t('HOME.title2-1'),
      type: 'bar',
      data: [],
      itemStyle: {
        normal: {
          color: '#FFB361'
        }
      }
    },
    {
      name: $t('HOME.title2-2'),
      type: 'bar',
      data: [],
      itemStyle: {
        normal: {
          color: '#5D88FF'
        }
      }
    }
  ]
  let xlen: any[] = []
  if (state.trendData && state.trendData.length > 0) {
    state.trendData.forEach((item) => {
      if (item && item.addUserNum) {
        series[0].data.push(item.addUserNum)
      } else {
        series[0].data.push(0)
      }
      if (item && item.sessionAddNum) {
        series[1].data.push(item.sessionAddNum)
      } else {
        series[1].data.push(0)
      }
      if (item && item.statDay) {
        xlen.push(item.statDay)
      }
    })
  }

  state.yList = series
  state.xList = xlen
}

const _changeDate = (value: string) => {
  if (value && value == 'week') {
    state.rankingType = RankingType.Weekly
  } else if (value && value == 'month') {
    state.rankingType = RankingType.Monthly
  } else if (value && value == 'day') {
    state.rankingType = RankingType.Daily
  }
  _getRankData()
}
</script>

<style lang="scss" scoped>
.home-box {
  padding: 1.25rem;
  background: #f4f5f8;
  width: 96.5vw;
  height: 100vh;

  .summary-title {
    color: #434343;
    font-size: 1.125rem;
  }
  .summary-box {
    width: 73vw;
    height: 25vh;
    min-height: 11rem;
    .summary-title {
      color: #434343;
      font-size: 1.125rem;
    }
    .tabu {
      img {
        width: 3.75rem;
        height: 3.75rem;
        margin-right: 1.5rem;
      }
      .span1 {
        color: #8c8c8c;
        font-size: 0.875rem;
      }
      .span2 {
        font-weight: 500;
        font-size: 2.25rem;
        color: #434343;
        line-height: 2.575rem;
      }
    }
  }

  .echart-box {
    width: 73vw;
    height: 69.5vh;
    margin-top: 2vh;
  }
  .rank-box {
    width: 22vw;
    height: 96.5vh;
    margin-left: 1vw;
    min-width: 15rem;
  }
}
</style>
