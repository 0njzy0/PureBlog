import Vue from 'vue'
import Vuetify from 'vuetify'
import zhHans from "vuetify/es5/locale/zh-Hans";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  lang: {
    locales: {
      "zh-Hans": zhHans
    },
    current: "zh-Hans"
  },
  iconfont: "mdi",
  theme: {
    primary: colors.orange,
    secondary: colors.orange.lighten1,
    accent: colors.orange.base
  }
})