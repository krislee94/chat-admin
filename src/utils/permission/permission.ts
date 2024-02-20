/**
 * 权限列表
 */
export const permissionList = [
  {
    id: 100,
    code: 'im:home',
    name: '首页',
    parentId: 0
  },
  {
    id: 200,
    code: 'im:cs',
    name: '客服聊天',
    parentId: 0
  },
  {
    id: 201,
    code: 'im:cs:list',
    name: '客服列表',
    parentId: 0
  },
  {
    id: 202,
    code: 'im:cs:list:edit',
    name: '客服列表编辑',
    parentId: 201
  },
  {
    id: 300,
    code: 'im:addressbook',
    name: '通讯录',
    parentId: 0
  },
  {
    id: 400,
    code: 'im:check',
    name: '监管',
    parentId: 0
  },
  {
    id: 500,
    code: 'im:employee',
    name: '员工管理',
    parentId: 0
  },
  {
    id: 501,
    code: 'im:employee:sort:list',
    name: '分类列表',
    parentId: 500
  },
  {
    id: 502,
    code: 'im:employee:sort:add',
    name: '新增员工分类',
    parentId: 500
  },
  {
    id: 503,
    code: 'im:employee:sort:del',
    name: '删除员工分类',
    parentId: 500
  },
  {
    id: 504,
    code: 'im:employee:sort:editor',
    name: '更新员工分类',
    parentId: 500
  },
  {
    id: 505,
    code: 'im:employee:list',
    name: '员工列表',
    parentId: 500
  },
  {
    id: 506,
    code: 'im:employee:add',
    name: '新增员工',
    parentId: 500
  },
  {
    id: 507,
    code: 'im:employee:editor',
    name: '编辑员工',
    parentId: 500
  },
  {
    id: 508,
    code: 'im:employee:del',
    name: '删除员工',
    parentId: 500
  },
  {
    id: 509,
    code: 'im:employee:detail',
    name: '员工详情',
    parentId: 500
  },
  {
    id: 600,
    code: 'im:merchant',
    name: '游戏管理',
    parentId: 0
  },
  {
    id: 601,
    code: 'im:merchant:list',
    name: '游戏列表',
    parentId: 600
  },
  {
    id: 602,
    code: 'im:merchant:add',
    name: '添加游戏',
    parentId: 600
  },
  {
    id: 603,
    code: 'im:merchant:editor',
    name: '编辑游戏',
    parentId: 600
  },
  {
    id: 604,
    code: 'im:merchant:del',
    name: '删除游戏',
    parentId: 600
  },
  {
    id: 605,
    code: 'im:merchant:distribute',
    name: '会话分配',
    parentId: 600
  },
  {
    id: 700,
    code: 'im:setting',
    name: '设置',
    parentId: 0
  },
  {
    id: 701,
    code: 'im:setting:preference',
    name: '偏好设置',
    parentId: 700
  },
  {
    id: 702,
    code: 'im:setting:perference:fastkey',
    name: '快捷键设置',
    parentId: 701
  },
  {
    id: 703,
    code: 'im:setting:perference:ring',
    name: '铃声设置',
    parentId: 701
  },
  {
    id: 704,
    code: 'im:setting:fastreply',
    name: '自定义快捷回复',
    parentId: 700
  },
  {
    id: 705,
    code: 'im:setting:fastreply:add:classify',
    name: '新增分类',
    parentId: 704
  },
  {
    id: 706,
    code: 'im:setting:fastreply:add:reply',
    name: '添加回复',
    parentId: 704
  },
  {
    id: 724,
    code: 'im:setting:fastreply:del',
    name: '删除回复',
    parentId: 704
  },
  {
    id: 707,
    code: 'im:setting:sensitive',
    name: '敏感词替换',
    parentId: 700
  },
  {
    id: 708,
    code: 'im:setting:sensitive:add',
    name: '添加敏感词',
    parentId: 707
  },
  {
    id: 709,
    code: 'im:setting:sensitive:list',
    name: '敏感词列表',
    parentId: 707
  },
  {
    id: 710,
    code: 'im:setting:sensitive:editor',
    name: '敏感词编辑',
    parentId: 707
  },
  {
    id: 711,
    code: 'im:setting:sensitive:del',
    name: '敏感词删除',
    parentId: 707
  },
  {
    id: 712,
    code: 'im:setting:hole',
    name: '全局设置',
    parentId: 700
  },
  {
    id: 713,
    code: 'im:setting:hole:translate',
    name: '翻译',
    parentId: 712
  },
  {
    id: 714,
    code: 'im:setting:thirdapp',
    name: '三方账号分配',
    parentId: 700
  },
  {
    id: 715,
    code: 'im:setting:thirdapp:list',
    name: '三方账号列表',
    parentId: 714
  },
  {
    id: 716,
    code: 'im:setting:thirdapp:editor',
    name: '三方账号编辑',
    parentId: 714
  },
  {
    id: 717,
    code: 'im:setting:thirdapp:del',
    name: '三方账号删除',
    parentId: 714
  },
  {
    id: 718,
    code: 'im:setting:role',
    name: '角色管理',
    parentId: 700
  },
  {
    id: 719,
    code: 'im:setting:role:list',
    name: '角色列表',
    parentId: 718
  },
  {
    id: 720,
    code: 'im:setting:role:editor',
    name: '角色编辑',
    parentId: 718
  },
  {
    id: 721,
    code: 'im:setting:role:del',
    name: '角色删除',
    parentId: 718
  },
  {
    id: 722,
    code: 'im:setting:role:detail',
    name: '角色详情',
    parentId: 718
  },
  {
    id: 723,
    code: 'im:setting:role:add',
    name: '新增角色',
    parentId: 718
  },
  // 2023年7月13号 新增内容
  {
    id: 725,
    code: 'im:setting:hole:replyCheck',
    name: '回复监管',
    parentId: 712
  },
  {
    id: 726,
    code: 'im:setting:hole:sessionAutoEnd',
    name: '断开会话',
    parentId: 712
  },
  {
    id: 727,
    code: 'im:setting:hole:sessionAutoTransfer',
    name: '离线转接',
    parentId: 712
  }
]
