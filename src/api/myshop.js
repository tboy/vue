import request from '@/utils/request'

export function getMyShop() {
  return request({
    url: '/mall/manager/oshop/getMyShop',
    method: 'post'
  })
}

export function updateMyShop(data) {
  return request({
    url: '/mall/manager/oshop/updateMyShop',
    method: 'post',
    data
  })
}
