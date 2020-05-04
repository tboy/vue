import request from '@/utils/request'

export default {
  getPeruserList: () => {
    return request({
      url: '/rest/m/users/getuserroles',
      method: 'post'
    })
  },
  createPeruser: (ops) => {
    return request({
      url: '/rest/m/users/adduserrole',
      method: 'post',
      data: ops
    })
  },
  updatePeruser: (ops) => {
    return request({
      url: '/rest/m/users/edituserrole',
      method: 'post',
      data: ops
    })
  },
  leavePeruser: (ops) => {
    return request({
      url: '/rest/m/users/leaveuserrole',
      method: 'post',
      data: ops
    })
  },
  upPeruser: (ops) => {
    return request({
      url: '/rest/m/users/enableUser',
      method: 'post',
      data: ops
    })
  }
}
