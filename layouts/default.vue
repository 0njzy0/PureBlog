<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app v-model="drawer">
        <v-list>
          <v-list-tile to='/'>
            <v-list-tile-title>首页</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to='/archive'>
            <v-list-tile-title>归档</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to='/about'>
            <v-list-tile-title>关于</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app dark color="primary">
        <v-container fill-height py-0>
          <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up mx-0"></v-toolbar-side-icon>
          <v-toolbar-title class="ml-0 mr-2">PureBlog</v-toolbar-title>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/">首页</v-btn>
            <v-btn flat to="/archive">归档</v-btn>
            <v-btn flat to="/about">关于</v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <v-flex md3>
            <v-text-field light solo prepend-inner-icon="mdi-magnify" background-color="primary lighten-3" color="white" class="hidden-sm-and-down pl-2">
            </v-text-field>
          </v-flex>
        </v-container>
      </v-toolbar>
      <v-content>
        <v-container grid-list-md fill-height>
          <nuxt></nuxt>
        </v-container>
      </v-content>
      <v-footer inverted-scroll>
        <v-layout justify-center row wrap>
          <v-flex text-xs-center xs12>
            &copy;2018 — PureBlog By NJZY
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  })
}
</script>

<style lang="scss">
// 调整v-toolbar默认布局
.v-toolbar__content {
  padding: 0px !important;
  .container {
    margin: 0 auto !important;
  }
  .v-toolbar__side-icon .v-btn__content {
    justify-content: start;
  }
  .v-input__control {
    min-height: 30px !important;
  }
  .v-input__slot {
    margin-bottom: 0px;
  }
}
</style>