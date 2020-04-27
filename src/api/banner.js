import request from '@/utils/request'

export default {
  addBanner: (ops) => {
    return request({
      url: '/rest/banner/addBanner',
      method: 'post',
      data: ops
    })
  },
  getBannerList(ops) {
    return request({
      url: '/rest/banner/getBannerList',
      method: 'post',
      data: ops
    })
  },
  getBannerListByObject(ops) {
    return request({
      url: '/rest/banner/getBannerListByObject',
      method: 'post',
      data: ops
    })
  },
  updateBanner(ops) {
    return request({
      url: '/rest/banner/updateBanner',
      method: 'post',
      data: ops
    })
  },
  delBanner(ops) {
    return request({
      url: '/rest/banner/delBanner',
      method: 'post',
      data: { id: ops }
    })
  }
}
