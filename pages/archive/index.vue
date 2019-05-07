<template>
  <v-layout>
    <v-flex xs12>
      <v-timeline dense>
        <v-timeline-item v-for="(item, index) in archive" :key="index" small>
          <template v-slot:opposite>
            <span :class="`headline font-weight-bold`" v-text="item._id" />
          </template>
          <div class="py-3">
            <h2 :class="`headline font-weight-light mb-3`">{{ item._id }}</h2>
            <v-card class="elevation-2">
              <v-card-text>
                <div v-for="(blog, bIndex) in item.blogs" :key="bIndex">
                  <span>{{ $dayjs(blog.createTime).format('MM-DD') }}</span>
                  <span>{{ blog.user.toUpperCase() }}</span>
                  <nuxt-link :to="`/blogs/${blog._id}`">{{ blog.title }}</nuxt-link>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app, store, query, error }) {
    try {
      const { data } = await app.$axios.$get(`/statistic/blogArchive`)
      return {
        archive: data
      }
    } catch (e) {
      error({ statusCode: 404, message: `获取博客归档失败:${e.message}` })
    }
  }
}
</script>

<style lang="postcss" scoped>
a {
  text-decoration: none;
}
</style>
