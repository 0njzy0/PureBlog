<template>
  <v-layout row wrap>
    <v-flex md9 class="blog-container">
      <v-layout row wrap>
        <v-flex v-for="(blog, index) in blogs" :key="index" :class="{ md6: isMd6(index, blog), md12: !blog.isMd6 }">
          <BlogCard :blog="blog" />
        </v-flex>
      </v-layout>
      <v-flex v-if="blogs.length" md12 class="pagination">
        <div class="text-xs-center">
          <Pagination path="/" :page="page" :limit="limit" :total="total" />
        </div>
      </v-flex>
    </v-flex>
    <v-flex md3 class="hidden-sm-and-down"><RightMenu /></v-flex>
  </v-layout>
</template>

<script>
import BlogCard from '~/components/BlogCard'
import RightMenu from '~/components/RightMenu'
import Pagination from '~/components/Pagination'
import md6Mixin from '~/mixins/md6Mixin'
export default {
  components: { BlogCard, RightMenu, Pagination },
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
      error({ statusCode: 404, message: `获取所有博文信息失败:${e.message}` })
    }
  }
}
</script>
