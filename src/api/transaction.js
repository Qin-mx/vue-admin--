import fetch from 'utils/fetch'

function fetchList() {
  return fetch({
    url: '/transaction/list',
    method: 'get'
  })
}
export {
  fetchList
}
