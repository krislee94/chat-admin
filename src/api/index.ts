/**
 * 统一 API接口平台
 */

//信息微服务
const MESSAGE = '/msg'

//用户模块微服务
const USER = '/user'

//会话接口
export const sessionModule = {
  //查看会话列表
  querySessionListApi: `${MESSAGE}/api/session/cs/listByCs`,
  //查看历史会话记录
  queryHistoryRecordCsApi: `${MESSAGE}/api/session/cs/getSessionChatRecord`,
  //查询会话用户信息
  querySessionUserInfoApi: `${MESSAGE}/api/session/cs/getSessionUserInfo`,
  //接入客服
  accessCustomerApi: `${MESSAGE}/api/session/admin/access/cs`,
  //转接会话
  transferCustomerApi: `${MESSAGE}/api/session/cs/transfer`,
  //结束会话
  finishedApi: `${MESSAGE}/api/session/cs/end`,
  //开关翻译
  translateSwitchApi: `${MESSAGE}/api/session/cs/translation/switch`,
  //查看客服列表
  pageEmployeeTransferApi: `${USER}/api/employee/cs/pageWithTransfer`,
  //全部消息已读
  sessionAllReadApi: `${MESSAGE}/api/session/cs/allRead`,
  //标记为未读
  sessionUnReadApi: `${MESSAGE}/api/session/cs/unread`,
  //会话置顶
  csToTopPlaceApi: `${MESSAGE}/api/session/cs/topPlace`,
  //取消会话置顶
  csCancelTopApi: `${MESSAGE}/api/session/cs/cancelTopPlace`,
  //单个消息翻译
  translateOneApi: `${MESSAGE}/api/msg/translation/one`,
  //会话预转接
  translatePreApi: `${MESSAGE}/api/session/cs/preTransfer`,

  //消息转发
  transferMsgApi: `${MESSAGE}/api/msg/forward`
}

//用户标签模块
export const userTagModule = {
  //用户标签列表
  queryUserTagListApi: `${USER}/api/user/label/listByUserId`,
  //新增标签
  addUserTagApi: `${USER}/api/user/label/add`,
  //删除标签
  delUserTagApi: `${USER}/api/user/label/del`
}

//用户模块
export const userInfoModule = {
  updateUserApi: `${USER}/api/user/edit`
}

//用户-快捷回复分组模块
export const userFastGroupModule = {
  //分组列表
  fastGroupListApi: `${MESSAGE}/api/fastReplyGroup/list`,
  //分组新增
  fastGroupAddApi: `${MESSAGE}/api/fastReplyGroup/add`,
  //分组删除
  fastGroupDelApi: `${MESSAGE}/api/fastReplyGroup/del`,
  //分组更新
  fastGroupUpdateApi: `${MESSAGE}/api/fastReplyGroup/edit`
}

//用户-快捷回复模块
export const userFastReplyModule = {
  //新增
  fastReplyAddApi: `${MESSAGE}/api/fastReply/add`,
  //编辑
  fastReplyUpdateApi: `${MESSAGE}/api/fastReply/edit`,
  //删除
  fastReplyDelApi: `${MESSAGE}/api/fastReply/del`,
  //详情
  detailReplyApi: `${MESSAGE}/api/fastReply/detail`,
  //列表
  fastReplyListApi: `${MESSAGE}/api/fastReply/list`,
  //常用快捷回复列表
  oftenFastReplyApi: `${MESSAGE}/api/fastReply/getOftenList`
}

//用户发送消息
export const messageModule = {
  //发送消息
  sendMessageApi: `${MESSAGE}/api/msg/cs/send`,
  //消息撤回
  withdrawApi: `${MESSAGE}/api/msg/cs/withdraw`
}

//敏感词
export const sensitiveKeyWordModule = {
  //敏感词列表
  sensitiveListApi: `${MESSAGE}/api/sensitiveKeyword/pageByCond`,
  //敏感词删除
  sensitiveDelApi: `${MESSAGE}/api/sensitiveKeyword/del`,
  //敏感词新增(批量)
  sensitiveAddApi: `${MESSAGE}/api/sensitiveKeyword/batchAdd`,
  //敏感词更新
  sensitiveUpdateApi: `${MESSAGE}/api/sensitiveKeyword/edit`
}

