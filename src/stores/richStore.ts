import { defineStore } from 'pinia'
import { RecordFileKey } from '@/server/message_request'

/**
 * 富文本=store
 */
export const useRichStore = defineStore('rich-input', {
  state: () => {
    return {
      visible: false,
      textarea: '',
      s3Keys: [] as any[]
    }
  },

  getters: {
    scrollHeight() {
      if (this.visible) {
        return 'height:65.8vh'
      }

      return 'height:77.8vh'
    },

    inputHeight() {
      if (this.visible) {
        return 'min-height:23vh'
      }

      return 'min-height:8vh'
    },

    recordFileKey(): RecordFileKey[] {
      if (this.s3Keys && this.s3Keys.length > 0) {
        return this.s3Keys.map((item) => {
          let valueJson = {
            type: item.type
          }
          let obj: RecordFileKey = {
            fileKey: item.key,
            fileUrl: item.id,
            value: JSON.stringify(valueJson)
          }

          return obj
        })
      }

      return []
    }
  },

  actions: {
    /**
     * 控制富文本展示或关闭
     * @param value
     */
    setVisible(value: boolean) {
      this.visible = value
    },
    /**
     * 塞入文本内容
     * @param value
     */
    setTextArea(value: any) {
      this.textarea = value
    },

    /**
     * 往`textarea`内塞入html标签
     * @param type
     * @param url
     * @param key
     */
    setHtmlTagIn(type: string, url: string, key: string) {
      if (type == 'IMAGE') {
        const temp = this.setImageTemplate(url)
        this.textarea = this.textarea + temp

        this.s3Keys.push({
          id: url,
          key: key,
          type
        })
      }
    },

    setAudioTemplate(value: string) {
      return `<audio controls><source src=${value} type="audio/mpeg" />Your browser does not support the audio element.</audio>`
    },
    setVideoTemplate(value: string) {
      return `<video controls><source src=${value} type="video/mp4"/>not support.</video>`
    },
    setImageTemplate(value: string) {
      return `<img src=${value} style="width:50%;" v-viewer/>`
    },
    setFileTemplate(value: string) {
      return `<div><img src="@/assets/file-show.png"/><a href=${value}>down</a></div>`
    },

    clearTextarea() {
      this.textarea = ''
      this.s3Keys = []
    }
  }
})
