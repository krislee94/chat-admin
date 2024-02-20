import { defineStore } from 'pinia'
import { sliderData } from '@/api/slider'
import { getPermission } from '@/utils/permission/permission-auth'
import { permissionList } from '@/utils/permission/permission'

export const useSliderStore = defineStore('slider', {
  state: () => {
    return {
      sliderData: [] as any[]
    }
  },
  actions: {
    async init() {
      // const arr = permissionList.filter((item) => item.parentId == 0)
      const selfPermission = getPermission()

      const permissionMap = selfPermission.reduce((acc, obj) => {
        if (obj && !acc.get(obj)) {
          acc.set(obj, obj)
        }
        return acc
      }, new Map())
      const arr: any[] = []
      sliderData.forEach((item) => {
        if (
          permissionMap.get(item.permission) &&
          item.permission == permissionMap.get(item.permission)
        ) {
          arr.push(item)
        }
      })

      this.sliderData = arr.sort((a, b) => a.index - b.index)
    },
    activeItem(index: string) {
      if (this.sliderData && this.sliderData.length > 0) {
        this.sliderData.forEach((item) => {
          if (item.path == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      }
    }
  }
})
