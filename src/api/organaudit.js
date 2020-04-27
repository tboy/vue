
import request from '@/utils/request'

export function getEnterpriseListt(data) {
  return request({
    url: '/mall/manager/certificationApplication/getEnterpriseList',
    method: 'post',
    data
  })
}

export function getSupplierList(data) {
  return request({
    url: '/mall/manager/certificationApplication/getSupplierList',
    method: 'post',
    data
  })
}

export function approvalEnterprise(data) {
  return request({
    url: '/mall/manager/certificationApplication/approvalEnterprise',
    method: 'post',
    data
  })
}

export function approvalSupplier(data) {
  return request({
    url: '/mall/manager/certificationApplication/approvalSupplier',
    method: 'post',
    data
  })
}
