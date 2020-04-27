import request from '@/utils/request'

//项目类目
export function findAllCategoryMargin() {
  return request({
    url: '/mall/manager/categoryMargin/findAllCategoryMargin',
    method: 'post'
  })
}

export function addGoods(data) {
  return request({
    url: '/mall/manager/goods/addGoods',
    method: 'post',
    data
  })
}

export function auditGoods(data) {
  return request({
    url: '/mall/manager/goods/auditGoods',
    method: 'post',
    data
  })
}

export function delSpecification(id) {
  return request({
    url: '/mall/manager/goods/delSpecification/' + id,
    method: 'post'
  })
}

export function getGoodsVoList(data) {
  return request({
    url: '/mall/manager/goods/getGoodsVoList',
    method: 'post',
    data
  })
}
export function upOrDelGoods(data) {
  return request({
    url: '/mall/manager/goods/upOrDelGoods/'+data.id+"/"+data.status,
    method: 'post'
  })
}
export function downGoodsById(data) {
  return request({
    url: '/mall/manager/goods/downGoodsById/'+data.id,
    method: 'post'
  })
}


