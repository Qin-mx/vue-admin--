import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function getToken() {
  return Cookies.set(TokenKey)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

export {
  setToken,
  getToken,
  removeToken
}
