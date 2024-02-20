<template>
  <el-dialog v-model="visible" :title="$t('xr_tanslate_setting')" style="border-raidus: 8px">
    <el-form v-modle="form" label-width="120px">
      <el-form-item :label="$t('xr_translate_source')">
        <el-select v-model="form.source" :placeholder="$t('p_s_select_source')">
          <el-option
            v-for="item in form.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('xr_rz_key')">
        <el-input v-model="form.key" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">{{ $t('COMMON.cancel') }}</el-button>
        <el-button type="primary" @click="updateTranslateSource">
          {{ $t('COMMON.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType } from 'vue'
import {
  TranslationConfigEntity,
  updateTranslate,
  ITranslationConfigEditRequest
} from '@/server/setting_request'
import { useI18n } from 'vue-i18n'
import { messageSuccess } from '@xr-util/xr-ui'

const visible = ref(false)

const { t } = useI18n()

const props = defineProps({
  options: {
    type: Object as PropType<TranslationConfigEntity[]>
  }
})

const form = reactive({
  source: '',
  key: '',
  options: [] as any
})

const init = () => {
  if (props.options) {
    form.options = props.options
    form.key = props.options.filter((item) => item.selected)[0]?.secret || ''
    form.source = props.options.filter((item) => item.selected)[0]?.id || ''
  }
}
init()

const open = () => {
  visible.value = true
}

defineExpose({ open })

/**
 * 更新翻译源
 * */
const updateTranslateSource = () => {
  const item = props.options?.filter((r) => r.id == form.source)[0]
  if (!item) return

  const param: ITranslationConfigEditRequest = {
    id: form.source,
    name: item.name,
    key: form.key,
    secret: form.key,
    selected: true
  }
  updateTranslate(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess('success')
      visible.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 100%;
}
</style>
