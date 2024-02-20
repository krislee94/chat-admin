interface IChatListParam {
  sessionId: string
  img: string
  title: string
  lastMessage: string
  time: string
  //未读消息必须是number类型。否则max不起作用
  unredMessage?: number
}

export const chatList: Array<IChatListParam> = [
  {
    sessionId: '1',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: '花开富贵',
    lastMessage: '小伙子，阿姨南京10套房，请求添加您好友',
    time: '11:00',
    unredMessage: 1
  },
  {
    sessionId: '3',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'DDKris',
    lastMessage: '刚刚冲的钱去哪里了',
    time: '11:00',
    unredMessage: 1000
  },
  {
    sessionId: '2',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'ZYYDSH',
    lastMessage: '在吗？',
    time: '11:00'
  },
  {
    sessionId: '1',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: '花开富贵',
    lastMessage: '你好',
    time: '11:00'
  },
  {
    sessionId: '3',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'DDKris',
    lastMessage: '刚刚冲的钱去哪里了',
    time: '11:00'
  },
  {
    sessionId: '2',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'ZYYDSH',
    lastMessage: '在吗？',
    time: '11:00'
  },
  {
    sessionId: '1',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: '花开富贵',
    lastMessage: '你好',
    time: '11:00'
  },
  {
    sessionId: '3',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'DDKris',
    lastMessage: '刚刚冲的钱去哪里了',
    time: '11:00'
  },
  {
    sessionId: '2',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'ZYYDSH',
    lastMessage: '在吗？',
    time: '11:00'
  },
  {
    sessionId: '1',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: '花开富贵',
    lastMessage: '你好',
    time: '11:00'
  },
  {
    sessionId: '3',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'DDKris',
    lastMessage: '刚刚冲的钱去哪里了',
    time: '11:00'
  },
  {
    sessionId: '2',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680853379&t=4e5ded5a70071a6e573b320c8ea89f17',
    title: 'ZYYDSH',
    lastMessage: '在吗？',
    time: '11:00'
  }
]

interface IChatMessageParam {
  sender: {
    message: string
    time: string
  }
  geter: {
    message: string
    time: string
  }
}

interface IMessageParam {
  sessionId: string
  senderImg: string
  geterImg: string
  senderName: string
  data: Array<IChatMessageParam>
}
export const messageList: IMessageParam = {
  sessionId: '1111',
  senderImg:
    'https://img0.baidu.com/it/u=2417241712,2153529446&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
  senderName: '花开富贵',
  geterImg:
    'https://img0.baidu.com/it/u=1535838884,1789524162&fm=253&fmt=auto&app=138&f=JPEG?w=511&h=500',
  data: [
    {
      sender: {
        message: '你好，阿姨我10套房',
        time: '11:30'
      },
      geter: {
        message: '你好，我今年20岁，年富力强',
        time: '11:31'
      }
    },

    {
      sender: {
        message: '你好,我是花开富贵',
        time: '11:30'
      },
      geter: {
        message: '你好，我是南京金城武',
        time: '11:31'
      }
    },

    {
      sender: {
        message: '你好,',
        time: '11:30'
      },
      geter: {
        message:
          '您可以通过“游戏 > 我的 > 会员”进行查看，也可以留意“消息通知”，有新的会员权益，我们会及时告知您。如果你对我们“会员权益”有任何建议，也可以通过“游戏 > 我的 > 设置 > 我的反馈”，提出您宝贵的建议。',
        time: '11:31'
      }
    },

    {
      sender: {
        message: 'this is life',
        time: '11:30'
      },
      geter: {
        message: 'this is money',
        time: '11:31'
      }
    },
    {
      sender: {
        message: 'this is life',
        time: '11:30'
      },
      geter: {
        message: 'this is money',
        time: '11:31'
      }
    },
    {
      sender: {
        message: 'this is life',
        time: '11:30'
      },
      geter: {
        message: 'this is money',
        time: '11:31'
      }
    },
    {
      sender: {
        message: 'this is life',
        time: '11:30'
      },
      geter: {
        message: 'this is money',
        time: '11:31'
      }
    }
  ]
}

interface ICustomerParam {
  /**
   * 客户头像
   */
  customerImg?: string
  /**
   * 客户名称
   */
  customerName?: string
  /**
   * 客户标签
   */
  customerTag?: Array<any>
  /**
   * 客户登记
   */
  customerLevel?: string
  /**
   * 客户备注
   */
  customerRemark?: string

  /**
   * 来源信息
   */
  fromInfo?: string
  /**
   * 接入方式
   */
  fromWay?: string

