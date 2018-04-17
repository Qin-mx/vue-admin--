import fetch from 'utils/fetch'

function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login/login',
    method: 'post',
    data
  })
}

function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export {
  loginByUsername,
  logout,
  getUserInfo
}
