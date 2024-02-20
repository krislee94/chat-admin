<!-- 游戏编辑 -->
<template>
  <div class="setting-game-box">
    <el-dialog
      v-model="visible"
      width="40%"
      :title="state.title"
      @close="cancel"
      :destroy-on-close="true"
    >
      <div class="j-row game-header">
        <img v-if="props.info.headerImgUrl || state.headerImgUrl" :src="state.headerImgUrl" />
        <img v-if="!props.info.headerImgUrl && !state.headerImgUrl" src="@/assets/moren.png" />

        <div class="j-column" style="margin-left: 0.75rem">
          <el-upload :before-upload="beforeUpload" ref="uploadRef" :show-file-list="false">
            <el-button
              @click="changeHeaderImgUrl"
              type="primary"
              plain
              size="small"
              style="width: 5.5rem"
              >{{ $t('GAME.change_game_img') }}</el-button
            >
          </el-upload>
          <span class="spantext">{{ $t('GAME.game_desp') }}</span>
        </div>
      </div>

      <div class="j-row-center">
        <span v-t="'GAME.game_name'"></span>
        <el-input v-model="state.name" :placeholder="$t('GAME.place')" style="width: 80%" />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('COMMON.cancel') }}</el-button>
          <el-button type="primary" @click="confirm">{{ $t('COMMON.confirm') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType, reactive, getCurrentInstance } from 'vue'
import { IGameListItem } from '@/server/game_request'
import { UploadRawFile } from 'element-plus'
import { service } from '@/utils/request'
import { uploadModule } from '@/api'
import { uploadFileAndDownload } from '@/utils/file2bite'

//@ts-ignore
const { $t } = getCurrentInstance()?.appContext.config.globalProperties

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false
  },
  info: {
    type: Object as PropType<IGameListItem>,
    required: true,
    default: false
  }
})

const state = reactive({
  headerImgUrl: props.info.headerImgUrl || '',
  imgKey: '',
  name: props.info.name,
  title: ''
})
const emit = defineEmits(['cancel', 'update', 'add'])
//是否展示
const visible = ref(false)
watch(
  () => props.show,
  (newValue, _) => {
    visible.value = newValue
    if (!newValue) {
      state.headerImgUrl = ''
      state.name = ''
    }
  }
)
watch(
  () => props.info,
  (newValue, _) => {
    console.log(newValue)
    if (newValue && newValue.id) {
      state.headerImgUrl = newValue.headerImgUrl || ''
      state.name = newValue.name || ''
      state.title = '编辑游戏'
    } else {
      state.title = '新增游戏'
    }
  }
)

const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  if (props.info && props.info.id) {
    emit('update', { id: props.info.id, name: state.name, headerImgUrl: state.imgKey })
  } else {
    emit('add', { name: state.name, headerImgUrl: state.imgKey })
  }
}

const beforeUpload = async (rawFile: UploadRawFile) => {
  uploadFileAndDownload(rawFile, false).then((res) => {
    if (res && res.key && res.url) {
      state.headerImgUrl = res.url
      state.imgKey = res.key
    }
  })
  return false
}
//头像更换
const changeHeaderImgUrl = () => {}
</script>

<style lang="scss" scoped>
.setting-game-box {
  padding: 1.5rem;
  .game-header {
    img {
      width: 3.5rem;
      height: 3.5rem;
    }
    .spantext {
      font-size: 0.875rem;
      font-family: Roboto-Light, Roboto;
      color: #8c8c8c;
      line-height: 22px;
    }
  }
}
</style>