  /**
   * 来源IP
   */
  fromIp?: string
  /**
   * 来源系统
   */
  fromSystem?: string

  /**
   * 浏览器
   */
  browser?: string
  customerId?: string

  platformId?: string
  platformName?: string
}
export const customerInfo: ICustomerParam = {
  customerId: '123456',
  platformId: '1222',
  platformName: '瞬息全宇宙',
  customerImg:
    'https://img0.baidu.com/it/u=2417241712,2153529446&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
  /**
   * 客户名称
   */
  customerName: '花开富贵',
  /**
   * 客户标签
   */
  customerTag: [
    { id: 1, name: '大学生' },
    { id: 2, name: '月光族' },
    { id: 3, name: '大怨种' }
  ],
  /**
   * 客户登记
   */
  customerLevel: '铂金',
  /**
   * 客户备注
   */
  customerRemark: '',

  /**
   * 来源信息
   */
  fromInfo: '互联互通h5',
  /**
   * 接入方式
   */
  fromWay: 'H5',

  /**
   * 来源IP
   */
  fromIp: '127.0.0.1',
  /**
   * 来源系统
   */
  fromSystem: 'MacOS',

  /**
   * 浏览器
   */
  browser: 'google-chrome'
}

export const customerType = [
  {
    id: '1',
    name: '一级分类'
  },
  {
    id: '2',
    name: '二级分类'
  },
  {
    id: '3',
    name: '三级分类'
  }
]

/**
 * 数据排行mock
 */
export const rankingDataMock = [
  {
    employeeId: 1,
    /**
     * 员工名称
     */
    employeeName: '客服小A',
    /**
     * 员工头像
     */
    headerImgUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4893c456-4d98-47ca-a57a-34d28b068e01%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683190968&t=e26642458b012bc78380b9809f55e5b9',
    /**
     * 接待数
     */
    receptionNum: 999
  },
  {
    employeeId: 2,
    /**
     * 员工名称
     */
    employeeName: '客服小B',
    /**
     * 员工头像
     */
    headerImgUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622154903_3c36a.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683190967&t=5454672f29a7157a22ae623609444389',
    /**
     * 接待数
     */
    receptionNum: 998
  },
  {
    employeeId: 3,
    /**
     * 员工名称
     */
    employeeName: '客服小C',
    /**
     * 员工头像
     */
    headerImgUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683190967&t=e02bdb1beb0627d076058ff34c8bf1ac',
    /**
     * 接待数
     */
    receptionNum: 997
  },
  {
    employeeId: 4,
    /**
     * 员工名称
     */
    employeeName: '客服小D',
    /**
     * 员工头像
     */
    headerImgUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F19%2F20210519212438_ced7e.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683190967&t=6431b07430525ed035acdc84b0e28a35',
    /**
     * 接待数
     */
    receptionNum: 996
  },
  {
    employeeId: 5,
    /**
     * 员工名称
     */
    employeeName: '客服小E',
    /**
     * 员工头像
     */
    headerImgUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6f93a8e4-f3e5-4a34-86bc-4c7bbd46d4f4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683191110&t=8283960c41646e6a3e897d15d81f643f',
    /**
     * 接待数
     */
    receptionNum: 222
  }
]

export const trendDataMock = [
  {
    addUserNum: '100',
    sessionAddNum: '121',
    statDay: '2023-03-28'
  },
  {
    addUserNum: '122',
    sessionAddNum: '112',
    statDay: '2023-03-29'
  },
  {
    addUserNum: '152',
    sessionAddNum: '142',
    statDay: '2023-03-30'
  },
  {
    addUserNum: '111',
    sessionAddNum: '100',
    statDay: '2023-03-31'
  },
  {
    addUserNum: '200',
    sessionAddNum: '221',
    statDay: '2023-04-01'
  },

  {
    addUserNum: '211',
    sessionAddNum: '211',
    statDay: '2023-04-02'
  },
  {
    addUserNum: '12',
    sessionAddNum: '13',
    statDay: '2023-04-03'
  }
]

