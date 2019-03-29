<template>
  <div class="footer">
    <v-footer height="45">
      <v-layout justify-center row wrap>
        <v-flex text-xs-center xs12>
          Powered by
          <a href="https://github.com/0njzy0/PureBlog" target="_blank">PureBlog</a>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer a {
  text-decoration: none;
}
</style>
