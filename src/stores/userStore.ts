import { defineStore } from 'pinia'
// import { useUserStore } from './'
import { useMessageStore } from './messageStore'
import {
  CSLevel,
  LoginInfoResponse,
  CSStatus,
  getLoginInfoDetail,
  Language
} from '@/server/employee_request'
import { useWebSocketStore, useChatListStore, useLangStore } from '@/stores'
import { downloadUrl, IDownloadPreSignUrlRequest } from '@/server/s3_request'
import { ISO639List } from '@/api/language'
// import { useI18n } from 'vue-i18n'

/**
 * 用户信息管理
 * 1. username
 * 2. role
 * 3.
 */

//@ts-ignore
export const useUserStore = defineStore('chat-user-admin', {
  state: () => {
    return {
      /**
       * 登录账号名
       */
      accountName: '',
      /**
       * 客服等级
       */
      csLevel: '',
      /**
       * 客服状态
       */
      csStatus: '',
      /**
       * 主键ID
       */
      id: '',
      /**
       * 员工名称
       */
      name: '',
      /**
       * 员工昵称
       */
      nickName: '',
      /**
       * 员工手机号
       */
      phone: '',
      /**
       * 角色列表
       */
      roleList: [] as any,
      /**
       * 短ID
       */
      shortId: '',

      //token
      token: '',
      //
      headerImgUrl: '',
      //语言
      language: '',
      //是否允许音乐
      enableNoticeMusic: true,
      noticeMusicKey: '',
      noticeMusicUrl: '',
      //音频系统urls
      audioSystemUrls: [] as any,
      //系统告警铃声urls
      audioWarningUrls: [] as any,
      //iso639语言
      locale: '',
      //是否允许提醒 0不允许，1 允许
      isAllowNotice: 0,

      warnMusicKey: '',
      warnMusicUrl: '',

      //权限列表
      permissionList: [] as any
    }
  },
  //控制方法
  actions: {
    setToken(token: string) {
      this.token = token
    },

    setValue(param: LoginInfoResponse) {
      if (param) {
        this.accountName = param.accountName || ''
        this.csLevel = param?.csInfo?.csLevel || ''
        this.csStatus = param?.csInfo?.csStatus || ''
        this.id = param.id + '' || ''
        this.name = param.name || ''
        this.nickName = param?.csInfo?.nickName || ''
        this.phone = param.phone || ''
        this.language = param?.language || ''
        this.shortId = param.shortId + '' || ''
        this.headerImgUrl = param.headerImgUrl || ''
      }
      //塞入提示音乐
      if (param && param.noticeMusicInfo) {
        this.noticeMusicKey = param?.noticeMusicInfo?.noticeMusicKey ?? ''
        this.enableNoticeMusic = param?.noticeMusicInfo?.enableNoticeMusic ?? false
        this.noticeMusicUrl = param?.noticeMusicInfo?.noticeMusicUrl ?? ''

        this.warnMusicKey = param?.noticeMusicInfo?.warnMusicKey ?? ''
        this.warnMusicUrl = param?.noticeMusicInfo?.warnMusicUrl ?? ''
      }

      //塞入权限列表
      if (param && param.permissionList) {
        this.permissionList = param.permissionList || []
      }
      //塞入角色
      if (param?.roleEntityList) {
        this.roleList = param?.roleEntityList
      }
    },
    /**
     * 查询信息
     */
    async queryUserInfo() {
      await getLoginInfoDetail().then((res) => {
        if (res && res.code == '0') {
          if (res.data) {
            //塞入当前值
            this.setValue(res.data)
            //塞入聊天内容中
            if (res.data && res.data?.headerImgUrl) {
              useMessageStore().setParams({ geterImg: res.data.headerImgUrl })
            }
            // const { locale } = useI18n()
            //查询语言
            if (res.data && res.data?.language) {
              for (let obj of ISO639List) {
                if (obj.re == res.data.language) {
                  useLangStore().setLang(obj.value)
                  this.locale = obj.value
                }
                // }
              }
            }
          }
        }
      })
    },

    async getAudioUrl() {
      //先清空
      this.audioSystemUrls = []
      this.audioWarningUrls = []
      const warningUrls = [
        {
          key: 'im/system/audio/default_warn_music_1.mp3',
          label: 'warning_bell_1'
        },
        {
          key: 'im/system/audio/default_warn_music_2.wav',
          label: 'warning_bell_2'
        },
        {
          key: 'im/system/audio/default_warn_music_3.wav',
          label: 'warning_bell_3'
        },
        {
          key: 'im/system/audio/default_warn_music_4.wav',
          label: 'warning_bell_4'
        }
      ]
      const urlKeys = [
        {
          key: 'im/system/audio/default_notice_music_1.wav',
          label: 'ringtone 1'
        },
        {
          key: 'im/system/audio/default_notice_music_2.wav',
          label: 'ringtone 2'
        },
        {
          key: 'im/system/audio/default_notice_music_3.wav',
          label: 'ringtone 3'
        },
        {
          key: 'im/system/audio/default_notice_music_4.wav',
          label: 'ringtone 4'
        }
      ]

      //系统铃声
      for (let item of urlKeys) {
        let obj = {
          key: item.key,
          label: item.label,
          url: ''
        }
        const param: IDownloadPreSignUrlRequest = {
          key: item.key
        }
        await downloadUrl(param).then((res) => {
          if (res && res.code == '0') {
            const url = res.data?.preSignUrl ?? ''
            obj.url = url
          }
        })
        //往系统里添加
        this.audioSystemUrls.push(obj)
      }

      //警告铃声
      for (let item of warningUrls) {
        let obj = {
          key: item.key,
          label: item.label,
          url: ''
        }
        const param: IDownloadPreSignUrlRequest = {
          key: item.key
        }
        await downloadUrl(param).then((res) => {
          if (res && res.code == '0') {
            const url = res.data?.preSignUrl ?? ''
            obj.url = url
          }
        })
        this.audioWarningUrls.push(obj)
      }
    },

    loginOut() {
      this.token = ''
      this.accountName = ''
      this.csLevel = ''
      this.csStatus = ''
      this.id = ''
      this.name = ''
      this.nickName = ''
      this.phone = ''
      this.roleList = []
      this.shortId = ''
      this.language = ''
      useWebSocketStore().close()

      useChatListStore().cleanChatList()
    },

    setNoticeStatus(value: number) {
      this.isAllowNotice = value
    }
  },
  //持久化
  persist: {
    storage: sessionStorage
  }
})
