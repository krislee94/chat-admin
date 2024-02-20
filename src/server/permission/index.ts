/**
 * 这里做权限控制
 */
import { RoleList } from '@/server/employee_request'
import { settingChatMenu, sliderData } from '@/api/slider'
import { useUserStore } from '@/stores'

interface IFilterRouterResParam {
  hasEmployeePermission: boolean
  hasSessionPermission: boolean
  hasGameInPermission: boolean
  hasSensitivePermission: boolean
  hasFastPermission: boolean
  hasSuperAdminPermission: boolean
  sliderData: any[]
  settingChatMenu: any[]
}

/**
 * @deprecated
 * This method is deprecated. Use the ABAC RABC instead.
 * @see @/utils/permission  for details.
 */
export const filterRouter = (): IFilterRouterResParam => {
  const userStore = useUserStore()
  const roleList: Array<string> = userStore.roleList

  let sliderDataSet = new Set()
  let settingChatMenuSet = new Set()

  //是否有员工管理的权限
  let hasEmployeePermission = false
  //会话列表权限
  let hasSessionPermission = false
  //是否有游戏接入的权限
  let hasGameInPermission = false
  //是否有敏感词
  let hasSensitivePermission = false
  //是否有快捷回复功能
  let hasFastPermission = false
  //是否有管理员权限
  let hasSuperAdminPermission = false

  if (roleList && roleList.length > 0) {
    //超级管理员
    if (roleList.includes(RoleList.SuperAdmin)) {
      //数据管理
      sliderDataSet.add(sliderData[0])
      // 质检
      sliderDataSet.add(sliderData[2])
      // 员工管理
      sliderDataSet.add(sliderData[3])
      //游戏接入
      sliderDataSet.add(sliderData[4])
      //会话设置
      // settingChatMenuSet.add(settingChatMenu[0])
      settingChatMenuSet.add(settingChatMenu[1])
      hasEmployeePermission = true
      hasSessionPermission = true
      hasGameInPermission = true
      hasSensitivePermission = true
      hasSuperAdminPermission = true
    }
    //客服、临时客服
    if (roleList.includes(RoleList.CS) || roleList.includes(RoleList.TempCS)) {
      //会话列表
      sliderDataSet.add(sliderData[1])
      //通讯录
      sliderDataSet.add(sliderData[5])
      //快捷回复
      settingChatMenuSet.add(settingChatMenu[0])
      hasFastPermission = true
      hasSessionPermission = true
    }
    //游戏管理员
    if (roleList.includes(RoleList.GameAdmin)) {
      sliderDataSet.add(sliderData[2])
      sliderDataSet.add(sliderData[4])
      hasGameInPermission = true
    }
    //质检员
    if (roleList.includes(RoleList.CheckAdmin)) {
      sliderDataSet.add(sliderData[2])
      sliderDataSet.add(sliderData[3])
      hasGameInPermission = true
      settingChatMenuSet.add(settingChatMenu[0])
      settingChatMenuSet.add(settingChatMenu[1])
    }

    const arr: any = Array.from(sliderDataSet).sort((item1: any, item2: any) => {
      return item1.index - item2.index
    })
    return {
      sliderData: arr,
      settingChatMenu: Array.from(settingChatMenuSet),
      hasEmployeePermission,
      hasSessionPermission,
      hasGameInPermission,
      hasSensitivePermission,
      hasFastPermission,
      hasSuperAdminPermission
    }
  }

  return {
    sliderData: [],
    settingChatMenu: [],
    hasEmployeePermission,
    hasSessionPermission,
    hasGameInPermission,
    hasSensitivePermission,
    hasFastPermission,
    hasSuperAdminPermission
  }
}
