<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card v-if="blog">
        <v-img v-if="blog.cover" :src="blog.cover" aspect-ratio="4" />
        <v-card-title primary-title class="py-2">
          <v-layout column>
            <v-flex>
              <div class="title font-weight-medium text-xs-center px-2">{{ blog.title }}</div>
            </v-flex>
            <v-flex>
              <div class="px-2 subheading font-weight-light text-uppercase text-xs-center">
                <span>{{ blog.author.name }}</span>
                <span>/ {{ $dayjs(blog.createTime).format('YYYY-MM-DD') }}</span>
                <template v-if="blog.category">
                  <span>/ {{ blog.category.name }}</span>
                </template>
              </div>
            </v-flex>
            <v-flex>
              <no-ssr>
                <mavon-editor
                  :value="blog.content"
                  :toolbars-flag="false"
                  :box-shadow="false"
                  :subfield="false"
                  default-open="preview"
                />
              </no-ssr>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    try {
      const { data } = await app.$axios.$get(`/blogs/${params.id}`)
      return { blog: data }
    } catch (e) {
      error({ statusCode: 404, message: `获取博文信息失败:${e.message}` })
    }
  }
}
</script>
