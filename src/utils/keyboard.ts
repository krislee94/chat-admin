/**
 * 键盘的监听行为
 */

//----------------------------------------------------------------
import { useRichStore } from '@/stores'
import { blobToByteArray, clipboardImageUpload } from '@/utils/file2bite'
import { ElMessage } from 'element-plus'
/**
 * 监听复制行为
 */
export function copyKeyBoard() {
  // window.addEventListener('keydown', (event: KeyboardEvent) => {
  //   if (event.metaKey && event.key === 'v') {
  //     //mac系统
  //     // Command+V pressed
  //     // 处理剪贴板内容
  //     //读取剪贴板内容
  //     console.log('MAC')
  //     readClipBoard()
  //   } else if (event.ctrlKey && event.key === 'v') {
  //     //windows 系统
  //     console.log('WINDOWS')
  //     readClipBoard()
  //   }
  // })

  //监听鼠标右键粘贴行为
  window.addEventListener('paste', (event) => {
    console.log('监听到粘贴行为.....')
    event.preventDefault()
    readClipBoard()
  })
}

export function readClipBoard() {
  //文本内容使用 navigator.clipboard.readText();
  //图片等使用 navigator.clipboard.read();

  //@ts-ignore
  navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
    console.log(result)
    if (result.state === 'granted' || result.state === 'prompt') {
      console.log(navigator.clipboard)
      navigator.clipboard
        .read()
        .then((items) => {
          // 在这里处理剪切板中的数据
          const item: ClipboardItem = items[0]
          console.log(item)
          if (item && item.types.length > 0) {
            //只看剪切板最新的一个
            if (item.types[0].indexOf('image') > -1) {
              if (!useRichStore().visible) {
                useRichStore().setVisible(true)
              }

              //获取Promise<blob>对象
              item.getType(item.types[0]).then((res) => {
                //转成arraybyte
                blobToByteArray(res).then((i) => {
                  console.log(i)
                  clipboardImageUpload(i, item.types[0]).then((resp: any) => {
                    if (resp && resp.key && resp.type && resp.url) {
                      useRichStore().setHtmlTagIn(resp.type, resp.url, resp.key)
                    }
                  })
                })
              })
            } else if (item.types[0].indexOf('text') > -1) {
              item.getType(item.types[0]).then((blob) => {
                blob.text().then((text) => {
                  useRichStore().setTextArea(text)
                })
              })
            }
          }
        })
        .catch((error) => {
          // 处理读取剪切板时的错误
        })
    } else {
      ElMessage.error('剪切板权限未获取到，请先打开剪切板权限')
    }
  })

  // navigator.clipboard.read().then((items) => {})
}
