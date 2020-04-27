import request from '@/utils/request'

export function getAdminMenu() {
  return request({
    url: '/sys/getMenu',
    method: 'post'
  })
}
