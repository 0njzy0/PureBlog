<template>
  <v-app>
    <v-content>
      <v-container fill-height><nuxt /></v-container>
    </v-content>
  </v-app>
</template>

<script>
import initTheme from '~/mixins/initTheme'

export default {
  head() {
    return {
      title: 'PureBlog-Admin'
    }
  },
  mixins: [initTheme]
}
</script>
