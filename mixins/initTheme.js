import colors from 'vuetify/es5/util/colors'

const initTheme = {
  mounted() {
    // TODO: univer模式下异常 spa下正常 暂时用定时器解决
    setTimeout(this.initTheme, 300)
  },
  methods: {
    initTheme() {
      if (window.localStorage.defaultTheme) {
        var theme = JSON.parse(window.localStorage.defaultTheme)
      }
      let defaultTheme = theme ? theme.base : colors.blue.base
      this.$store.commit('setTheme', defaultTheme)
      this.$vuetify.theme.primary = theme || colors.blue
    }
  }
}

export default initTheme
