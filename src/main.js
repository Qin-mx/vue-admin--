// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // 全局安装 css
import './mock' // simulation data

import ElementUI from 'element-ui'// 引入element组件
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // 全局 filters

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
