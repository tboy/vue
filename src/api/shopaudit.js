import request from '@/utils/request'

export function getTblShopList(data) {
  return request({
    url: '/mall/manager/certificationApplication/getTblShopList',
    method: 'post',
    data
  })
}

export function approvalTblShop(data) {
  return request({
    url: '/mall/manager/certificationApplication/approvalTblShop',
    method: 'post',
    data
  })
}
