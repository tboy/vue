
//获取对账列表
import request from '@/utils/request'
export function getReconciliationList(data) {
  return request({
    url: '/mall/manager/reconciliationCenter/getReconciliationList',
    method: 'post',
    data
  })
}
export function getCountInfoByType(data) {
  return request({
    url: '/mall/manager/reconciliationCenter/getCountInfoByType/'+data.type,
    method: 'post'
  })
}


export function getCountShopData(data) {
  return request({
    url: '/mall/manager/reconciliationCenter/getCountShopData/'+data.type,
    method: 'post'
  })
}
export function excelExportReconciliation(data) {
  return request({
    url: '/mall/manager/excel/excelExportReconciliation',
    method: 'post',
    data
  })
}