//坐席分组
export const customerGroupModule = {
  //分组添加
  customerGroupAddApi: `${USER}/api/employeeGroup/add`,
  //分组删除
  customerGroupDelApi: `${USER}/api/employeeGroup/del`,
  //分组编辑
  customerGroupEditApi: `${USER}/api/employeeGroup/edit`,
  //分组列表查询
  customerGroupListApi: `${USER}/api/employeeGroup/list`
}

//坐席相关接口
export const customerModule = {
  //坐席列表
  customerListApi: `${USER}/api/employee/pageByCond`,
  //添加员工
  customerAddApi: `${USER}/api/employee/add`,
  //删除坐席
  customerDelApi: `${USER}/api/employee/del`,
  //坐席详情
  customerDetailApi: `${USER}/api/employee/detail`,
  //坐席编辑
  customerEditApi: `${USER}/api/employee/edit`
}

//登录相关模块
export const loginModule = {
  //登录
  loginInApi: `${USER}/api/login/doLogin`
}

//当前登录的坐席信息
export const employeeModule = {
  //查询员工详情
  employeeInfoApi: `${USER}/api/login/getCurrentInfo`,

  //退出登录 (注销)
  employeeOutApi: `${USER}/api/login/logout`,

  //更改密码
  changePasswordApi: `${USER}/api/login/changePassword`,

  //更改客服状态
  changeStatusApi: `${USER}/api/login/changeCsStatus`,

  //更改客服偏好语言
  changeLanguageApi: `${USER}/api/login/changeLanguage`,

  //更改头像
  changeHeaderImgApi: `${USER}/api/login/changeHeaderImgUrl`,

  //更改通知铃声
  changeRingApi: `${USER}/api/employee/changeNoticeMusic`,

  //重置通知铃声
  resetRingApi: `${USER} /api/employee/resetNoticeMusic`
}

//应用接入
export const gameInModule = {
  //应用列表
  gameListApi: `${USER}/api/merchant/pageByCond`,
  //应用详情
  gameDetailApi: `${USER}/api/merchant/detail`,
  //应用新增
  gameAddApi: `${USER}/api/merchant/add`,
  //应用删除
  gameDelApi: `${USER}/api/merchant/del`,
  //编辑
  gameUpdateApi: `${USER}/api/merchant/edit`,

  // ---------------------------------------  应用分配规则 -------------------------------------

  //查看等级分配规则
  distributionLevelRuleListApi: `${USER}/api/merchant/distribution/getLevelRuleList`,
  //编辑等级分配规则
  distributionLevelRuleEditApi: `${USER}/api/merchant/distribution/editLevelRuleList`,
  //开关等级分配规则
  switchLevelRuleApi: `${USER}/api/merchant/distribution/switchLevelRule`,
  //查看用户分配规则
  pageUserRuleApi: `${USER}/api/merchant/distribution/pageUserRule`,
  //删除用户分配规则
  delUserRuleApi: `${USER}/api/merchant/distribution/delUserRuleById`,
  //新增用户分配规则
  addUserRuleApi: `${USER}/api/merchant/distribution/addUserRule`,
  //开关用户分配规则
  switchUserRule: `${USER}/api/merchant/distribution/switchUserRule`
}

/**
 * 首页
 *
 */
export const homeModule = {
  //今日数据概况
  todayDataApi: `${USER}/api/home/data/summary/nowDay`,
  //数据趋势
  trendApi: `${USER}/api/home/data/trend`,
  //数据排行
  rankingApi: `${USER}/api/home/data/ranking`
}

//------------------------------监管模块----------------------------------
export const checkModule = {
  //会话监管模块
  chatCheckApi: `${MESSAGE}/api/admin/check/sessionPageByChatRecord`,
  //敏感词监管
  sensitiveKeyWrodCheckApi: `${MESSAGE}/api/admin/check/sessionPageBySk`,
  //查询会话历史记录
  queryHistoryRecordApi: `${MESSAGE}/api/admin/check/getSessionChatRecord`
}

