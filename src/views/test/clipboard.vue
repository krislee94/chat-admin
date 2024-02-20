<template>
  <div class="cropper-style">
    <!-- <img :src="base64Img" style="width: 50%" /> -->

    <!-- <el-button @click="clickJietu">点击截图</el-button> -->

    <img id="imageSource" :src="base64Img" crossorigin class="img-style" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { nextTick } from 'vue'
import { messageSuccess } from '@xr-util/xr-ui'

const base64Img = ref()

const clickJietu = () => {
  //@ts-ignore
  html2canvas(document.querySelector('body')).then((canvas) => {
    const base64 = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, '')
    base64Img.value = `data:image/png;base64,${base64}`
  })
}

onMounted(() => {
  var image = document.querySelector('#imageSource')
  var result = document.querySelector('#result')
  //@ts-ignore
  image.addEventListener('load', () => {
    //@ts-ignore
    var cropper = new Cropper(image, {
      autoCrop: false,
      ready: function () {
        var image = new Image()
        image.src = cropper.getCroppedCanvas().toDataURL('image/jpeg')
        //@ts-ignore
        result.appendChild(image)
      },
      cropend: function () {
        const cropBoxData = cropper.getCropBoxData()
        const cropBox = document.querySelector('.cropper-crop-box')
        const confirmButton = document.createElement('button')
        confirmButton.innerText = '✓'
        confirmButton.addEventListener('click', function () {
          // 处理确定按钮的逻辑
          const canvas = cropper.getCroppedCanvas()
          canvas.toBlob((blob) => {
            if (blob) {
              navigator.clipboard
                .write([
                  new ClipboardItem({
                    'image/png': blob
                  })
                ])
                .then(() => {
                  messageSuccess('已复制到粘贴板')
                  cropper.destroy()
                })
                .catch((err) => {
                  console.error('无法复制到剪贴板：', err)
                })
            }
          })
        })
        const cancelButton = document.createElement('button')
        cancelButton.innerText = 'x'
        cancelButton.addEventListener('click', function () {
          // 处理取消按钮的逻辑
          cropper.clear()
        })
        if (cropBox) {
          cropBox.appendChild(confirmButton)
          cropBox.appendChild(cancelButton)
        }

        confirmButton.style.position = 'absolute'
        confirmButton.style.bottom = '-20'
        confirmButton.style.right = '1rem'
        cancelButton.style.position = 'absolute'
        cancelButton.style.bottom = '-20'
        cancelButton.style.right = '4rem'

        confirmButton.style.width = '3rem'
        confirmButton.style.height = '1.5rem'
        confirmButton.style.backgroundColor = '#007bff'
        confirmButton.style.color = '#fff'
        confirmButton.style.border = 'none'
        confirmButton.style.borderRadius = '4px'
        confirmButton.style.cursor = 'pointer'

        cancelButton.style.backgroundColor = '#fff'
        cancelButton.style.width = '3rem'
        cancelButton.style.height = '1.5rem'
        cancelButton.style.color = '#cb0000'
        cancelButton.style.border = 'none'
        cancelButton.style.borderRadius = '4px'
        cancelButton.style.cursor = 'pointer'
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.cropper-style {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.img-style {
  width: 100vw;
  height: 100vh;
}

.cropper-confirm-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}
.cropper-cancel-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.cropper-confirm-button:hover,
.cropper-cancel-button:hover {
  background-color: #0069d9;
}
</style>
