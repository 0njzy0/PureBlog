import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify, {
  lang: {
    locales: {
      'zh-Hans': zhHans
    },
    current: 'zh-Hans'
  },
  iconfont: 'mdi',
  options: {
    minifyTheme: function(css) {
      return process.env.NODE_ENV === 'production' ? css.replace(/[\s|\r\n|\r|\n]/g, '') : css
    }
  }
})
