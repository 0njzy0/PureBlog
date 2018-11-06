<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-regular">
            <span class="primary--text font-weight-medium">#</span> 分类
          </h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0 py-0">
          <v-list dense subheader>
            <v-list-tile :to="'/categories/'+category._id" v-for="(category,index) in categories" :key="index">
              <v-list-tile-title>{{category.name}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-regular">
            <span class="primary--text font-weight-medium">#</span> 标签
          </h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-btn small round outline color="primary" class="mr-0" :to="'/tags/'+tag._id" v-for="(tag,index) in tags" :key="index">{{tag.name}}</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'RightMenu',
  data() {
    return {
      categories: [],
      tags: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getAllCategories()
      this.getAlltags()
    },
    async getAllCategories() {
      let res = await this.$axios.$get('/categories')
      this.categories = res.data
    },
    async getAlltags() {
      let res = await this.$axios.$get('/tags')
      this.tags = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  .v-card__title,
  .v-card__text {
    padding: 8px 16px;
    .v-btn {
      min-width: 40px;
    }
  }
}
</style>

