<template>
  <el-dialog
    v-model="visible"
    :title="$t('SETTING.fast_set')"
    width="30%"
    @close="cancel"
    style="border-radius: 0.625rem"
  >
    <el-alert
      title="warning"
      type="warning"
      :description="description"
      show-icon
      v-if="showAlert == '1' || showAlert == '2'"
      style="margin-bottom: 1rem"
      @close="() => (showAlert = '0')"
    />
    <div class="j-row-center">
      <span class="span1" v-t="$t('SETTING.send_message')"></span>
      <el-radio-group v-model="chooseValue" style="margin-left: 1.25rem" @change="changeRadio">
        <!-- <el-radio label="Enter">Enter</el-radio>
        <el-radio label="Ctrl+Enter">Ctrl+Enter</el-radio> -->
        <el-radio v-for="item in state.data" :key="item.id" :label="item.label">{{
          item.label
        }}</el-radio>
      </el-radio-group>
    </div>

    <div class="j-row-center" style="margin-top: 1.25rem">
      <span class="span1" v-t="$t('SETTING.new_line')"></span>
      <el-radio-group v-model="chooseNewLine" style="margin-left: 1.25rem" @change="changeNewLine">
        <!-- <el-radio label="Enter">Enter</el-radio>
        <el-radio label="Ctrl+Enter">Ctrl+Enter</el-radio> -->
        <el-radio v-for="item in state.data2" :key="item.id" :label="item.label">{{
          item.label
        }}</el-radio>
      </el-radio-group>
    </div>

    <!--    <span>* </span><span>设置完成之后，请重新打开</span>-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{ $t('COMMON.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { getDetailFastSet } from '@/server/user_fast_request'
//快捷键设置
import { FastSetKeyWord } from '@/api/fast'
import { useRichStore } from '@/stores'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['cancel', 'confirm'])

interface IStateParam {
  data: any[]
  data2: any[]
}

const state: IStateParam = reactive({
  data: JSON.parse(JSON.stringify(FastSetKeyWord)),
  data2: JSON.parse(JSON.stringify(FastSetKeyWord))
})

const visible = ref(props.show)
//enter发送
const chooseValue = ref('')
//新行
const chooseNewLine = ref('')

const description = ref('')
const showAlert = ref('0')

//初始化 - -
const init = () => {
  getDetailFastSet().then((res) => {
    if (res && res.code == '0') {
      chooseValue.value = res?.data?.sendMsg ?? 'Enter'
      chooseNewLine.value = res?.data?.dialogNewline ?? 'Ctrl+Enter'

      state.data.map((item) => {
        if (item.value == chooseValue.value) {
          item.isCheck = true
        }
      })

      state.data2.map((item) => {
        if (item && item.value == chooseNewLine.value) {
          item.isCheck = true
        }
      })
    }
  })
}
init()

//-----------------------------
watch(
  () => props.show,
  (newValue) => {
    visible.value = newValue
  }
)
//----------------------------

const cancel = () => {
  emit('cancel')
}

const changeRadio = (value: string) => {
  console.log(value)
  changeState(value, 'send')
  if (showAlert.value == '1') {
    showAlert.value = '0'
  }
}
const changeNewLine = (value: string) => {
  console.log(value)
  changeState(value, 'newLine')
  if (showAlert.value == '2') {
    showAlert.value = '0'
  }
}

//
const changeState = (value: string, type: string) => {
  if (!value) return
  let arr = state.data
  let arr2 = state.data2

  if (type == 'send') {
    arr.map((item) => {
      if (item && item.value == value) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
      return item
    })
    state.data = arr

    arr2.map((item) => {
      if (item.value == value && item.isCheck) {
        item.isCheck = false
        chooseNewLine.value = ''
      }

      return item
    })
    state.data2 = arr2
  } else if (type == 'newLine') {
    arr2.map((item) => {
      if (item && item.value == value) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
      return item
    })
    state.data2 = arr2

    arr.map((item) => {
      if (item.value == value && item.isCheck) {
        item.isCheck = false
        chooseValue.value = ''
      }

      return item
    })
    state.data = arr
  }
}

const confirm = () => {
  if (!chooseValue.value) {
    showAlert.value = '1'
    description.value = '请设置发送按钮'
    return
  }
  if (!chooseNewLine.value) {
    showAlert.value = '2'
    description.value = '请设置换行按钮'
    return
  }
  useRichStore().setVisible(false)
  emit('confirm', {
    dialogNewline: chooseNewLine.value,
    sendMsg: chooseValue.value
  })
}
</script>

<style lang="scss" scoped>
.span1 {
  width: 4vw;
  font-size: 0.875rem;
  color: #434343;
}
:deep(.el-alert__content) {
  width: 100%;
}
</style>
