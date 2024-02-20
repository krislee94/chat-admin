import { Directive } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores'

/**
 * 路由权限校验
 *
 * @param to
 * @param from
 * @param next
 */
export function isNeddAuth(to: RouteLocationNormalized, from: any, next: any) {
  //   const permissionList = getPermission()
  if (!to.meta.isAuth) {
    next()
  } else if (to.meta?.isAuth && isRouterInAuth(to)) {
    next()
  } else if (to.meta.isAuth && !isRouterInAuth(to)) {
    next('/no-auth')
  }
}

/**
 * 是否含有该权限
 *
 * @param to
 */
export function isRouterInAuth(to: RouteLocationNormalized): boolean {
  const permission = getPermission()
  if (permission.length == 0) {
    return false
  }

  let authName = to.meta?.authName ?? ''

  const arr = permission.filter((item) => item == authName)

  if (arr && arr.length > 0) {
    return true
  }

  return false
}

/**
 * 获取权限列表
 * useUserStore是存在sessionStorage里的
 */
export function getPermission(): string[] {
  if (useUserStore().permissionList) {
    return useUserStore().permissionList
  }
  return []
}

type HTMLElement = /*unresolved*/ any

export const permissionDirective: Directive<HTMLElement> = {
  //加载
  mounted(el, binding) {
    const { arg } = binding
    let permissionList = getPermission()

    const permissionMap = permissionList.reduce((acc, obj) => {
      if (obj && !acc.get(obj)) {
        acc.set(obj, obj)
      }
      return acc
    }, new Map())

    if (arg && arg?.indexOf(',') > -1) {
      let arr = arg.split(',')
      let isHav = false
      if (arr && arr.length > 0) {
        arr.forEach((r) => {
          if (r && permissionMap.get(r)) {
            isHav = true
          }
        })
      }
      if (!isHav) {
        el.style.display = 'none'
      }
    } else {
      if (!permissionMap.get(arg)) {
        el.style.display = 'none'
      }
    }
  },

  //更新中
  updated(el, binding) {
    const { arg } = binding
    let permissionList = getPermission()

    const permissionMap = permissionList.reduce((acc, obj) => {
      if (obj && !acc.get(obj)) {
        acc.set(obj, obj)
      }
      return acc
    }, new Map())

    if (arg && arg?.indexOf(',') > -1) {
      let arr = arg.split(',')
      let isHav = false
      if (arr && arr.length > 0) {
        arr.forEach((r) => {
          if (r && permissionMap.get(r)) {
            isHav = true
          }
        })
      }
      if (!isHav) {
        el.style.display = 'none'
      }
    } else {
      if (!permissionMap.get(arg)) {
        el.style.display = 'none'
      }
    }
  }
}
