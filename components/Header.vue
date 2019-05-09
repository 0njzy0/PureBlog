<template>
  <div class="header">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-subheader>导航</v-subheader>
        <v-list-tile @click="handleGoHome">
          <v-list-tile-title>首页</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/archive">
          <v-list-tile-title>归档</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-title>关于</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider />
      <v-list>
        <v-subheader>分类</v-subheader>
        <v-list-tile
          v-for="(category, index) in $store.state.categories"
          :key="index"
          :to="`/categories/${category._id}`"
        >
          <v-list-tile-title>{{ category.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider />
      <v-list>
        <v-subheader>标签</v-subheader>
        <v-list-tile v-for="(tag, index) in $store.state.tags" :key="index" :to="`/tags/${tag._id}`">
          <v-list-tile-title>{{ tag.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
      <v-container fill-height py-0>
        <v-toolbar-side-icon class="hidden-md-and-up mx-0" @click.stop="drawer = !drawer" />
        <v-toolbar-title class="ml-0 mr-2">PureBlog</v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click="handleGoHome">首页</v-btn>
          <v-btn flat to="/archive">归档</v-btn>
          <v-btn flat to="/about">关于</v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-flex md3>
          <v-autocomplete
            v-model="select"
            :search-input.sync="search"
            :loading="loading"
            :items="items"
            item-text="title"
            item-value="_id"
            dont-fill-mask-blanks
            light
            solo
            hide-no-data
            hide-selected
            clearable
            prepend-inner-icon="mdi-magnify"
            background-color="primary lighten-3"
            color="white"
            class="hidden-sm-and-down pl-2 hide-selectIcon"
            @change="handleChange"
          />
        </v-flex>
      </v-container>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
      loading: false,
      items: [],
      search: null,
      select: null
    }
  },
  watch: {
    search(val) {
      if (!val) {
        this.items = []
      } else if (val && val !== this.select) {
        this.querySelections(val)
      }
    }
  },
  methods: {
    // 解决在首页分页返回首页页面不返回顶部的问题
    handleGoHome() {
      if (this.$route.name == 'index') {
        document.documentElement.scrollTop = 0
      }
      this.$router.push('/')
    },
    handleChange(id) {
      if (id) {
        this.search = ''
        this.select = ''
        this.$router.push(`/blogs/${id}`)
      }
    },
    async querySelections(v) {
      this.loading = true
      const { data } = await this.$axios.$get(`/blogs?title=${v}`)
      this.items = data
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.header {
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
  .hide-selectIcon .v-input__control .v-select__slot .v-input__append-inner:last-child {
    display: none;
  }
}
</style>
