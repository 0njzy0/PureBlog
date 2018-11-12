<template>
  <v-layout row wrap>
    <v-flex md9>
      <v-layout row wrap>
        <v-flex v-for="(blog,index) in blogs" :key="index" :class="{md6:isMd6(index)}">
          <v-card hover :to="'/blogs/'+blog._id">
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
    <v-flex md3 order-md1 order-xs2>
      <RightMenu :categories='categories' :tags='tags' />
    </v-flex>
    <v-flex md9 sm12 order-md2 order-xs1 style="align-self:flex-end" v-if="blogs.length">
      <div class="text-xs-center">
        <v-pagination v-model="page" :length="length" :total-visible="7" @input="handlePage"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import RightMenu from '~/components/RightMenu'
export default {
  components: { RightMenu },
  watchQuery: ['page'],
  async asyncData({ app, query, error }) {
    let page = query.page == undefined ? 1 : parseInt(query.page)
    const blogsPromise = app.$axios.$get(`/blogs?page=${page}`)
    const categoriesPromise = app.$axios.$get('/categories')
    const tagsPromise = app.$axios.$get('/tags')
    try {
      const [blogs, categories, tags] = await Promise.all([
        blogsPromise,
        categoriesPromise,
        tagsPromise
      ])
      return {
        blogs: blogs.data,
        total: blogs.total,
        limit: blogs.limit,
        categories: categories.data,
        tags: tags.data,
        page
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
      this.$router.push({ path: '/', query: { page: this.page } })
    },
    isMd6(index) {
      let length = this.blogs.length
      if (this.flag == undefined) {
        this.flag = true
      }
      if (length == 1) {
        return false
      } else if (length == 2) {
        if (!this.blogs[0].cover && !this.blogs[1].cover) {
          return true
        } else {
          return false
        }
      } else if (index + 1 != length) {
        if (
          this.flag &&
          !this.blogs[index].cover &&
          !this.blogs[index + 1].cover
        ) {
          this.flag = false
          return true
        } else if (
          !this.flag &&
          !this.blogs[index].cover &&
          !this.blogs[index - 1].cover
        ) {
          this.flag = true
          return true
        } else {
          return false
        }
      } else {
        if (!this.flag) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss">
* {
  outline: none;
}

.blog-title {
  height: 40px;
  overflow: hidden;
}
.overview {
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>