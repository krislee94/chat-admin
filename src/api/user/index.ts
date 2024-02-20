import { RoleList, CSLevel } from '@/server/customer_request'
import { Language } from '@/server/employee_request'

//角色列表
export const roleList = [
  {
    id: '1',
    label: '坐席',
    value: RoleList.CS
  },
  {
    id: '2',
    label: '质检员',
    value: RoleList.CheckAdmin
  },
  {
    id: '3',
    label: '游戏管理员',
    value: RoleList.GameAdmin
  },
  {
    id: '4',
    label: '超级管理员',
    value: RoleList.SuperAdmin
  },
  {
    id: '5',
    label: '临时坐席',
    value: RoleList.TempCS
  }
]

//坐席等级
export const csLevel = [
  {
    id: '1',
    label: '初级',
    value: CSLevel.Level10
  },
  {
    id: '2',
    label: '中级',
    value: CSLevel.Level20
  },
  {
    id: '3',
    label: '高级',
    value: CSLevel.Level30
  }
]

//性别列表
export const sexyList = [
  {
    id: '1',
    label: '男',
    value: 1
  },
  {
    id: '2',
    label: '女',
    value: 0
  }
]

export const LanguageList = [
  {
    id: '1',
    label: '中文',
    value: Language.Chinese
  },
  {
    id: '2',
    label: 'English',
    value: Language.English
  }
]
