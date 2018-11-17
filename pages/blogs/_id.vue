<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card v-if='blog'>
        <v-img v-if="blog.cover" :src="blog.cover" aspect-ratio="2.75">
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
              <div>
                {{blog.content}}
              </div>
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