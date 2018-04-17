import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '@/views/login/index'
import Layout from '@/views/layout/Layout'
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: '首页',
      component: Layout
      // redirect: 'index'
    }
  ]
})
