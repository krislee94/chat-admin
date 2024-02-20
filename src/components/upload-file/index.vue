<template>
  <el-upload
    class="comp-upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :before-upload="beforeUpload"
    :show-file-list="false"
    :on-remove="handleRemove"
    :limit="1"
    :accept="props.acceptType"
  >
    <iconpark-icon
      name="picture-one"
      v-if="props.icon == 'img'"
      style="font-size: 1.25rem; cursor: pointer; margin-right: 1rem"
    ></iconpark-icon>
    <iconpark-icon
      name="folder-close-9124nbh7"
      v-if="props.icon == 'file'"
      style="font-size: 1.25rem; cursor: pointer"
    ></iconpark-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox, UploadRawFile } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { uploadFileAndDownload } from '@/utils/file2bite'
import { useRichStore } from '@/stores'
import { UploadFileTypeEnum } from '@/server/s3_request'

const props = defineProps({
  acceptType: {
    type: String
  },
  icon: {
    type: String
  },
  messageType: {
    type: String,
    required: true
  }
})
const richStore = useRichStore()

const emit = defineEmits(['sendMedia', 'sendFile'])

const handleRemove: UploadProps['onRemove'] = (file: any, uploadFiles: any) => {
  console.log(file, uploadFiles)
}

/**
 * before upload
 * 一些限制类的，会放在这里处理
 */
const beforeUpload = async (rawFile: UploadRawFile) => {
  uploadFileAndDownload(rawFile, true).then((res) => {
    if (res && res.type && res.url && res.key) {
      //当传递的是图片、并且富文本打开。此时
      if (res.type === UploadFileTypeEnum.Image && richStore.visible) {
        richStore.setHtmlTagIn(res.type, res.url, res.key)
      } else {
        //直接发送信息
        emit('sendMedia', {
          key: res.key,
          type: res.type,
          fileUrl: res.url
        })
      }
    }
  })
}
</script>
<style>
.icon-size {
  font-size: 1.85rem;
  margin-right: 1rem;
  cursor: pointer;
}
.comp-upload {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
