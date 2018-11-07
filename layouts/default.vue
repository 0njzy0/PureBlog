<template>
  <v-app>
    <Header></Header>
    <v-content>
      <v-container grid-list-md fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>