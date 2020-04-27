import request from '@/utils/request'
export function getChannelList(data) {
  return request({
    url: '/rest/channel/getChannelList/'+data.pid,
    method: 'post'
  })
}

export function addChannel(data) {
    return request({
      url: '/rest/channel/addChannel',
      method: 'post',
      data
    })
  }