import request from '@/utils/request'

export function getAdminMenu() {
  return request({
    url: '/sys/getMenu',
    method: 'post'
  })
}
export function getUserList(data) {
  return request({
    url: '/sys/getUserList',
    method: 'post',
    data
  })
}
export function addUserRole(data) {
  return request({
    url: '/sys/addUserRole',
    method: 'post',
    data
  })
}
