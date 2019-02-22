<template>
  <div class="right-menu">
    <v-layout column>
      <v-flex>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-regular">
              <span class="primary--text font-weight-medium">#</span>
              主题
            </h2>
          </v-card-title>
          <v-divider />
          <v-card-text class="px-0 py-0">
            <v-layout row class="mx-0 my-0" justify-space-around>
              <v-btn
                v-for="(theme, index) in themes"
                :key="index"
                small
                dark
                depressed
                :color="theme.base"
                @click="handleThemeCheck(theme)"
              >
                <v-icon v-if="defaultTheme == theme.base">mdi-check</v-icon>
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-regular">
              <span class="primary--text font-weight-medium">#</span>
              分类
            </h2>
          </v-card-title>
          <v-divider />
          <v-card-text class="px-0 py-0">
            <v-list dense subheader>
              <v-list-tile
                v-for="(category, index) in $store.state.categories"
                :key="index"
                :to="`/categories/${category._id}`"
              >
                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-regular">
              <span class="primary--text font-weight-medium">#</span>
              标签
            </h2>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-btn
              v-for="(tag, index) in $store.state.tags"
              :key="index"
              small
              round
              outline
              color="primary"
              class="mr-0"
              :to="`/tags/${tag._id}`"
            >
              {{ tag.name }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'RightMenu',
  data() {
    return {
      themes: [colors.blue, colors.orange, colors.green, colors.red],
      defaultTheme: ''
    }
  },
  created() {
    if (process.browser) {
      this.initTheme()
    }
  },
  methods: {
    initTheme() {
      if (window.localStorage.defaultTheme) {
        var theme = JSON.parse(window.localStorage.defaultTheme)
      }
      this.defaultTheme = theme ? theme.base : colors.blue.base
      this.$vuetify.theme.primary = theme || colors.blue
    },
    handleThemeCheck(theme) {
      window.localStorage.defaultTheme = JSON.stringify(theme)
      this.defaultTheme = theme.base
      this.$vuetify.theme.primary = theme
    }
  }
}
</script>

<style lang="scss">
.right-menu {
  .v-card {
    .v-card__title,
    .v-card__text {
      padding: 8px 16px;
      .v-btn {
        min-width: 40px;
      }
    }
  }
}
</style>
