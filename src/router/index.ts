import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Loading from '@/views/init/index.vue'
import { useUserStore } from '@/stores/index'
import { isNeddAuth } from '@/utils/permission/permission-auth'

//创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'init',
      component: Loading
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        isAuth: true,
        authName: 'im:home'
      }
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/customer/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:cs'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/setting/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:setting'
      }
    },
    {
      path: '/check',
      name: 'check',
      component: () => import('../views/check/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:check'
      }
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../views/loading/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/setting/customer-control',
      name: 'customerControl',
      component: () => import('../views/setting/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:employee'
      }
    },
    {
      path: '/setting/chat/fastReply',
      name: 'fastReply',
      component: () => import('../views/fastReply/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:setting:perference:fastkey'
      }
    },
    {
      path: '/setting/chat/replace',
      name: 'replace',
      component: () => import('../views/wordchange/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:setting:sensitive'
      }
    },
    {
      path: '/gamein',
      name: 'gamein',
      component: () => import('../views/game/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:merchant'
      }
    },
    {
      path: '/game/rule/:id',
      name: 'gameRule',
      component: () => import('../views/gamerule/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:merchant:distribute'
      }
    },
    {
      path: '/employee/add/:employeeId',
      name: 'employeeAdd',
      component: () => import('../views/add-employee/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/login/setting',
      name: 'loginSetting',
      component: () => import('../views/loginSetting/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/system/setting',
      name: 'systemSetting',
      component: () => import('../views/system-setting/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/hole/setting',
      name: 'holeSetting',
      component: () => import('../views/hole-setting/index.vue'),
      meta: {
        isAuth: false,
        authName: ''
      }
    },
    {
      path: '/account/allocation',
      name: 'AccountAllocation',
      component: () => import('../views/account-allocation/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:setting:thirdapp'
      }
    },
    {
      path: '/addressbook',
      name: 'AddressBook',
      component: () => import('../views/address-book/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:addressbook'
      }
    },
    {
      path: '/role',
      name: 'ROLE',
      component: () => import('../views/role-control/index.vue'),
      meta: {
        isAuth: true,
        authName: 'im:setting:role'
      }
    },
    {
      path: '/customer/control',
      name: 'CUSTOMERCONTROL',
      component: () => import('../views/customer-control/customer-control.vue'),
      meta: {
        isAuth: true,
        authName: 'im:cs:list'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/line-test.vue')
    }
  ]
})

/**
 * 不需要校验的路由
 */
export const NONEEDLOGIN = ['/login']

//增加路由前站
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    next('/login')
  } else if (to.path == '/login' && userStore.token) {
    next('/loading')
  } else {
    isNeddAuth(to, from, next)
  }
})

export default router
