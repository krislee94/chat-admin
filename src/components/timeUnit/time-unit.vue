<template>
  <div class="">
    <div v-if="props.timeUnit && props.timeUnit == TimeUnit.Hour">
      <span>{{ $t('t_hour') }}</span>
    </div>

    <div v-if="props.timeUnit && props.timeUnit == TimeUnit.Minute">
      <span>{{ $t('t_minute') }}</span>
    </div>

    <div v-if="props.timeUnit && props.timeUnit == TimeUnit.Second">
      <span>{{ $t('t_second') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TimeUnit } from '@/server/system_config_request'
const props = defineProps({
  timeUnit: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
