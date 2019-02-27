<template>
  <v-app>
    <the-header />
    <v-content>
      <v-container grid-list-md fill-height><nuxt /></v-container>
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import initTheme from '~/mixins/initTheme'

export default {
  components: {
    TheHeader: Header,
    TheFooter: Footer
  },
  mixins: [initTheme]
}
</script>
