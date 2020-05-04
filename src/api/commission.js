import request from '@/utils/request'

export default {
  getCommissionList: (ops) => {
    return request({
      url: '/rest/m/commission/getCommissionSetList',
      method: 'post',
      data: ops
    })
  },
  updateCommission: (ops) => {
    return request({
      url: '/rest/m/commission/editCommissionSet',
      method: 'post',
      data: ops
    })
  },
  findaAllParameter: () => {
    return request({
      url: 'youdu/parameter/findaAllParameter',
      method: 'post'
    })
  },
  updateParameter: (ops) => {
    return request({
      url: 'youdu/parameter/updateParameter',
      method: 'post',
      data: ops
    })
  }
}
