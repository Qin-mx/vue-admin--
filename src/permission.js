import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  if (getToken()) { // 判断是否登入了
    if (to.path === '/login') { // 如果当前在登录页面，就跳转到首页
      next({ path: '/' })
    } else {
      // 如果没有数据会进来拉去
      if (store.getters.roles.length === 0) { // 判断是否拉取完信息
        store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
          const roles = res.data.roles

          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置替换：确定，这样导航不会留下历史记录
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 如果当前地址在面登陆名单中，就直接进入
      next()
    } else { // 否则跳转到登录界面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
