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
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

import '@/icons' // icon
import '@/permission' // permission control
import i18n from './i18n' // 导入语言
import * as filters from './filters' // 全局 filters 拿到的是一个对象

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 使用剪切板插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 使用vue-quill-editor组件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
