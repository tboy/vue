import request from '@/utils/request'

export default {
  getRoleList() {
    return request({
      url: '/sys/getRoleList',
      method: 'post'
    })
  },
  updateRole(config) {
    return request({
      url: '/rest/m/sys/editrole',
      method: 'post',
      data: config
    })
  },
  deleteRole(config) {
    return request({
      url: '/rest/m/sys/deleterole',
      method: 'post',
      data: config
    })
  },
  createRole(config) {
    return request({
      url: '/rest/m/sys/addrole',
      method: 'post',
      data: config
    })
  }
}
