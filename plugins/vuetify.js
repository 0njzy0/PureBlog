import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  lang: {
    locales: {
      'zh-Hans': zhHans
    },
    current: 'zh-Hans'
  },
  iconfont: 'mdi',
  theme: {
    primary: colors.blue,
    secondary: colors.blue.lighten1,
    accent: colors.blue.base
  },
  options: {
    minifyTheme: function(css) {
      return process.env.NODE_ENV === 'production' ? css.replace(/[\s|\r\n|\r|\n]/g, '') : css
    }
  }
})
