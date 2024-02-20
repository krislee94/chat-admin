import { defineStore } from 'pinia'
import { settingTeamMenu } from '@/api/slider'

interface IUseSettingStoreParam {
  item: ISettingItemParam
}

interface ISettingItemParam {
  id: string
  name: string
}
//@ts-ignore
export const useSettingStore = defineStore('setting-store', {
  state: (): IUseSettingStoreParam => {
    return {
      item: {
        id: '',
        name: ''
      }
    }
  },
  actions: {
    //初始化
    init() {
      //如果item.id有值就不刷新。没有的话就初始化默认的
      if (!this.item.id) {
        this.item = settingTeamMenu[0]
      }
    },
    //塞入item值
    setItem(value: any) {
      this.item = value
    }
  },
  //持久化
  persist: true
})
