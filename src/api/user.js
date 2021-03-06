import request from '@/utils/request'

export function adminLogin(data) {
  return request({
    url: '/noauthor/login',
    method: 'post',
    data
  })
}

export function adminLogout() {
  return request({
    url: '/noauthor/logout',
    method: 'post'
  })
}

export function getApplyCashList(data) {
  return request({
    url: '/mall/manager/applyCash/getApplyCashList',
    method: 'post',
    data
  })
}

export function auditApplyCash(data) {
  return request({
    url: '/mall/manager/applyCash/auditApplyCash',
    method: 'post',
    data
  })
}




export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