export const permissionMockList = [
  {
    id: '1',
    parentId: '0',
    weight: 0,
    name: '设置',
    children: [
      {
        id: '2',
        parentId: '1',
        weight: 0,
        name: '员工管理',
        children: [
          {
            id: '3',
            parentId: '2',
            weight: 0,
            name: '修改'
          },
          {
            id: '4',
            parentId: '2',
            weight: 0,
            name: '删除'
          },
          {
            id: '5',
            parentId: '2',
            weight: 0,
            name: '新增'
          }
        ]
      },
      {
        id: '6',
        parentId: '1',
        weight: 0,
        name: '部门管理',
        children: [
          {
            id: '7',
            parentId: '6',
            weight: 0,
            name: '修改'
          },
          {
            id: '8',
            parentId: '6',
            weight: 0,
            name: '删除'
          },
          {
            id: '9',
            parentId: '6',
            weight: 0,
            name: '新增'
          }
        ]
      },
      {
        id: '10',
        parentId: '1',
        weight: 0,
        name: '角色管理',
        children: [
          {
            id: '11',
            parentId: '10',
            weight: 0,
            name: '修改'
          },
          {
            id: '12',
            parentId: '10',
            weight: 0,
            name: '删除'
          },
          {
            id: '13',
            parentId: '10',
            weight: 0,
            name: '新增'
          }
        ]
      }
    ]
  },
  {
    id: '14',
    parentId: '0',
    weight: 0,
    name: '数据',
    children: [
      {
        id: '15',
        parentId: '14',
        weight: 0,
        name: '交易分析'
      },
      {
        id: '16',
        parentId: '14',
        weight: 0,
        name: '订单分析'
      },
      {
        id: '17',
        parentId: '14',
        weight: 0,
        name: '商品分析'
      },
      {
        id: '18',
        parentId: '14',
        weight: 0,
        name: '营销分析'
      },
      {
        id: '19',
        parentId: '14',
        weight: 0,
        name: '客户分析'
      },
      {
        id: '20',
        parentId: '14',
        weight: 0,
        name: '交易渠道分析'
      }
    ]
  },
  {
    id: '21',
    parentId: '0',
    weight: 0,
    name: '客户管理',
    children: [
      {
        id: '22',
        parentId: '21',
        weight: 0,
        name: '客户资料',
        children: [
          {
            id: '23',
            parentId: '22',
            weight: 0,
            name: '启用'
          },
          {
            id: '24',
            parentId: '22',
            weight: 0,
            name: '封禁'
          }
        ]
      },
      {
        id: '25',
        parentId: '21',
        weight: 0,
        name: '客户标签'
      },
      {
        id: '26',
        parentId: '21',
        weight: 0,
        name: '等级体系'
      },
      {
        id: '27',
        parentId: '21',
        weight: 0,
        name: '充值管理'
      },
      {
        id: '28',
        parentId: '21',
        weight: 0,
        name: '使用记录'
      }
    ]
  },
  {
    id: '29',
    parentId: '0',
    weight: 0,
    name: '设备管理',
    children: [
      {
        id: '30',
        parentId: '29',
        weight: 0,
        name: '新增设备'
      },
      {
        id: '31',
        parentId: '29',
        weight: 0,
        name: '更新设备'
      },
      {
        id: '32',
        parentId: '29',
        weight: 0,
        name: '设备详情'
      },
      {
        id: '33',
        parentId: '29',
        weight: 0,
        name: '删除设备'
      }
    ]
  },
  {
    id: '34',
    parentId: '0',
    weight: 0,
    name: '产品管理',
    children: [
      {
        id: '35',
        parentId: '34',
        weight: 0,
        name: '新增产品'
      },
      {
        id: '36',
        parentId: '34',
        weight: 0,
        name: '更新产品'
      },
      {
        id: '37',
        parentId: '34',
        weight: 0,
        name: '产品详情'
      },
      {
        id: '38',
        parentId: '34',
        weight: 0,
        name: '删除产品'
      }
    ]
  },
  {
    id: '115',
    parentId: '0',
    weight: 0,
    name: '商户管理',
    children: [
      {
        id: '116',
        parentId: '115',
        weight: 0,
        name: '修改'
      },
      {
        id: '117',
        parentId: '115',
        weight: 0,
        name: '删除'
      },
      {
        id: '118',
        parentId: '115',
        weight: 0,
        name: '新增'
      },
      {
        id: '119',
        parentId: '115',
        weight: 0,
        name: '详情'
      }
    ]
  },
  {
    id: '120',
    parentId: '0',
    weight: 0,
    name: '门店管理',
    children: [
      {
        id: '121',
        parentId: '120',
        weight: 0,
        name: '修改'
      },
      {
        id: '122',
        parentId: '120',
        weight: 0,
        name: '删除'
      },
      {
        id: '123',
        parentId: '120',
        weight: 0,
        name: '新增'
      },
      {
        id: '124',
        parentId: '120',
        weight: 0,
        name: '详情'
      }
    ]
  }
]
