import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/mall/manager/order/getOrderList',
    method: 'post',
    data
  })
}

export function updateDeliveryNo(data) {
  return request({
    url: '/mall/manager/order/updateDeliveryNo',
    method: 'post',
    data
  })
}

export function getOrderBackInfoByOrderId(data) {
  return request({
    url: '/mall/manager/order/getOrderBackInfoByOrderId/'+data.id,
    method: 'post'
  })
}

export function getDeliveryInfo(data) {
  return request({
    url: '/mall/manager/order/getDeliveryInfo/'+data.orderNo,
    method: 'post'
  })
}
export function checkOrderBack(data) {
  return request({
    url: '/mall/manager/order/checkOrderBack',
    method: 'post',
    data
  })
}

