import request from '@/utils/request'

export function getMenus() {
  return request({
    url: '/sys/getMenu',
    method: 'post'
  })
}
export function getMenusList() {
  return request({
    url: '/rest/m/sys/menulist',
    method: 'post'
  })
}

export function addMenu(ops) {
  return request({
    url: '/rest/m/sys/addmenu',
    method: 'post',
    data: ops
  })
}

export function updateMenu(ops) {
  return request({
    url: '/rest/m/sys/editmenu',
    method: 'post',
    data: ops
  })
}

export function deleteMenu(ops) {
  return request({
    url: '/rest/m/sys/deletemenu',
    method: 'post',
    data: ops
  })
}

