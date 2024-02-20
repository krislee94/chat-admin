<template>
  <div class="add-sensitive-box">
    <el-dialog
      v-model="visible"
      :title="$t('SETTING.add_sensitive')"
      width="40%"
      center
      destroy-on-close
      @close="cancelModal"
    >
      <div class="sen-box">
        <i class="iconfont icon-tab">&#xe613;</i>
        <span v-t="$t('SETTING.can_add')"></span>
      </div>

      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item :label="$t('SETTING.sensitive_words')" prop="sensitiveWords">
          <el-input
            v-model="ruleForm.sensitiveWords"
            :placeholder="$t('SETTING.p_enter_sensitive_words')"
            @keyup.enter.native="enterInput"
            @blur.async="enterInput"
          />
          <div class="txt">{{ $t('SETTING.sensitive_desp') }}</div>
          <div v-for="(item, index) in state.tags" class="tag-item">
            <el-tag closable :type="color(index)" @close="handleClose(item)">{{ item }}</el-tag>
          </div>
        </el-form-item>

        <el-form-item :label="$t('SETTING.replace_sentence')" prop="sensitiveText">
          <el-input
            v-model="ruleForm.sensitiveText"
            :placeholder="$t('SETTING.p_enter_replace_content')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModal">{{ $t('COMMON.cancel') }}</el-button>
          <el-button type="primary" @click="submitForm"> {{ $t('COMMON.confirm') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { messageError } from '@xr-util/xr-ui'
import { _ } from '@xr-util/util'

interface IStatePram {
  tags: Array<string>
}

const ruleFormRef = ref<FormInstance>()
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const visible = ref(props.show)

watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
  }
)
//事件触发
const emit = defineEmits(['cancel', 'confirm'])
const ruleForm = reactive({
  sensitiveWords: '',
  sensitiveText: ''
})
//状态集
const state: IStatePram = reactive({
  tags: []
})
const rules = reactive<FormRules>({
  //   sensitiveWords: [{ required: true, message: '请输入敏感词' }],
  sensitiveText: [{ type: 'string', required: true, message: '请输入替换句子', trigger: 'blur' }]
})
//标签颜色
const color = (index: number) => {
  const colors = ['success', 'info', 'warning', 'danger']
  const color = Math.floor(Math.random() * 4)
  return colors[color]
}
//输入
const enterInput = () => {
  if (ruleForm.sensitiveWords) {
    if (state.tags.includes(ruleForm.sensitiveWords)) {
      messageError('已包含相同敏感词')
      return
    }
    state.tags.push(ruleForm.sensitiveWords)
    ruleForm.sensitiveWords = ''
  }
}
//处理’x‘tag
const handleClose = (tag: string) => {
  if (!tag) return
  state.tags = state.tags.filter((item) => item != tag)
}

/**
 * -------
 * 取消弹窗
 * -------
 */
const cancelModal = () => {
  emit('cancel')
  state.tags = []
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
  if (_.isEmpty(state.tags) && _.isEmpty(ruleForm.sensitiveWords)) {
    messageError('请输入敏感词')
    return
  }
  if (_.isEmpty(ruleForm.sensitiveText)) {
    messageError('请输入替换句子')
    return
  }

  emit('confirm', {
    tags: state.tags,
    sensitiveText: ruleForm.sensitiveText
  })
}
</script>

<style lang="scss" scoped>
.tag-item {
  margin-right: 0.75rem;
}
.txt {
  color: #8c8c8c;
  font-size: 0.875rem;
  width: 100%;
  margin-bottom: 0.3rem;
}
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
</style>
