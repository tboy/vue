import request from '@/utils/request'

export function getBaseSet() {
  return request({
    url: '/rest/baseSet/getTblBaseSetList',
    method: 'post'
  })
}
export function addOrUpdateBaseSet(data) {
  return request({
    url: '/rest/baseSet/addOrUpdateSet',
    method: 'post',
    data
  })
}
