import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import en from './en'
import zh from './zh'

Vue.use(VueI18n)
// 注意必须有...
const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  messages // set locale messages
})

export default i18n
