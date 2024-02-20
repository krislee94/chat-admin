<template>
  <div class="rank-box-1">
    <span class="txt1" v-t="'HOME.title3'"></span>
    <div class="rank-box2 j-column-center">
      <div class="tab-box j-row-center">
        <div
          v-for="item in data"
          :class="item.isActive ? 'bg' : ''"
          @click="handleClick(item)"
          :key="item.id"
          class="item-style overhide"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="j-row rank-header">
      <!-- 亚军 -->
      <div class="sencond-box j-column-center">
        <img src="@/assets/2@2x.png" />

        <div style="margin-top: 2px" class="j-column-center">
          <el-avatar
            :size="50"
            :src="state.rankData[1].headerImgUrl"
            v-if="state.rankData && state.rankData[1]"
          />
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            v-else
          />
          <p class="p1">{{ state.rankData[1]?.employeeName || $t('HOME.title4') }}</p>
          <p class="p2">{{ state.rankData[1]?.receptionNum || 0 }}</p>
        </div>
      </div>
      <!-- 冠军 -->
      <div class="first-box j-column-center">
        <img src="@/assets/1@2x.png" />

        <div style="margin-top: 2px" class="j-column-center">
          <el-avatar
            :size="65"
            :src="state.rankData[0].headerImgUrl"
            v-if="state.rankData && state.rankData[0]"
          />
          <el-avatar
            :size="65"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            v-else
          />
          <p class="p1">{{ state.rankData[0]?.employeeName || $t('HOME.title4') }}</p>
          <p class="p2">{{ state.rankData[0]?.receptionNum || 0 }}</p>
        </div>
      </div>
      <!-- 季军 -->
      <div class="third-box j-column-center">
        <img src="@/assets/3@2x.png" />

        <div style="margin-top: 2px" class="j-column-center">
          <el-avatar
            :size="50"
            :src="state.rankData[2].headerImgUrl"
            v-if="state.rankData && state.rankData[2]"
          />
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            v-else
          />
          <p class="p1">{{ state.rankData[2]?.employeeName || $t('HOME.title4') }}</p>
          <p class="p2">{{ state.rankData[2]?.receptionNum || 0 }}</p>
        </div>
      </div>
    </div>

    <div class="rank-content">
      <el-table :header-cell-style="headerCellStyle" :data="state.secData">
        <el-table-column :label="$t('HOME.title3-4')">
          <template #default="scope">
            <span>{{ scope.row.rank || '' }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('HOME.title3-5')">
          <template #default="scope">
            <div class="j-row-center">
              <el-avatar
                :size="30"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                v-if="!scope.row.headerImgUrl"
              />
              <el-avatar :size="30" :src="scope.row.headerImgUrl" v-if="scope.row.headerImgUrl" />
              <p style="margin-left: 4px">{{ scope.row.employeeName }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('HOME.title3-6')" prop="receptionNum" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { headerCellStyle } from '@/server/table'
//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const props = defineProps({
  rankData: {
    required: true,
    type: Array,
    default: []
  }
})
const emit = defineEmits(['change'])
console.log(props)
interface IStateParam {
  rankData: any[]
  secData: any[]
}
const state: IStateParam = reactive({
  rankData: props.rankData,
  secData: props.rankData.slice(3)
})

watch(
  () => props.rankData,
  (newValue, _) => {
    console.log(newValue)
    if (newValue && newValue.length > 0) {
      state.rankData = newValue
      state.secData = newValue.slice(3)
      _formatSec()
    } else {
      state.rankData = []
      state.secData = []
    }
  }
)
const activeName = ref('day')
let data = reactive([
  {
    id: '1',
    name: $t('HOME.title3-1'),
    value: 'day',
    isActive: false
  },
  {
    id: '2',
    name: $t('HOME.title3-2'),
    value: 'week',
    isActive: true
  },
  {
    id: '3',
    name: $t('HOME.title3-3'),
    value: 'month',
    isActive: false
  }
])

const handleClick = (item: any) => {
  //   console.log(tab, event)
  activeName.value = item.value
  data = data.map((j) => {
    if (j.id == item.id) {
      j.isActive = true
    } else {
      j.isActive = false
    }
    return j
  })
  emit('change', item.value)
}

const _formatSec = () => {
  let arr = []
  if (props.rankData) {
    for (let i = 0; i < props.rankData.length; i++) {
      //@ts-ignore
      props.rankData[i].rank = i + 1
      arr.push(props.rankData[i])
    }
  }
  if (arr && arr.length > 2) {
    state.secData = arr.splice(3)
  } else {
    state.secData = []
  }

  console.log(state.secData)
}
</script>

<style lang="scss" scoped>
.rank-box-1 {
  width: 100%;
  height: 100%;

  .rank-box2 {
    width: 100%;
  }
  .txt1 {
    font-size: 1.125rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    color: #434343;
    line-height: 22px;
  }
  .tab-box {
    width: 12.25rem;
    height: 2.25rem;
    border-radius: 1.125rem;
    background-color: #e5f4ff;
    justify-content: space-around;
    margin-top: 2.8125rem;
    text-align: center;
    cursor: pointer;
  }
  .text-style {
    font-size: 14px;
    color: #434343;
  }
  .bg {
    background: #0d6efd;
    color: #fff;
    width: 4.1rem;
    height: 2.25rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sencond-box {
    margin-right: 4px;
    img {
      width: 1.25rem;
      height: 1.0625rem;
    }
  }
  .first-box {
    img {
      width: 1.5rem;
      height: 1.2769rem;
    }
  }
  .third-box {
    margin-left: 4px;
    img {
      width: 1.25rem;
      height: 1.0625rem;
    }
  }
  .rank-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2.375rem;
    // text-align:;
  }
  .p1 {
    font-size: 0.75rem;
    color: #434343;
  }
  .p2 {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #434343;
    font-weight: 500;
  }
  .rank-content {
    margin-top: 0.75rem;
  }
  .item-style {
    width: 4.083rem;
    text-align: center;
  }
}
</style>
