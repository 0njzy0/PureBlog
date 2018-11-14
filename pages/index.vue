<template>
  <v-layout row wrap>
    <v-flex md9>
      <v-layout row wrap>
        <v-flex v-for="(blog,index) in blogs" :key="index" :class="{md6:isMd6(index,blog),md12:!blog.isMd6}">
          <v-card hover :to="`/blogs/${blog._id}`">
            <v-img v-if="blog.cover" :src="blog.cover">
            </v-img>
            <v-card-title primary-title class="py-2">
              <v-layout column>
                <v-flex>
                  <div class="px-1 my-1 body-1 grey--text">
                    <v-layout>
                      <v-avatar :size="20">
                        <img :src="blog.author.avatar" alt="avatar">
                      </v-avatar>
                      <span class="ml-1">{{blog.author.name}}</span>
                      <v-spacer></v-spacer>
                    </v-layout>
                  </div>
                </v-flex>
                <v-flex>
                  <h3 :class="{title:true,'card-blog-title':true,'md6-title':blog.isMd6}">{{blog.title}}</h3>
                </v-flex>
                <v-flex>
                  <div :class="{'body-1':true,'card-blog-overview':true,'md6-overview':blog.isMd6}">{{blog.content}}</div>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions class="pt-0 px-3">
              <div class="caption grey--text text--lighten-1">
                <v-layout>
                  <v-icon size="18" color="grey lighten-1">mdi-timer</v-icon><span class="mx-1">{{$formatTime(blog.createTime)}}</span>
                  <v-icon size="18" color="grey lighten-1">mdi-heart-outline</v-icon><span class="mx-1">{{blog.likes.length}}</span>
                  <v-icon size="18" color="grey lighten-1">mdi-eye-outline</v-icon><span class="mx-1">{{blog.views}}</span>
                </v-layout>
              </div>
              <v-spacer></v-spacer>
              <v-btn flat small color="primary" style="min-width:0" class="px-1">
                阅读全文
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md3 order-md1 order-xs2>
      <RightMenu />
    </v-flex>
    <v-flex md9 sm12 order-md2 order-xs1 style="align-self:flex-end" v-if="blogs.length">
      <div class="text-xs-center">
        <Pagination path='/' :page='page' :limit='limit' :total='total' />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import RightMenu from '~/components/RightMenu'
import Pagination from '~/components/Pagination'
import md6Mixin from '~/mixins/md6Mixin'
export default {
  components: { RightMenu, Pagination },
  mixins: [md6Mixin],
  watchQuery: ['page'],
  async asyncData({ app, store, query, error }) {
    try {
      let page = query.page == undefined ? 1 : parseInt(query.page)
      const blogs = await app.$axios.$get(`/blogs?page=${page}`)
      return {
        blogs: blogs.data,
        total: blogs.total,
        limit: blogs.limit,
        page
      }
    } catch (e) {
      error({ statusCode: 404, message: e.message })
    }
  },
  async fetch({ app, store, error }) {
    const categoriesPromise = app.$axios.$get('/categories')
    const tagsPromise = app.$axios.$get('/tags')
    try {
      const [categories, tags] = await Promise.all([
        categoriesPromise,
        tagsPromise
      ])
      store.commit('setTagsAndCategories', {
        categories: categories.data,
        tags: tags.data
      })
    } catch (e) {
      error({ statusCode: 404, message: e.message })
    }
  }
}
</script>

<style lang="scss">
* {
  outline: none;
}

.card-blog-title {
  max-height: 40px;
  overflow: hidden;
}

.card-blog-overview {
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 960px) {
  .md6-title {
    height: 40px;
  }
  .md6-overview {
    height: 80px;
  }
}
</style>