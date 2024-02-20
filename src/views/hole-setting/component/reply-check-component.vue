<template>
  <el-dialog v-model="visible" :title="$t('t_reply_set_title')" width="30%" destroy-on-close>
    <div class="reply-box">
      <span class="reply-title">{{ $t('t_reply_set_timeout_span') }}</span>

      <!--      设置超时时间-->
      <div class="set-reply-title flex row">
        <span>{{ $t('t_reply_time') }}</span>
        <el-input v-model="replyValue" style="width: 4rem" />
        <SelectComponent @set-value="setEmitValue" :init-value="props.unit" />
      </div>

      <div style="margin-top: 2rem">
        <span class="reply-title" style="margin-left: 100px">{{ $t('t_reply_set_desc') }}}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex cursor-pointer row" style="margin-top: 1rem; justify-content: flex-end">
        <div class="cursor-pointer left-btn" @click="cancel">
          <icon-park type="close" theme="outline" fill="red" />
        </div>

        <div class="cursor-pointer right-btn" @click="sureConfirm">
          <icon-park type="check" theme="outline" fill="#fff" size="20" />
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import SelectComponent from '@/components/select-component/select-time-unit.vue'
import { TimeUnit, updateSessionCheckReply } from '@/server/system_config_request'
import type { ISysConfigSessionAutoRequest } from '@/server/system_config_request'

const props = defineProps({
  unit: {
    type: String
  },
  timeValue: {
    type: Number
  }
})

const emit = defineEmits(['sureConfirm'])
console.log('---------', props.unit, props.timeValue)
//控制弹窗是否展示
const visible = ref<boolean>(false)
const replyValue = ref<number>(props?.timeValue ?? 0)

const timeUnit = ref(props.unit)

const open = () => {
  visible.value = true
}

//暴露API
defineExpose({ open })

//----------------------------------------------------------------------------------

const setEmitValue = (val: string) => {
  timeUnit.value = val
}
const cancel = () => {
  visible.value = false
}

const sureConfirm = () => {
  if (!timeUnit.value || !replyValue.value) {
    return
  }
  let param: ISysConfigSessionAutoRequest = {
    config: {
      timeUnit: timeUnit.value,
      timeValue: Number(replyValue.value) || 0
    }
  }
  updateSessionCheckReply(param).then((res) => {
    if (res && res.code == '0') {
      timeUnit.value = TimeUnit.Hour
      //@ts-ignore
      replyValue.value = ''
      visible.value = false
      emit('sureConfirm')
    }
  })
}
//-------------------watch------------------------------

watch(
  () => props.timeValue,
  (newValue) => {
    if (newValue) {
      replyValue.value = newValue
    }
  }
)
watch(
  () => props.unit,
  (newValue) => {
    if (newValue) {
      timeUnit.value = newValue
    }
  }
)
</script>

<style scoped lang="scss">
.reply-box {
  .reply-title {
    font-size: 12px;
    color: #bdc3c7;
  }
  .set-reply-title {
    margin-top: 2rem;
    align-items: center;
    span {
      min-width: 100px;
    }
  }
}
</style>
