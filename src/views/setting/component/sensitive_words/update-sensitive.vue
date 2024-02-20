<template>
  <div class="update-sensitive-box">
    <el-dialog
      v-model="visible"
      :title="$t('SETTING.update_sensitive')"
      width="30%"
      center
      destroy-on-close
      @close="cancelModal"
    >
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item :label="$t('SETTING.sensitive_words')" prop="sensitiveWords">
          <el-input v-model="ruleForm.sensitiveWords" />
        </el-form-item>

        <el-form-item :label="$t('SETTING.replace_sentence')" prop="sensitiveText">
          <el-input v-model="ruleForm.sensitiveText" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModal">{{ $t('COMMON.cancel') }}</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            {{ $t('COMMON.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, PropType, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { _ } from '@xr-util/util'
import { messageError } from '@xr-util/xr-ui'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

interface IShowInfoParam {
  id: string
  keyword: string
  replaceContent: string
}
const ruleFormRef = ref<FormInstance>()
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  showInfo: {
    type: Object as PropType<IShowInfoParam>,
    required: false
  }
})
const visible = ref(props.show)

// --------------- 数据监听 --------------------
watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)

watch(
  () => props.showInfo,
  (newValue: any, _) => {
    ruleForm.sensitiveWords = newValue.keyword
    ruleForm.sensitiveText = newValue.replaceContent
  }
)
//-----------------------------------------------
//事件触发
const emit = defineEmits(['cancel', 'confirm'])
const ruleForm = reactive({
  sensitiveWords: props?.showInfo?.keyword || '',
  sensitiveText: props?.showInfo?.replaceContent || ''
})

const rules = reactive<FormRules>({
  sensitiveWords: [{ required: true, message: $t('SETTING.p_enter_sensitive_words') }],
  sensitiveText: [
    {
      type: 'string',
      required: true,
      message: $t('SETTING.p_enter_replace_content'),
      trigger: 'blur'
    }
  ]
})

/**
 * -------
 * 取消弹窗
 * -------
 */
const cancelModal = () => {
  emit('cancel')
  ruleForm.sensitiveText = ''
  ruleForm.sensitiveWords = ''
}

/**
 * 提交内容
 *
 * @param formEl
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('confirm', {
        id: props.showInfo?.id,
        sensitiveWords: ruleForm.sensitiveWords,
        sensitiveText: ruleForm.sensitiveText
      })
    } else {
      messageError(`error submit!:${fields}`)
    }
  })
}
</script>

<style lang="scss" scoped>
.update-sensitvie-box {
  .icon-tab {
    color: #0d6efd;
    font-size: 1rem;
  }
  .sen-box {
    height: 32px;
    background-color: #e5f4ff;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
    margin-bottom: 1.875rem;
    span {
      margin-left: 0.5rem;
    }
  }
}
</style>
