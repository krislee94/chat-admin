<template>
  <div class="editor-level-box">
    <el-dialog
      v-model="visible"
      width="30%"
      :title="$t('GAME.add_rule_info')"
      destroy-on-close
      @close="cancel"
    >
      <!-- <span>编辑</span> -->
      <el-form v-model="form">
        <el-form-item :label="$t('GAME.customer_level')">
          <el-input v-model="formatValue" disabled />
        </el-form-item>
        <el-form-item :label="$t('GAME.user_level')">
          <el-select
            v-model="form.userLevelList"
            multiple
            :placeholder="$t('GAME.choose_user_level')"
            style="width: 100%"
          >
            <el-option
              v-for="item in userLevelList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
          <el-button type="primary" @click="confirm"> {{ $t('COMMON.confirm') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, PropType, reactive } from 'vue'
import { IMerchantDistLevelEditRequest } from '@/server/game_request'
import { formatCs, userLevelList } from '@/server/game_request'

interface IFormParam {
  merchantId?: string
  csLevel?: string
  userLevelList?: string[]
}

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false
  },
  info: {
    type: Object as PropType<IMerchantDistLevelEditRequest>,
    required: true
  }
})

const emit = defineEmits(['cancel', 'confirm'])
const visible = ref(false)
const formatValue = ref('')

const form: IFormParam = reactive({
  merchantId: '',
  csLevel: '',
  userLevelList: []
})

//监听数据变化
watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)

watch(
  () => props.info,
  (newValue, _) => {
    if (newValue && newValue.merchantId && newValue.csLevel) {
      form.merchantId = newValue.merchantId
      form.csLevel = newValue.csLevel
      form.userLevelList = newValue.userLevelList || []

      formatValue.value = formatCs(form.csLevel)
    }
  }
)

const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  emit('confirm', form)
}
</script>

<style lang="scss" scoped></style>
