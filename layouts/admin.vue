<template>
  <v-app class="admin">
    <v-navigation-drawer v-model="drawer" fixed app clipped>
      <v-list dense>
        <v-list-tile v-for="(menu, index) in menus" :key="index" exact :to="menu.url">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left dark color="primary">
      <v-container fluid fill-height px-2>
        <v-toolbar-side-icon class="mx-0" @click="drawer = !drawer" />
        <v-toolbar-title class="ml-2">
          PureBlog-Admin
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon class="hidden-md-and-down">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
          </v-avatar>
        </v-btn>
      </v-container>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md fill-height><nuxt /></v-container>
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
  middleware: 'auth',
  mixins: [initTheme],
  data() {
    return {
      drawer: true,
      menus: [
        { icon: 'mdi-view-dashboard', name: '控制台', url: '/admin' },
        { icon: 'mdi-file-document', name: '文章管理', url: '/admin/blogManage' },
        { icon: 'mdi-equal-box', name: '类别管理', url: '/admin/categoryManage' },
        { icon: 'mdi-tag', name: '标签管理', url: '/admin/tagManage' },
        { icon: 'mdi-package-variant', name: '资源管理' },
        { icon: 'mdi-comment', name: '评论管理' },
        { icon: 'mdi-account', name: '用户管理' },
        { icon: 'mdi-settings', name: '系统设置' }
      ]
    }
  }
}
</script>

<style lang="scss">
// 调整v-toolbar默认布局
.admin .v-toolbar__content {
  padding: 0px !important;
  .container {
    margin: 0 auto !important;
  }
  .v-toolbar__side-icon .v-btn__content {
    justify-content: center;
  }
}
</style>
