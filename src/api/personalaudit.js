import request from '@/utils/request'

export function getVerifiedList(data) {
  return request({
    url: '/sys/users/getVerifiedList',
    method: 'post',
    data
  })
}

export function checkVerified(data) {
  return request({
    url: '/sys/users/checkVerified',
    method: 'post',
    data
  })
}


