<template>
  <icon-park
    :type="props.iconType"
    theme="outline"
    :size="props.size"
    :fill="props.color"
    @click="doIt"
  />
</template>

<script lang="ts" setup>
import { IconPark } from '@icon-park/vue-next/es/all'

const emit = defineEmits(['tClick'])

const props = defineProps({
  iconType: {
    type: String,
    required: true,
    default: 'hamburger-button'
  },
  size: {
    type: String,
    required: false,
    default: '16'
  },
  color: {
    type: String,
    required: false,
    default: '#0d6efd'
  }
})

const doIt = () => {
  emit('tClick')
}
</script>

<style lang="scss" scoped></style>
