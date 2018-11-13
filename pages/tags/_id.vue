<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-layout row wrap>
        <v-flex>
          <p class="headline my-0">
            <span class="primary--text font-weight-medium">#</span> {{tagName}}
            <span class="subheading primary--text text--lighten-1 font-weight-regular">{{total}}篇</span>
          </p>
        </v-flex>
        <v-flex v-for="(blog,index) in blogs" :key="index" :class="{md6:isMd6(index)}">
          <v-card hover :to="`/blogs/${blog._id}`">
            <v-img v-if="blog.cover" :src="blog.cover">
            </v-img>
            <v-card-title primary-title class="py-2">
              <v-layout column>
                <v-flex>
                  <div class="body-1 font-weight-thin">
                    <span>{{$formatTime(blog.createTime)}}</span> | <span>{{blog.author.name}}</span>
                  </div>
                </v-flex>
                <v-flex>
                  <h3 class="title">{{blog.title}}</h3>
                </v-flex>
                <v-flex>
                  <div>{{blog.content}}</div>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="pt-0">
              <v-btn-toggle>
                <v-btn flat disabled class="mx-0">
                  <v-icon size="10">mdi-eye</v-icon><span class="ml-1">{{blog.views}}</span>
                </v-btn>
                <v-btn flat disabled class="mx-0">
                  <v-icon size="10">mdi-thumb-up</v-icon><span class="ml-1">{{blog.likes.length}}</span>
                </v-btn>
              </v-btn-toggle>
              <v-spacer></v-spacer>
              <v-avatar :size="20">
                <img :src="blog.author.avatar" alt="avatar">
              </v-avatar>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md12 style="align-self:flex-end" v-if="blogs.length">
      <div class="text-xs-center">
        <v-pagination v-model="page" :length="length" :total-visible="7" @input="handlePage"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  watchQuery: ['page'],
  async asyncData({ app, store, params, query, error }) {
    try {
      let page = query.page == undefined ? 1 : parseInt(query.page)
      let id = params.id
      let tagName = store.state.tags.find(item => item._id == id).name
      const blogs = await app.$axios.$get(`/blogs/tags/${id}?page=${page}`)
      return {
        blogs: blogs.data,
        total: blogs.total,
        limit: blogs.limit,
        page,
        tagName,
        id
      }
    } catch (e) {
      error({ statusCode: 404, message: e.message })
    }
  },
  computed: {
    length() {
      if (this.limit >= this.total) {
        return 1
      } else {
        if (this.total % this.limit == 0) {
          return parseInt(this.total / this.limit)
        } else {
          return parseInt(this.total / this.limit + 1)
        }
      }
    }
  },
  methods: {
    handlePage() {
      this.$router.push({
        path: `/tags/${this.id}`,
        query: { page: this.page }
      })
    }
  }
}
</script>