import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/mall/manager/pomoter/getUserList',
    method: 'post',
    data
  })
}

export function auditApply(data) {
  return request({
    url: '/mall/manager/pomoter/auditApply',
    method: 'post',
    data
  })
}

export function delPromoter(data) {
  return request({
    url: '/mall/manager/pomoter/delPromoter',
    method: 'post',
    data
  })
}