export const uploadModule = {
  // ---------------- 聊天记录 （可被删除） --------------------
  //上传图片
  uploadImgApi: `${MESSAGE}/api/upload/msg/image`,
  //上传视频
  uploadVideoApi: `${MESSAGE}/api/upload/msg/video`,
  //上传音频
  uploadAudioApi: `${MESSAGE}/api/upload/msg/audio`,
  //文件类型上传
  uploadFileApi: `${MESSAGE}/api/upload/msg/file`,
  //------------------- 用户头像之类的 -------------------------
  uploadSystemImgApi: `${USER}/api/upload/system/image`
}

/**
 * 偏好设置模块
 */
export const personSettingModule = {
  //获取个人快捷键详情
  getFastDetailApi: `${USER}/api/employee/Shortcuts/getShortcutsDetail`,

  //更新快捷键
  updateFastSetApi: `${USER}/api/employee/Shortcuts/updateShortcuts`
}

//----------------------------S3模块------------------------------------
export const S3Module = {
  /**
   * 获取上传的URL
   */
  getUploadUrlApi: `${USER}/api/s3/upload/getPreSignUrl`,

  /**
   * 下载
   */
  downUrlApi: `${USER}/api/s3/download/getPreSignUrl`
}

//-----------------------------翻译配置列表------------------------------
export const TranslateListModule = {
  //翻译配置列表
  tranlsteListApi: `${MESSAGE}/api/translation/config/list`,
  //更新翻译源
  translateUpdateApi: `${MESSAGE}/api/translation/config/edit`
}

//----------------------------- 三方账号配置 -----------------------------
export const ThirdAccountModule = {
  //账号列表
  thirdAccountPageApi: `${USER}/api/third/app/account/page`,

  //账号编辑
  thirdAccountEditorApi: `${USER}/api/third/app/account/edit`,

  //账号删除
  thirdAccountDelApi: `${USER}/api/third/app/account/del`
}

//------------------------------- 三方平台好友 --------------------------------

export const ThirdPlatformModule = {
  //好友列表
  thirdPlatformFriendPageApi: `${USER}/api/third/app/friend/page`,

  //好友详情
  thirdPlatformFriendDetailApi: `${USER}/api/third/app/friend/detail`,

  //好友刷新
  thridPlatformFriendRefreshApi: `${USER}/api/third/app/friend/refresh`
}

//----------------------------- 角色 权限 -------------------------------------
export const RolePermissionsModule = {
  //新增角色
  addRoleApi: `${USER}/api/role/add`,

  //删除角色
  delRoleApi: `${USER}/api/role/del`,

  //更新角色
  updateRoleApi: `${USER}/api/role/edit`,

  //角色详情
  roleDetailApi: `${USER}/api/role/detail`,

  //角色分页查询
  rolePageApi: `${USER}/api/role/pageByCond`,

  //查询权限列表
  permissionlistApi: `${USER}/api/permission/list/all`,

  //根据id列表查询权限code
  roleIdsQueryApi: `${USER}/api/permission/batch/ids`
}

//----------------------------系统配置------------------------------------
export const SystemConfigModule = {
  //获取配置列表
  getConfigListApi: `${USER}/api/sysConfig/getConfigList`,

  //更新会话自动结束
  updateSessionAutoEndApi: `${USER}/api/sysConfig/updateSessionAutoEnd`,

  //更新会话自动转接
  updateSessionAutoTransferApi: `${USER}/api/sysConfig/updateSessionAutTransfer`,

  //更新回复监管
  updateSessionCheckReplyApi: `${USER}/api/sysConfig/updateSessionCheckReply`
}

export const CSModule = {
  //坐席列表分页
  csPageApi: `${USER}/api/employee/cs/page`,

  //坐席编辑
  csEditorApi: `${USER}/api/employee/cs/edit`
}

export const ReplyCheckModule = {
  //回复监管列表
  checkReplyListApi: `${MESSAGE}/api/admin/check/sessionPageByReplyCheck`
}
