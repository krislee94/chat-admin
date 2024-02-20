import { service } from '@/utils/request'
import { userInfoModule } from '@/api'

export interface IUserEditRequestParam {
  /**
   * 用户编码
   */
  id?: string
  /**
   * 备注
   */
  remark?: string
}

/**
 * 更新用户备注
 * @param param
 */
export function updateUserInfo(param: IUserEditRequestParam): Promise<void> {
  return service.post(`${userInfoModule.updateUserApi}`, param)
}
