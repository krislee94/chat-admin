<template>
  <el-select
    v-model="selectValue"
    @change="changeValue"
    style="width: 6rem; margin-left: 10px"
    placeholder=""
  >
    <div v-if="props.selectType && props.selectType === 'own-second'">
      <el-option
        v-for="item in selectTimeList"
        :key="item.id"
        :value="item.value"
        :label="item.text"
      />
    </div>
    <div v-if="props.selectType && props.selectType === 'no-second'">
      <el-option
        v-for="item in selectTimeListNoSecond"
        :key="item.id"
        :value="item.value"
        :label="item.text"
      />
    </div>
  </el-select>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { TimeUnit } from '@/server/system_config_request'

const props = defineProps({
  selectType: {
    type: String,
    required: false,
    default: 'own-second'
  },

  initValue: {
    type: String,
    requried: false
  }
})
//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext?.config?.globalProperties

//选择的值
const selectValue = ref(props.initValue || '')

const emit = defineEmits(['setValue'])

interface ISelectTimeListParam {
  id: string
  text: string
  value: string
}

const selectTimeList: ISelectTimeListParam[] = [
  {
    id: '1',
    text: $t('t_hour'),
    value: TimeUnit.Hour
  },
  {
    id: '2',
    text: $t('t_minute'),
    value: TimeUnit.Minute
  },
  {
    id: '3',
    text: $t('t_second'),
    value: TimeUnit.Second
  }
]

const selectTimeListNoSecond: ISelectTimeListParam[] = [
  {
    id: '1',
    text: $t('t_hour'),
    value: TimeUnit.Hour
  },
  {
    id: '2',
    text: $t('t_minute'),
    value: TimeUnit.Minute
  }
]

const changeValue = (val: any) => {
  console.log(val)
  emit('setValue', val)
}
</script>

<style scoped lang="scss"></style>
