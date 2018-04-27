const getters = {
  status: state => state.user.status,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters

