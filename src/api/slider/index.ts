interface ISliderParam {
  index: number
  icon: string
  name: string
  path: string
  role: Array<string>
  activeIcon: string
  isActive: boolean
  permission?: string
}

export const sliderData: Array<ISliderParam> = [
  {
    // <iconpark-icon name="chart-pie"></iconpark-icon>
    // <iconpark-icon name="chart-pie-913oe09c"></iconpark-icon>
    index: 1,
    icon: 'chart-pie',
    activeIcon: 'chart-pie-913oe09c',
    name: '数据管理',
    path: '/home',
    role: ['1', '2'],
    permission: 'im:home',
    isActive: false
  },
  {
    // <iconpark-icon name="message-one-9138mhgo"></iconpark-icon>
    // <iconpark-icon name="message-one"></iconpark-icon>
    index: 2,
    icon: 'message-one-9138mhgo',
    activeIcon: 'message-one',
    name: '会话',
    path: '/customer',
    role: ['1', '2'],
    permission: 'im:cs',
    isActive: false
  },
  {
    // <iconpark-icon name="protect-911k6p06"></iconpark-icon>
    // <iconpark-icon name="protect"></iconpark-icon>
    index: 3,
    icon: 'protect-911k6p06',
    activeIcon: 'protect',
    name: '质检',
    path: '/check',
    role: ['1', '3'],
    permission: 'im:check',
    isActive: false
  },
  {
    // <iconpark-icon name="people"></iconpark-icon>
    // <iconpark-icon name="people-913a78pf"></iconpark-icon>
    index: 4,
    icon: 'people',
    activeIcon: 'people-913a78pf',
    name: '员工管理',
    path: '/setting/customer-control',
    role: ['1', '3'],
    permission: 'im:employee',
    isActive: false
  },
  // <iconpark-icon name="customer"></iconpark-icon>
  // <iconpark-icon name="customer-a07pj90n"></iconpark-icon>
  {
    index: 4.1,
    icon: 'customer',
    activeIcon: 'customer-a07pj90n',
    name: '客服管理',
    path: '/customer/control',
    role: ['1', '3'],
    permission: 'im:cs:list',
    isActive: false
  },
  {
    // <iconpark-icon name="game-two-913afpi9"></iconpark-icon>
    // <iconpark-icon name="game-two"></iconpark-icon><iconpark-icon name="game-two-913afpi9"></iconpark-icon>
    index: 5,
    icon: 'game-two-913afpi9',
    activeIcon: 'game-two-913afpi9',
    name: '游戏接入',
    path: '/gamein',
    role: ['4'],
    permission: 'im:merchant',
    isActive: false
  },
  // <address-book theme="outline" size="24" fill="#333"/>
  {
    index: 2.1,
    icon: 'notebook-one',
    activeIcon: 'notebook-one',
    name: '',
    path: '/addressbook',
    role: ['1', '2'],
    permission: 'im:addressbook',
    isActive: false
  }
]

export const settingTeamMenu = [
  {
    id: 'set-1',
    name: '坐席管理',
    path: '/customer-control'
  },
  {
    id: 'set-2',
    name: '角色与权限',
    path: '/role-permission'
  },
  {
    id: 'set-3',
    name: '坐席与用户等级分配',
    path: '/level-control'
  }
]

export const settingChatMenu = [
  {
    id: 'chat-3',
    name: '快捷回复',
    path: '/fast-reply'
  },
  {
    id: 'chat-4',
    name: '敏感词替换',
    path: '/sensitive-words'
  }
]

export const gameMenu = [
  {
    id: 'game-1',
    name: '游戏接入',
    path: '/game-in'
  }
]
