import { defineStore } from 'pinia'

/**
 * 截图 => store
 *
 * cropperjs
 *
 */
export const useCropperStore = defineStore('cropperStore', {
  state: () => {
    return {
      visible: false,
      imgUrl: ''
    }
  },

  actions: {
    setVisible(value: boolean) {
      this.visible = value
    },

    setImgUrl(value: string) {
      if (!value) return
      this.imgUrl = value
    }
  }
})
