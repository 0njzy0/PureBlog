const pkg = require('./package')
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.scss', 'vuetify/dist/vuetify.min.css', '@mdi/font/css/materialdesignicons.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuetify', '~/plugins/dayjs'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: 'localhost',
    port: 3000,
    prefix: '/api/v1'
    // proxy: true
  },

  proxy: {
    // '/api/v1': 'http://localhost:3000'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    // plugins: [new VuetifyLoaderPlugin()],
    // transpile: ['vuetify/lib'],
    extractCSS: true,
    optimizeCSS: true
  }
}
