import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
* redirect: noredirect           当设置 noredirect 的时候该路由不会在面包屑导航中出现
* name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
* meta : {
    roles: ['admin','editor']   设置该路由进入的权限，支持多个权限叠加
    title: 'title'              设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'            设置该路由的图标
    // noCache: true               如果设置为true ,则不会被 <keep-alive> 缓存(默认 false) 该方法位实现
  }
* 当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
  当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
  alwaysShow: true

* constantRouterMap代表那些不需要动态判断权限的路由，如登录页，404，等通用页面。
* asyncRouterMap 代表那些需求动态判断权限并通过 addRouters 动态添加的页面 **/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '',
    name: '首页',
    component: Layout,
    redirect: '/index',
    // redirect: 'noredirect',
    children: [{
      path: 'index',
      name: 'dashboard',
      component: () => import('@/views/pages/dashboard/index'),
      meta: { title: '首页', icon: 'example' }
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'form',
      component: () => import('@/views/pages/form/index'),
      meta: { title: '表单', icon: 'example' }
    }]
  }
]
export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }), // 当转到一个新的页面时，定位到最顶端。
  routes: constantRouterMap
})
