<template>
  <el-dialog v-model="visible" :title="$t('USER.name')" width="30%">
    <div>
      <div class="flex row alignCenter">
        <span class="span-w">{{ $t('EMPLOYEE.nickname') }}</span>
        <el-input v-model="form.nickName" />
      </div>

      <div class="flex row alignCenter" style="margin-top: 1rem">
        <span class="span-w">{{ $t('EMPLOYEE.grade') }}</span>
        <!--        <el-input v-model="form.nickName" />-->
        <el-select v-model="form.csLevel">
          <el-option
            v-for="item in csLevelList"
            :label="item.label"
            :value="item.value"
            :key="item.id"
          />
        </el-select>
      </div>

      <div class="flex row alignCenter" style="margin-top: 1rem">
        <span class="span-w">{{ $t('EMPLOYEE.game_of_service') }}</span>
        <el-select v-model="form.merchantIds" multiple>
          <el-option
            v-for="item in gameInfoList"
            :key="item.id"
            :label="item?.name ?? '-'"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>

    <template #footer>
      <CancelOrConfirm @cancel="visible = false" @confirm="sureEditor" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import type { EmployeeCSPageResponse } from '@/server/cs_request'
import { CSLevel } from '@/server/cs_request'
import type { IGameListItem } from '@/server/game_request'
import { gameList } from '@/server/game_request'
import CancelOrConfirm from '@/components/cancelConfirm/cancelOrConfirm.vue'
import { editorCs } from '@/server/cs_request'
import type { IEmployeeCsEditRequest } from '@/server/cs_request'
import { messageSuccess } from '@xr-util/xr-ui'

const gameInfoList = ref<IGameListItem[]>([])
const visible = ref(false)

//@ts-ignore
// eslint-disable-next-line no-unsafe-optional-chaining
const { $t } = getCurrentInstance()?.appContext?.config?.globalProperties

const form = reactive({
  id: '',
  nickName: '',
  csLevel: '',
  merchantIds: [] as any
})

const emit = defineEmits(['update'])

const open = (value: EmployeeCSPageResponse) => {
  visible.value = true
  // cutomerInfo.value = values
  form.id = value.id + ''
  form.nickName = value?.nickName ?? ''
  form.csLevel = value?.csLevel ?? ''

  if (value?.merchantList && value?.merchantList.length > 0) {
    form.merchantIds = value?.merchantList.map((item) => {
      return item.id
    })
  }
}

//等级列表
const csLevelList = [
  {
    id: '1',
    label: $t('GAME.primary'),
    value: CSLevel.Level10
  },
  {
    id: '2',
    label: $t('GAME.intermediate'),
    value: CSLevel.Level20
  },
  {
    id: '3',
    label: $t('GAME.advanced'),
    value: CSLevel.Level30
  }
]

const init = () => {
  gameList({
    pageNo: 1,
    pageSize: 99
  }).then((res) => {
    if (res && res.code == '0') {
      gameInfoList.value = res.data.dataList || []
    }
  })
}
init()

//确认编辑
const sureEditor = () => {
  const param: IEmployeeCsEditRequest = {
    employeeId: form.id,
    merchantIds: form.merchantIds,
    level: form.csLevel,
    nickName: form.nickName
  }

  editorCs(param).then((res) => {
    if (res && res.code == '0') {
      messageSuccess($t('update_success'))
    }
    visible.value = false
  })

  emit('update')
}

//暴露API
defineExpose({
  open
})
</script>

<style scoped lang="scss">
.span-w {
  min-width: 4.25rem;
}

:deep(.el-select) {
  width: 100%;
}
</style>
