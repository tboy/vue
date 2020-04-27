import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const UserKey = 'User-Key'

export function getUserInfo() {
  if (!Cookies.get(UserKey)) {
    return {}
  }
  let userInfo = JSON.parse(Cookies.get(UserKey))
  return userInfo
}
export function setUserInfo(userInfo) {
  let str = JSON.stringify(userInfo)
  return Cookies.set(UserKey, str)
}

export function removeUserInfo() {
  return Cookies.remove(UserKey)
}
